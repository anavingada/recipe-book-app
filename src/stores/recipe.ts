import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Recipe {
  id: string;
  name: string;
  description: string;
}

// use omit to skip a property, inthis case id
type NewRecipe = Omit<Recipe, 'id'>;

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([]);
  const favoriteIds = ref<string[]>([]);

  const addRecipe = (recipe: NewRecipe) => {
    const newRecipe = { id: Date.now().toString(), ...recipe };
    recipes.value.push(newRecipe);
    return newRecipe;
  };

  const editRecipe = (updatedRecipe: Recipe) => {
    const index = recipes.value.findIndex((recipe) => recipe.id === updatedRecipe.id);

    // -1 if the recipe id is not found
    if (index !== -1) {
      recipes.value[index] = updatedRecipe;
    }
  };

  const getRecipeById = (id: string) => recipes.value.find((recipe) => recipe.id === id);

  const filteredRecipes = (searchQuery: string) =>
    recipes.value.filter((recipe) =>
      recipe.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

  const toggleFavorite = (id: string) => {
    if (favoriteIds.value.includes(id)) {
      favoriteIds.value = favoriteIds.value.filter((favId) => favId !== id);
    } else {
      favoriteIds.value.push(id);
    }
  };

  const isFavorite = (id: string) => favoriteIds.value.includes(id);

  const favoriteRecipes = computed(() =>
    recipes.value.filter((recipes) => favoriteIds.value.includes(recipes.id))
  );

  return {
    recipes,
    addRecipe,
    getRecipeById,
    filteredRecipes,
    editRecipe,
    favoriteIds,
    toggleFavorite,
    isFavorite,
    favoriteRecipes
  };
});
