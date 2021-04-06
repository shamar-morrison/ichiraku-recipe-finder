import { async } from 'regenerator-runtime';

export const state = {
	recipe: {},
	search: {},
	bookmarks: [],
};

export const loadRecipe = async function (recipeID) {
	try {
		// Fetch recipe data from API
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`);

		if (!res.ok) throw new Error('Recipe not found :( Try a different recipe.');
		const data = await res.json();

		const { recipe } = data.data;
		state.recipe = recipe;
	} catch (error) {
		console.error(error.message);
	}
};
