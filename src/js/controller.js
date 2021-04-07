import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchBarView from './views/searchBarView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
// API key - 3834d9e4-f43c-4a35-8b05-42aefc1f6f96

///////////////////////////////////////

/**
 * Show the recipe
 */
const controlRecipes = async () => {
	try {
		// get recipe ID
		const recipeID = window.location.hash.slice(1);
		if (!recipeID) return;

		// show spinner while waiting for image
		RecipeView.renderSpinner();

		// loading recipe
		await model.loadRecipe(recipeID);
		const { recipe } = model.state;

		// render recipe
		RecipeView.renderRecipe(model.state.recipe);
	} catch (err) {
		RecipeView.renderErrorMsg();
		console.error(err.message);
	}
};

const controlSearchResults = async () => {
	try {
		const searchQuery = SearchBarView._getSearchQuery();
		if (!searchQuery) return;
		await model.loadSearchResults(searchQuery);
	} catch (error) {
		console.error(error);
	}
};

/**
 * Initialise App
 */
const init = () => {
	RecipeView.addEventHandler(controlRecipes);
	SearchBarView.addEventHandler(controlSearchResults);
};

init();
