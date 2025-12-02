// Home for all the auth routes

const express = require('express');

const router = express.Router();

// Import controller
const recipeController = require('../controllers/recipe-controller');

router.use(recipeController.getRecipeApiToken);
router.get(["/", "/:selectedMealType"], recipeController.getRecipes);
router.get("/:selectedMealType/:recipeId", recipeController.getRecipe);

module.exports = router;