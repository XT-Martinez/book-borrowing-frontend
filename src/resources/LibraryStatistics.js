import axios from 'axios';

export default {
   departmentReport: {
      url: "http://localhost:3500/api/reports/summary_report_department",
      getAll(filter) {
         filter.end_date = filter.end_date === '' ? filter.start_date : filter.end_date;
         return axios.get(this.url, {params: filter});
      },
   },

   personnelReport: {
      url: "http://localhost:3500/api/reports/summary_report_personnel",
      getAll(filter) {
         filter.end_date = filter.end_date === '' ? filter.start_date : filter.end_date;
         return axios.get(this.url, {params: filter});
      },
   },

   studentReport: {
      url: "http://localhost:3500/api/reports/summary_report_student",
      getAll(filter) {
         filter.end_date = filter.end_date === '' ? filter.start_date : filter.end_date;
         return axios.get(this.url, {params: filter});
      },
   }
}