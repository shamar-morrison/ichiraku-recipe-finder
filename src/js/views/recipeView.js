const Fraction = require('fractional').Fraction;
const loadingGif = require('url:../../img/loading.gif');

class RecipeView {
	_parentElement = document.querySelector('.recipe');
	_recipeData;

	/**
	 * Render the recipe
	 */
	renderRecipe(data) {
		this._recipeData = data;
		const markupHTML = this._generateMarkup();
		// insert recipe into DOM
		this._clear();
		this._parentElement.insertAdjacentHTML('beforeend', markupHTML);
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	/**
	 * Render the loading GIF
	 */
	renderSpinner() {
		const spinner = `
		<div class="spinner">
          <img src="${loadingGif}" alt="loading..." srcset="${loadingGif}" class="loading-gif">
        </div> `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', spinner);
	}

	/**
	 * Generate HTML markup for the recipe view
	 */
	_generateMarkup() {
		return `
			<figure class="recipe__fig">
                <img src="${this._recipeData.image_url}" alt="${this._recipeData.title}" class="recipe__img" />
                <h1 class="recipe__title">
                    <span>${this._recipeData.title}</span>
                </h1>
			</figure>

            <div class="recipe__details">
                    <div class="recipe__info">
                        <i class="fas fa-clock recipe__info-icon"></i>

                        <span class="recipe__info-data recipe__info-data--minutes">${this._recipeData.cooking_time}</span>
                        <span class="recipe__info-text">minutes</span>
                    </div>
                    <div class="recipe__info">
                        <i class="fas fa-user-friends recipe__info-icon"></i>

                        <span class="recipe__info-data recipe__info-data--people">${this._recipeData.servings}</span>
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

                    ${this._recipeData.ingredients.map(ingredient => this._generateIngredientMarkup(ingredient)).join('')}

                    </ul>
                </div>

                <div class="recipe__directions">
                    <h2 class="heading--2">How to cook it</h2>
                    <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__publisher">${this._recipeData.publisher}</span>. Please check out directions at their website.
                    </p>
                    <a
                        class="btn--small recipe__btn"
                        href="${this._recipeData.source_url}"
                        target="_blank">
                        <span>Directions</span>
                        <i class="fas fa-arrow-circle-right search__icon"></i>
                    </a>
                </div>
            </div>
         </div> `;
	}

	addEventHandler(handler) {
		// event listeners
		['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
	}

	renderErrorMsg(message = `No recipe found. Please try another recipe.`) {
		const errorMsg = `
        <div class="error">
            <div>
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        </div> `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', errorMsg);
	}

	_generateIngredientMarkup(ingredient) {
		return `
        <li class="recipe__ingredient">
            <i class="fas fa-check-circle recipe__icon"></i>
            <div class="recipe__quantity"><strong>${
				ingredient.quantity === null ? '' : new Fraction(ingredient.quantity).toString()
			}</strong></div>
            <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
            </div>
        </li> `;
	}
}

export default new RecipeView();
