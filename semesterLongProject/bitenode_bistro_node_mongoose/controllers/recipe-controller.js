const axios = require("axios");
const jwt = require("jsonwebtoken");

// Store token for use by all handler functions in this controller
let accessToken = null;

// Custom axios instance for hitting authenticated endpoints on DummyJSON API
const recipeAPI = axios.create({
  baseURL: "https://dummyjson.com/auth/recipes"
});

const isExpired = (token) => {
  // Return True if token is expired
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return decoded.exp < now;
};

exports.getRecipeApiToken = async (req, res, next) => {
  if (!accessToken || isExpired(accessToken)) {
    // Send an axios POST request to recieve a token (include user credentials in body of the request)
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      });

      // Make the token available to other handler functions that send requests to authenticated endpoints
      accessToken = response.data.accessToken;
      console.log("Access token set!", accessToken);

      // Set the Authorization header including the token for the custom axios instance
      recipeAPI.defaults.headers.Authorization = `Bearer ${accessToken}`

    } catch (error) {
      return next(error);
    }
  }
};

exports.getRecipes = async (req, res, next) => {
  try {
    // Use axios to send a request to the DumyJSON Api
    const response = await recipeAPI.get("/");
    const recipes = response.data.recipes;

    console.log("Data from axios response is: ", response.data.recipes);

    const allMealTypes = recipes.flatMap((recipe) => recipe.mealType);
    const uniqueMealTypes = [...new Set(allMealTypes)].sort();

    // Render a view with the data
    res.render("recipes", {
      title: "Recipes",
      mealTypes: uniqueMealTypes,
      recipes: recipes,
    });
  } catch (error) {
    console.error("ERROR IS:  ", error);
    const customError = new Error("Error retreiving Recipe Data");
    customError.statusCode = error.status;
    next(customError);
  }
};

exports.getRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const response = await recipeAPI.get("/" + recipeId);

    const recipe = response.data;

    res.render("recipe-detail", { title: "Recipe Detail", recipe });
  } catch (error) {
    console.error("ERROR IS:  ", error);
    const customError = new Error("Error retreiving Recipe Data");
    customError.statusCode = error.status;
    next(customError);
  }
};
