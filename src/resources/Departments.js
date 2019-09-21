import axios from 'axios';

export default {
   url: `http://${location.hostname}:${3500}/api/department`,

   getAll() {
      return axios.get(this.url);
   }
}