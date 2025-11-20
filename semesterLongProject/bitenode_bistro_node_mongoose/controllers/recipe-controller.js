const axios = require('axios');

exports.getRecipes = async (req, res, next) => {

  try {
    // Use axios to send a request to the DumyJSON Api
    const response = await axios.get('https://dummyjson.com/recipes');
    const recipes = response.data.recipes;

    console.log("Data from axios response is: ", response.data.recipes);

    const allMealTypes = recipes.flatMap(recipe => recipe.mealType);
    const uniqueMealTypes = [...new Set(allMealTypes)].sort();

    // Render a view with the data
    res.render("recipes", {
      title: 'Recipes',
      mealTypes: uniqueMealTypes,
      recipes: recipes
    })
  } catch (error) {
    console.log(error); // Make more robust using error handling
  }
};