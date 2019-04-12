/* export default 'an string default export'; */
import axios from "axios";
import {KEY, baseURL} from '../config';

export default class Search {

  constructor(query) {
    this.query = query;
  }
  async getResults() {
    try {
      console.log(`${baseURL}?key=${KEY}&q=${this.query}`);
      const res = await axios(`${baseURL}?key=${KEY}&q=${this.query}`);
      //console.log(res);
      this.results = res.data.recipes;
      //console.log(this.results);
    } catch (error) {
      alert(error);
    }
  }
}
