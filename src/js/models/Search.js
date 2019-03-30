/* export default 'an string default export'; */
import axios from "axios";

export default class Search {

  constructor(query) {
    this.query = query;
  }
  async getResults() {
    const KEY = "b196088c37e3c77a634148c530bbbc77";
    const baseURL = "https://www.food2fork.com/api/search";
    try {
      const res = await axios(`${baseURL}?key=${KEY}&q=${this.query}`);
      this.results = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}
