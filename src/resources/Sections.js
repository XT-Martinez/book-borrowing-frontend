import axios from 'axios';

export default {
   url: `http://${location.hostname}:${3500}/api/section`,

   getAll() {
      return axios.get(this.url);
   }
}