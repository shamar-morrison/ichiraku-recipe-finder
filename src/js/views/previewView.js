import View from './View.js';

class PreviewView extends View {
	_parentElement = '';

	_generateMarkup(data) {
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

export default new PreviewView();
