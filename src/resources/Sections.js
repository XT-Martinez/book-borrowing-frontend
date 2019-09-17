import axios from 'axios';

export default {
   url: "http://localhost:3500/api/section",

   getAll() {
      return axios.get(this.url);
   }
}