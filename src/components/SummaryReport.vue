<template>
	<div id="SummaryReport">
		<div class="row">
			<div class="col-lg-3">
				<CollectionLegend :collections="collections" v-if="!isLoadingCollections" />
				<div v-else class="d-flex justify-content-center">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>

			<div class="col-lg-6">
				<FilterForm
					:filter="filter"
					v-on:filterReport="onFilter"
					v-on:print="onPrint"/>
			</div>

			<div class="col-lg-12" >
				<div v-if="isLoadedAll">
					<br>
					<div class="row">
						<div class="col-lg-12">
							<StudentTotalsReport
								:collections="collections"
								:studentReport="studentReport"/>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-lg-12">
							<GrandTotalTable
								:collections="collections"
								:departmentReport="departmentReport"
								:personnelReport="personnelReport"/>
						</div>
					</div>
				</div>
				<div v-else class="d-flex justify-content-center">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		</div>

		<AlertModal v-if="isErrorLoading" msgType="error" v-on:modal-close="clearErrors">
			<ul v-if="errorMessages.length > 0">
            <li
               v-bind:key="i"
               v-for="(err, i) in errorMessages" 
               > {{ err }} </li>
         </ul>
		</AlertModal>

	</div>
</template>

<script>
	// Components
	import ResCollections from '../resources/Collections';
	import GrandTotalTable from './reports/GrandTotalTable';
	import StudentTotalsReport from './reports/StudentTotalsReport';
	import CollectionLegend from './reports/CollectionLegend';
	import FilterForm from './forms/FilterForm';
	import AlertModal from './alerts/AlertModal';

	// Helpers
	import DateTimeHelper from '../helpers/DateTime';
	// Resources
	import ResLibraryStat from '../resources/LibraryStatistics';
	// External Library - PDF Generator
	import pdfMake from '../pdfmake';

	export default {
		name: 'SummaryReport',

		components: {
			GrandTotalTable,
			StudentTotalsReport,
			CollectionLegend,
			FilterForm,
			AlertModal
		},

		data() {
			return {
				collections: [],
				isLoadingCollections: false,

				isErrorLoading: false,
				errorMessages: [],

				studentReport: {},
				isLoadingStudentReport: false,

				departmentReport: {},
				personnelReport: {},

				isLoadingPersonnelReport: true,
				isLoadingDepartmentReport: true,

				filter: {
					filter_type: 1,
					month: DateTimeHelper.getCurrentMonth(),
					year: DateTimeHelper.getCurrentYear(),

					start_date: '',
					end_date: ''
				}
			}
		},

		computed: {
			isLoadedAll() {
				return !this.isLoadingCollections
					&& !this.isLoadingStudentReport
					&& !this.isLoadingPersonnelReport
					&& !this.isLoadingDepartmentReport;
			}
		},

		created() {
			this.loadCollections();
			this.loadStudentReport(this.filter);
			this.loadPersonnelReport(this.filter);
			this.loadDerpatmentReport(this.filter);
		},

		methods: {

			loadCollections() {
				this.isLoadingCollections = true;
				ResCollections.getAll()
					.then(res => {
						this.collections = res.data;
						this.isLoadingCollections = false;
					})
					.catch(err => this.showErrors(err));
			},

			loadStudentReport(filter) {
				this.isLoadingStudentReport = true;
				ResLibraryStat.studentReport.getAll(filter)
					.then(res => {
						this.studentReport = res.data;
						this.isLoadingStudentReport = false;
					})
					.catch(err => this.showErrors(err));
			},

			loadPersonnelReport(filter) {
				this.isLoadingPersonnelReport = true;
				ResLibraryStat.personnelReport.getAll(filter)
					.then(res => {
						this.personnelReport = res.data;
						this.isLoadingPersonnelReport = false;
					})
					.catch(err => this.showErrors(err));
			},

			loadDerpatmentReport(filter) {
				this.isLoadingDepartmentReport = true;
				ResLibraryStat.departmentReport.getAll(filter)
					.then(res => {
						this.departmentReport = res.data;
						this.isLoadingDepartmentReport = false;
					})
					.catch(err => this.showErrors(err));
			},

			onPrint() {
				pdfMake
					.printReport(this.collections,
						this.studentReport.gradeLevelTotals,
						this.personnelReport,
						this.departmentReport,
						this.filter
					).open();
			},

			onFilter(filter) {
				this.loadDerpatmentReport(filter);
				this.loadStudentReport(filter);
				this.loadPersonnelReport(filter);
			},

			clearErrors() {
				this.errorMessages = [];
				this.isErrorLoading = false;
				this.isLoadingStudentReport = false;
				this.isLoadingPersonnelReport = false;
				this.isLoadingDepartmentReport = false;
			},

			showErrors(err) {
				if(err.response.status === 422) {
					this.errorMessages = err.response.data.ValidationMessages.map(e => e.msg);
				} else {
					this.errorMessages.push(err.message);	
				}
				if(this.isErrorLoading === false)
						this.isErrorLoading = true;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>