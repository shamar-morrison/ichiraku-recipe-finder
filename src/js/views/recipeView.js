import View from './View.js';
const Fraction = require('fractional').Fraction;

class RecipeView extends View {
	_parentElement = document.querySelector('.recipe');

	/**
	 * Generate HTML markup for the recipe view
	 */
	_generateMarkup() {
		return `
        <figure class="recipe__fig">
            <img src="${this._data.image_url}" alt="${this._data.title}" class="recipe__img" />
            <h1 class="recipe__title">
                <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
                <div class="recipe__info">
                    <i class="fas fa-clock recipe__info-icon"></i>

                    <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time}</span>
                    <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                    <i class="fas fa-user-friends recipe__info-icon"></i>

                    <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
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
                    
                </div>
                <button class="btn--round">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">

                ${this._data.ingredients.map(ingredient => this._generateIngredientMarkup(ingredient)).join('')}

                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${this._data.publisher}</span>. Please check out directions at their website.
                </p>
                <a
                    class="btn--small recipe__btn"
                    href="${this._data.source_url}"
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
