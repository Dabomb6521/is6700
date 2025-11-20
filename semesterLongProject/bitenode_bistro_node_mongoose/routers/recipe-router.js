const express = require("express");

const recipeController = require("../controllers/recipe-controller");

const router = express.Router();

router.use(recipeController.getRecipeApiToken)
router.get(['/', "/:selectedMealType"], recipeController.getRecipes);
router.get("/:selectedMealType/:recipeId", recipeController.getRecipe);

module.exports = router;
