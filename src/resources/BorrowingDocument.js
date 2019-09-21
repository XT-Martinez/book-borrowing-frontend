import axios from 'axios';

export default {
   url: `http://${location.hostname}:${3500}/api/borrowing_doc`,

   getAll() {
      return axios.get(this.url);
   },

   create(header, items) {
      let data = header;

      data.is_bulk = false;
      data.items = items;

      return axios.post(this.url, data);
   },

   createBulk() {

   }
}