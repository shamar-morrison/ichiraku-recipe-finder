import 'core-js/stable';
import 'regenerator-runtime/runtime';
const loadingGif = require('url:../img/loading.gif');

const recipeContainer = document.querySelector('.recipe');

window.onhashchange = function (event) {
	console.debug('event', event);
};

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
 * Render thr loading GIF
 * @param {HTMLElement} parent HTMLElement to attach GIF inside of
 */
const renderSpinner = parent => {
	const spinner = `
		<div class="spinner">
          <img src="${loadingGif}" alt="loading..." srcset="${loadingGif}" class="loading-gif">
        </div>
	`;
	parent.innerHTML = '';
	parent.insertAdjacentHTML('afterbegin', spinner);
};

/**
 * Show the recipe
 */
const showRecipe = async function () {
	try {
		// show spinner while waiting for image
		renderSpinner(recipeContainer);
		// Fetch recipe data from API
		const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');

		if (!res.ok) throw new Error('Recipe not found :( Try a different recipe.');
		const data = await res.json();

		/**
		 * 
		 * 	cooking_time: 45
			id: "5ed6604591c37cdc054bc886"
			image_url: "http://forkify-api.herokuapp.com/images/FlatBread21of1a180.jpg"
			ingredients: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
			publisher: "My Baking Addiction"
			servings: 4
			source_url: "http://www.mybakingaddiction.com/spicy-chicken-and-pepper-jack-pizza-recipe/"
			title: "Spicy Chicken and Pepper Jack Pizza"
		 */
		// destructure recipe object
		const { recipe } = data.data;
		console.debug('recipe', recipe);

		const recipeHTML = `
			<figure class="recipe__fig">
					<img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img" />
					<h1 class="recipe__title">
						<span>${recipe.title}</span>
					</h1>
			</figure>

				<div class="recipe__details">
					<div class="recipe__info">
						<i class="fas fa-clock recipe__info-icon"></i>

						<span class="recipe__info-data recipe__info-data--minutes">${recipe.cooking_time}</span>
						<span class="recipe__info-text">minutes</span>
					</div>
					<div class="recipe__info">
						<i class="fas fa-user-friends recipe__info-icon"></i>

						<span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
						<span class="recipe__info-text">servings</span>

						<div class="recipe__info-buttons">
							<button class="btn--tiny btn--increase-servings">
								<i class="fas fa-minus-circle"></i>
							</button>
							<button class="btn--tiny btn--increase-servings">
								<i class="fas fa-plus-circle"></i>
							</button>
						</div>
					</div>

					<div class="recipe__user-generated">
						<i class="fas fa-user"></i>
					</div>
					<button class="btn--round">
						<i class="fas fa-bookmark"></i>
					</button>
				</div>

				<div class="recipe__ingredients">
					<h2 class="heading--2">Recipe ingredients</h2>
					<ul class="recipe__ingredient-list">

					${recipe.ingredients
						.map(ingredient => {
							return `
							<li class="recipe__ingredient">
								<i class="fas fa-check-circle recipe__icon"></i>
								<div class="recipe__quantity"><strong>${ingredient.quantity === null ? '' : ingredient.quantity}</strong></div>
								<div class="recipe__description">
									<span class="recipe__unit">${ingredient.unit}</span>
									${ingredient.description}
								</div>
							</li>
						`;
						})
						.join('')}

					</ul>
				</div>

				<div class="recipe__directions">
					<h2 class="heading--2">How to cook it</h2>
					<p class="recipe__directions-text">
						This recipe was carefully designed and tested by
						<span class="recipe__publisher">${recipe.publisher}</span>. Please check out directions at their website.
					</p>
					<a
						class="btn--small recipe__btn"
						href="${recipe.source_url}"
						target="_blank">
						<span>Directions</span>
						<i class="fas fa-arrow-circle-right search__icon"></i>
					</a>
				</div>
			</div>
		</div> `;

		// insert recipe into DOM
		recipeContainer.innerHTML = '';
		recipeContainer.insertAdjacentHTML('beforeend', recipeHTML);
	} catch (err) {
		alert(err.message);
	}
};

showRecipe();
