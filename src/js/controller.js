import * as model from './model';
import RecipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

// https://forkify-api.herokuapp.com/v2
// API key - 3834d9e4-f43c-4a35-8b05-42aefc1f6f96

///////////////////////////////////////

/**
 * Show the recipe
 */
const controlRecipes = async function () {
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
		RecipeView.render(model.state.recipe);
	} catch (err) {
		console.error(err.message);
	}
};

// event listeners
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));
