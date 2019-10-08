<template>
<div id="LogForm">
	<div v-if="isLoadedAll">

		<!-- Entry Mode -->
		<h4>Entry Mode</h4>
		<hr/>
		<div class="row">
			<div class="col-3">
				<button 
					class="btn btn-outline-info btn-lg btn-block"
					v-bind:class="{ active: selectedMode === LOGGING_MODE_SINGLE }"
					@click="setSelectedMode(LOGGING_MODE_SINGLE)"
					> Single Entry	</button>
			</div>
			<div class="col-3">
				<button 
					class="btn btn-outline-info btn-lg btn-block"
					v-bind:class="{ active: selectedMode === LOGGING_MODE_BULK }"
					@click="setSelectedMode(LOGGING_MODE_BULK)"
					> Bulk Entry	</button>
			</div>
		</div>
		<br>

		<div v-show="selectedMode === LOGGING_MODE_SINGLE">
			<SingleEntryLog
				:Departments="Departments"
				:PersonnelGroups="PersonnelGroups"
				:GradeLevels="GradeLevels"
				:Sections="Sections"
				:Collections="Collections"
				/>
		</div>

		<div v-show="selectedMode === LOGGING_MODE_BULK">
			<BulkLog
				:Departments="Departments"
				:PersonnelGroups="PersonnelGroups"
				:GradeLevels="GradeLevels"
				:Sections="Sections"
				:Collections="Collections"
				/>
		</div>

	</div>
</div>
</template>

<script>
	import SingleEntryLog from './SingleEntryLog'
	import BulkLog from './BulkLog'

	import ResCollections from '../../resources/Collections'
	import ResDepartments from '../../resources/Departments'
	import ResGradeLevels from '../../resources/GradeLevels'
	import ResPersonnelGroups from '../../resources/PersonnelGroups'
	import ResSections from '../../resources/Sections'
	import ResBorrowingDoc from '../../resources/BorrowingDocument'

	export default {
		name: 'LogForm',

		components: {
			SingleEntryLog,
			BulkLog
		},

		data() {
			return {
				LOGGING_MODE_SINGLE: 1,
				LOGGING_MODE_BULK: 2,
				selectedMode: null,

				Departments: [],
				isLoadingDepartments: true,

				PersonnelGroups: [],
				isLoadingPersonnelGroups: true,

				GradeLevels: [],
				isLoadingGradeLevels: true,
				
				Sections: [],
				isLoadingSections: true,

				Collections: [],
				isLoadingCollections: true,
			}
		},

		computed: {
			isLoadedAll() {
				return !this.isLoadingPersonnelGroups
					&& !this.isLoadingCollections
					&& !this.isLoadingDepartments
					&& !this.isLoadingGradeLevels
					&& !this.isLoadingSections
			}
		},

		created() {
			this.loadAll();
		},

		methods: {
			loadAll() {
				this.loadCollections();
				this.loadDepartments();
				this.loadGradeLevels();
				this.loadPersonnelGroups();
				this.loadSections();
			},

			loadCollections() {
				this.isLoadingCollections = true;
				ResCollections.getAll()
					.then(res => {
						this.Collections = res.data;
						this.isLoadingCollections = false;
					})
					.catch(err => alert(err));
			},

			loadDepartments() {
				this.isLoadingDepartments = true;
				ResDepartments.getAll()
					.then(res => {
						this.Departments = res.data;
						this.isLoadingDepartments = false;
					})
					.catch(err => alert(err));
			},

			loadGradeLevels() {
				this.isLoadingGradeLevels = true;
				ResGradeLevels.getAll()
					.then(res => {
						this.GradeLevels = res.data;
						this.isLoadingGradeLevels = false;
					})
					.catch(err => alert(err));
			},

			loadPersonnelGroups() {
				this.isLoadingPersonnelGroups = true;
				ResPersonnelGroups.getAll()
					.then(res => {
						this.PersonnelGroups = res.data;
						this.isLoadingPersonnelGroups = false;
					})
					.catch(err => alert(err));
			},

			loadSections() {
				this.isLoadingSections = true;
				ResSections.getAll()
					.then(res => {
						this.Sections = res.data;
						this.isLoadingSections = false;
					})
					.catch(err => alert(err));
			},

			setSelectedMode(mode) {
				this.selectedMode = mode;
			},

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>