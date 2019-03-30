/* import string from './models/Search';
/* import {add as a, multiply as m, ID} from './views/searchView';
 */
/* import * as searchView from './views/searchView';
console.log(`${string} ${searchView.add(searchView.ID,2)} ${searchView.ID}*2 = ${searchView.multiply(searchView.ID,2)}`); */

import axios from 'axios';

async function getResults(query) {
    const KEY = 'b196088c37e3c77a634148c530bbbc77';
    const baseURL = 'https://www.food2fork.com/api/search';
    try {
            const res = await axios(`${baseURL}?key=${KEY}&q=${query}`);
            const recipes = res.data.recipes;
            console.log(recipes);  
    }catch(error){
        alert(error);
    }

}

getResults('chicken curry');
