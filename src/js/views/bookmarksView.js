import View from './View.js';

class BookmarksView extends View {
	_parentElement = document.querySelector('.bookmarks__list');

	_generateMarkup() {
		return this._data.map(obj => this._generatePreviewMarkup(obj)).join('');
	}

	_generatePreviewMarkup(data) {
		return `
      <li class="preview">
              <a class="preview__link" href="#${data.id}">
                <figure class="preview__fig">
                  <img src="${data.image_url}" alt="${data.title}" />
                </figure>
                  <div class="preview__data">
                    <h4 class="preview__title">${data.title}</h4>
                    <p class="preview__publisher">${data.publisher}</p>
                  </div>
              </a>
        </li>
	  `;
	}
}

export default new BookmarksView();
