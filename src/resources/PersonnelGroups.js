import axios from 'axios';

export default {
   url: "http://localhost:3500/api/personnel_group",

   getAll() {
      return axios.get(this.url);
   }
}