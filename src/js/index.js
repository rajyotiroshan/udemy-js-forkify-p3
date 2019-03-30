/* import string from './models/Search';
/* import {add as a, multiply as m, ID} from './views/searchView';
 */
/* import * as searchView from './views/searchView';
console.log(`${string} ${searchView.add(searchView.ID,2)} ${searchView.ID}*2 = ${searchView.multiply(searchView.ID,2)}`); */

import Search from './models/Search';

const search= new Search('pizza');

console.log(search.getResults());
