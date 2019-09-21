import axios from 'axios';

export default {
   url: `http://${location.hostname}:${3500}/api/personnel_group`,

   getAll() {
      return axios.get(this.url);
   }
}