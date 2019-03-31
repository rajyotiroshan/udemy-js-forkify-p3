/* import string from './models/Search';
/* import {add as a, multiply as m, ID} from './views/searchView';
 */
/* import * as searchView from './views/searchView';
console.log(`${string} ${searchView.add(searchView.ID,2)} ${searchView.ID}*2 = ${searchView.multiply(searchView.ID,2)}`); */

import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

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
        //4. search for recipes.
        await state.search.getResults();
        //5. Render results on UI.
        clearLoader();
        //console.log(state.search.results);
        searchView.renderResults(state.search.results);
        //
        
    }
}

/**
 * submit event handler for search form.
 */
elements.searchForm.addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

