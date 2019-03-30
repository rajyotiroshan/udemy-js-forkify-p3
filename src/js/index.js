/* import string from './models/Search';
/* import {add as a, multiply as m, ID} from './views/searchView';
 */
/* import * as searchView from './views/searchView';
console.log(`${string} ${searchView.add(searchView.ID,2)} ${searchView.ID}*2 = ${searchView.multiply(searchView.ID,2)}`); */

import Search from './models/Search';

/**
 * Global state of the app.
 * --Search object
 * --Current list object
 * --Shopping List object
 * --Liked recipes.
 */
const state = {
    
};

const controlSearch = async ()=> {
    //1. get query from the view
    const query = 'pizza'//TODO:: get from view

    if(query) {
        //2. new search object and add it to state.
        state.search = new Search(query);

        //3. Prepare UI for results

        //4. search for recipes.
        await state.search.getResults();
        //5. Render results on UI.
        console.log(state.search.results);
    }
}

/**
 * submit event handler for search form.
 */
document.querySelector('.search').addEventListener('submit', e=>{
    e.preventDefault();
    controlSearch();
});

