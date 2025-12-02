const axios = require("axios");
const jwt = require("jsonwebtoken");

// Store token for use by all handler functions in this controller
let accessToken = null;

// Custom axios instance for hitting authenticated endpoints on DummyJSON API
const recipeAPI = axios.create({
  baseURL: 'https://dummyjson.com/auth/recipes'
})

const isExpired = (token) => {
// Return true if token is expired

  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) {
    return true; // treat invalid or missing exp as expired
  }

  const now = Math.floor(Date.now() / 1000);  //Current date stamp in seconds
  return decoded.exp < now;
}


exports.getRecipeApiToken = async (req, res, next) => {

  // Send an axios POST request to receive a token (include user credentials in body of the request)

   if (!accessToken || isExpired(accessToken)) {
        try {
            const response = await axios.post("https://dummyjson.com/auth/login", {
              username: "emilys",  // Move credentials to more secure location
              password: "emilyspass",
              expiresInMins: 30
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
    
      next();

}


exports.getRecipes = async (req, res, next) => {
  try {
    const { selectedMealType } = req.params;

    const response = await recipeAPI.get("/");

    const recipes = response.data.recipes;

    // Get unique meal types
    // Step 1: Extract all mealTypes
    // flatMap is like the array.map function but it flattens returned arrays (up to one level deep)
    const allMealTypes = recipes.flatMap((recipe) => recipe.mealType);

    // Step 2: Deduplicate using Set
    const uniqueMealTypes = [...new Set(allMealTypes)].sort();

    // Check to see if selectedMealType is valid
    if (selectedMealType && !uniqueMealTypes.includes(selectedMealType[0].toUpperCase() + selectedMealType.slice(1).toLowerCase())){
        // Go to 404
        return next();
    }

    res.render("recipes", { title: "Recipes", mealTypes: uniqueMealTypes, recipes, selectedMealType: selectedMealType || "Appetizer" });
  
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
