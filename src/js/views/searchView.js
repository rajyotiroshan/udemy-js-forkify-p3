/* export const add =  (a, b)=> {
    return a+b;
}

export const multiply = (a,b) => a*b;

export const ID = 24; */
import { elements } from "./base";

/**
 * @returns user search input from search field.
 */
export const getInput = () => {
  return elements.searchInput.value;
};

/**
 * remove input value from serch field.
 */
export const clearInput = () => {
  elements.searchInput.value = "";
};

/**
 * remove all search results
 */
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

export const highlightSelected = id=>{
  const resultsArray  =Array.from(document.querySelectorAll('.results__link'));
  resultsArray.forEach(el=>{
    el.classList.remove('results__link--active');
  })
  document.querySelector(`a[href = "#${id}"]`).classList.add('results__link--active');
}

/**
 * trim recipe title
 */
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    //return the new title.
    return `${newTitle.join(" ")} ...`;
  }
  return title;
};

/**
 * @param {fecthed recipe} recipe 
 * @return markup for recipe list item.
 */
const renderRecipe = recipe => {
  const markup = `
    <li>
        <a class="results__link " href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

/**
 * 
 * @param {page no to goto} page 
 * @param {prev or next} type 
 * @return markup for next or prev button
 */
const createButton = (page, type) => `<button class="btn-inline results__btn--${type}" data-goto=${type==='prev'?page-1: page+1}>
        <span>${type==='prev'?page-1: page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type==='prev'?'left':'right'}"></use>
        </svg>
        
    </button>
`;

/**
 * 
 * @param {page no to goto} page 
 * @param {total no of results fetched} numResults 
 * @param {total no of results per page to display} resPerPage 
 * @return {render pre or next button on the page.}
 */
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
    let button;
  if (page === 1 && pages > 1) {
    //Only button to go to next page.
    button = createButton(page, 'next');
  } else if (page < pages) {
      //need both button 
      button = `
                ${createButton(page, 'prev')}
                ${createButton(page, 'next')}
            `;
  } else if (page === pages && pages > 1) {
    //Only button to go to prev page.
    button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

/**
 * 
 * @param {fetched recipe} recipes 
 * @param {page no} page 
 * @param {no of recipe per page } resPerPage 
 */
export const renderResults = (recipes = [], page = 1, resPerPage = 10) => {
  //render results of current page.
    const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
    //render pagination buttons.
    renderButtons(page, recipes.length, resPerPage);
};
