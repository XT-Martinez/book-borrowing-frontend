import axios from 'axios';

export default {
   url: `http://${location.hostname}:${3500}/api/grade_level`,

   getAll() {
      return axios.get(this.url);
   }
}