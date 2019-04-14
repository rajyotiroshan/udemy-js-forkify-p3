//access all elements from DOM.
export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results__list'), 
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe')
};

export const elementString = {
    loader: 'loader'
}

/**
 * display loader as child to passed parent element.
 * @param {parent element} parent 
 */
export const renderLoader = parent => {
    const loader = `
        <div class=${elementString.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

/**
 * remove loader.
 */
export const clearLoader = ()=> {
    const loader = document.querySelector(`.${elementString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}