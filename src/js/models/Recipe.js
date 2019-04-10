import axios from 'axios';
import {KEY, baseURL} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${baseURL}?key=${KEY}&rId = ${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.author = res.data.recipe.image_url;
            this.author = res.data.recipe.source-url;
            this.author = res.data.recipe.ingredients;
        }catch(error) {
            alert('Something went Wrong');
            
        }
    }

    calcTime() {
        //Assigning that we nedd minimum 15 min for each ingredients.
        const numIng = this.ingredients.length;
        const periods = numIng = Math.ceil(numIng/3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
}