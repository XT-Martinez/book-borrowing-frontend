import SummaryReport from './components/SummaryReport'
import LogView from './components/LogView'

export default [
   {
      path: '/',
      component: SummaryReport,
      meta: {label: 'Borrowing Statistics'}
   },
   {
      path: '/log',
      component: LogView,
      meta: {label: 'Log Borrowing'}
   }

]