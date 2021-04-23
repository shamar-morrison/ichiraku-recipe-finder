import View from './View.js';

class SearchResultsView extends View {
	_parentElement = document.querySelector('.results');

	_generateMarkup() {
		return this._data.map(obj => this._generatePreviewMarkup(obj)).join('');
	}

	_generatePreviewMarkup(data) {
		const id = window.location.hash.slice(1);

		return `
        <li class="preview">
              <a class="preview__link ${this._data.id === id ? 'preview__link--active' : ''}" href="#${data.id}">
                <figure class="preview__fig">
                  <img src="${data.image_url}" alt="${data.title}" />
                </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                    <div class="recipe__user-generated ${data.key ? '' : 'hidden'}">
                      <i class="fas fa-user"></i>
                    </div>
                  </div>
              </a>
        </li>
	  `;
	}
}

export default new SearchResultsView();
