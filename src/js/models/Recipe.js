import axios from 'axios';
import {KEY, baseURL} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    /** 
     * fetch recipe f
    */
    async getRecipe() {
        try {

            const res = await axios(`${baseURL}?key=${KEY}&rId = ${this.id}`);
            console.log(res);
            this.title = res.data.recipes.title;
            this.author = res.data.recipes.publisher;
            this.img = res.data.recipes.image_url;
            this.url = res.data.recipes.source-url;
            this.ingredients = res.data.recipes.ingredients;
        }catch(error) {
            alert(' went Wrong');
            
        }
    }

    calcTime() {
        //Assigning that we nedd minimum 15 min for each ingredients.
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15;//save as a property to recipe object.
    }
    calcServings() {
        this.servings = 4;//save as aproperty to recipe object.
    }

    parseIngredients() {
        const unitslong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons','cups','pounds'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {
            //1. uniform units.
            let ingredient = el.toLowerCase();
            unitslong.forEach((unit, i)=>{
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            //2 remove parentheses.

            ingredient = ingredient.replace(/ *\([^)]*\) */g, '');
            //3.parse ingredients into count, unit and ingredient.

            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2=> units.includes(el2));
            let objIng;
            if(unitIndex > -1) {
                //there exist a unit.
                //Ex 4 1/2 cups, arrCount is [4, 1/2]
                // Ex 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-','+'));
                }else {
                    count  = eval(arrIng.slice(0, unitIndex).join('+'));
                } 

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient:arrIng.slice(unitIndex+1).join(' ')
                };

            }else if(parseInt(arrIng[0],10)){
                //there is no unit but the first element is a number.
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {//no unit and no number at first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;

    }
}