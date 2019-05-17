const mongoose = require("mongoose");
const SavedRecipeSchema = require('../FoodHubbackendmodel/SavedRecipes.schema.server');
const SavedRecipeModel = mongoose.model('SavedRecipeModel', SavedRecipeSchema);

onSaveRecipe = (UserId, RecipeId) => {
  SavedRecipeModel.create({
    Recipe: RecipeId,
    User: UserId
  })
}
module.exports = {
  onSaveRecipe
}
