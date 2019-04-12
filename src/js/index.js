/* import string from './models/Search';
/* import {add as a, multiply as m, ID} from './views/searchView';
 */
/* import * as searchView from './views/searchView';
console.log(`${string} ${searchView.add(searchView.ID,2)} ${searchView.ID}*2 = ${searchView.multiply(searchView.ID,2)}`); */

import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView'

/**
 * Global state of the app.
 * --Search object
 * --Current list object
 * --Shopping List object
 * --Liked recipes.
 */
const state = {
    /**
     * search: {
     *      query,
     *      results
     * }
     */
};

/**
 * Search Controller.
 */

const controlSearch = async ()=> {
    //1. get query from the view
    const query = searchView.getInput();//TODO:: get from view

    if(query) {
        //2. new search object and add it to state.
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            //4. search for recipes.
            await state.search.getResults();
            //5. Render results on UI.
            clearLoader();
            //console.log(state.search.results);
            searchView.renderResults(state.search.results);
        }catch(err){
            alert('Something wrong with the search.');
        }
    }
}

/**
 * submit event handler for search form.
 */
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest(".btn-inline");
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.results,goToPage);
    }
});

/**
 * Recipe Controller
 */

const controlRecipe = async () => {
    //Get the id from the url.
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {// Prepare the UI for changes.
        recipeView.clearRecipe();
        renderLoader(elements.recipe)
        //Create the new Recipe object.
        state.recipe = new Recipe(id);

        try{
            //Get the Recipe data.
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            //Calculate serving and time.
            state.recipe.calcTime();
            state.recipe.calcServings();
            //Render  Recipe.
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }catch(err){
            alert('Error processing recipe');
        }



    }
};

 //listener for has number change.
/*  window.addEventListener('hashchange', controlRecipe);
 window.addEventListener('load', controlRecipe); */
 ['hashchange','load'].forEach(event=> window.addEventListener(event, controlRecipe));

