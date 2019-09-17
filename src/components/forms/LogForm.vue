<template>
	<div id="LogForm">
		<div v-if="isLoadedAll">

			<!-- Department -->
			<h4>Department</h4>
			<hr/>
			<div class="row">
				<div 
					class="col-lg-3"
					v-bind:key="department.id"
					v-for="department in Departments">
					
					<button 
						class="btn btn-outline-info btn-lg btn-block"
						v-bind:class="{ active: selectedDepartment === department.id }"
						@click="setSelectedDepartment(department.id)"
						>
						{{ department.name }}
					</button>
				</div>
			</div>
			<br>
			
			<!-- Faculty -->
			<div v-if="selectedDepartment !== null && getSelectedDepartment().is_personnel === true">
				<h4>Personnel</h4>
				<hr/>
				<div class="row">
					<!-- Faculty -->
					<div class="col-lg-12">
						<h5>Faculty</h5>
						<br>
					</div>
					<div 
						class="col-lg-3"
						v-bind:key="personnelGroup.id"
						v-for="personnelGroup in getFaculty()">
						
						<button 
							class="btn btn-outline-info btn-lg btn-block"
							v-bind:class="{ active: selectedPersonnelGroup === personnelGroup.id }"
							@click="setSelectedPersonnelGroup(personnelGroup.id)"
							>
							{{ personnelGroup.name }}
						</button>
					</div>
					<!-- Non-Faculty -->
					<div class="col-lg-12">
						<br>
						<h5>Non-Faculty</h5>
						<br>
					</div>
					<div 
						class="col-lg-3"
						v-bind:key="personnelGroup.id"
						v-for="personnelGroup in getNonFaculty()">
						
						<button 
							class="btn btn-outline-info btn-lg btn-block"
							v-bind:class="{ active: selectedPersonnelGroup === personnelGroup.id }"
							@click="setSelectedPersonnelGroup(personnelGroup.id)"
							>
							{{ personnelGroup.name }}
						</button>
					</div>
				</div>
				<br/>
			</div>

			<!-- Grade Level -->
			<div v-if="selectedDepartment !== null && getSelectedDepartment().is_personnel === false">
				<h4>Grade Level</h4>
				<hr/>
				<div class="row">
					<div 
						class="col-lg-3"
						v-bind:key="gradeLevel.id"
						v-for="gradeLevel in getGradeLevelFromSelectedDepartment()">
						
						<button 
							class="btn btn-outline-info btn-lg btn-block"
							v-bind:class="{ active: selectedGradeLevel === gradeLevel.id }"
							@click="setSelectedGradeLevel(gradeLevel.id)"
							>
							{{ gradeLevel.name }}
						</button>
					</div>
				</div>
				<br/>
			</div>

			<!-- Sections -->
			<div v-if="selectedGradeLevel !== null">
				<h4>Sections</h4>
				<hr/>
				<div class="row">
					<div 
						class="col-lg-3"
						v-bind:key="section.id"
						v-for="section in getSectionFromSelectedGradeLevel()">
						
						<button 
							class="btn btn-outline-info btn-lg btn-block"
							v-bind:class="{ active: selectedSection === section.id }"
							@click="setSelectedSection(section.id)"
							>
							{{ section.name }}
						</button>
					</div>
				</div>
				<br/>
			</div>
			
			<!-- Borrowed Collections -->
			<div v-if="selectedPersonnelGroup !== null || selectedSection !== null">
				<div class="row">
					<div class="col-sm-6">
						<h4>Collections</h4>
					</div>
					<div class="col-sm-6">
						<div class="row">
							<div class="col-sm-6" align="right">
								<h5>No. of Borrowers</h5>
							</div>
							<div class="col-sm-2">
								<input type="number" 
									class="form-control form-control-sm txt-count"
									min="1"
									v-model="borrower_count">
							</div>
							<div class="col-sm-2">
								<button
									@click="incrementBorrowerCount()"
									class="btn btn-sm btn-block btn-outline-success b">+1</button>
							</div>
							<div class="col-sm-2">
								<button
									@click="decrementBorrowerCount()"
									class="btn btn-sm btn-block btn-outline-danger b">-1</button>
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<div class="row">
					<div
						v-bind:key="collection.id"
						v-for="(collection, i) in Collections"
						class="col-2">
						<div class="card border-secondary mb-3 collection-card" style="max-width: 20rem;">
							<div class="card-header b collection-name">
								<div class="row">
									<div class="col-sm-6">{{collection.prefix}}</div>
									<div class="col-sm-6">
										<input type="number" 
											class="form-control form-control-sm txt-count" 
											min="0"
											v-model.number="borrowedCollections[i].qty">
									</div>
								</div>
								<!-- {{collection.prefix}} -->
							</div>
							<div class="card-body">
								<!-- <h4 class="card-title"></h4> -->
								<div class="row">
									<div class="col-12">
										<p class="card-text text-center">
											{{collection.name}}
										</p>
									</div>
								</div>											
								<!-- <div class="collection-name">{{collection.name}}</div> -->
							<!-- <p class="card-text"></p> -->
							</div>
							<div class="card-footer bg-transparent">
								<div class="row">
									<div class="col-sm-6">
										<button
											@click="incrementBorrowedCollection(collection.id)" 
											class="btn btn-sm btn-block btn-outline-success b">+1</button>
									</div>
									<div class="col-sm-6">
										<button
											@click="decrementBorrowedCollection(collection.id)" 
											class="btn btn-sm btn-block btn-outline-danger b">-1</button>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="row">
					<div class="col">
						<button 
							@click="saveBorrowingDoc()"
							class="btn btn-lg btn-block btn-success b">
							<span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Save
						</button>
					</div>
					<div class="col">
						<button class="btn btn-lg btn-block btn-secondary b" @click="resetSelection()">Reset</button>
					</div>
				</div>

			</div>
		</div>

		<AlertModal msgType="success" v-if="isSaved">
			<strong>Department</strong>: {{ getDepartmentFromId(lastSavedData.department_id).name }}
         <br/>
         <div v-if="lastSavedData.personnel_group_id !== null">
            <strong>Personnel Group</strong>: {{ getPersonnelGroupFromId(lastSavedData.personnel_group_id).name }}
         </div>
         <div v-else>
            <strong>Grade Level</strong>: {{ getGradeLevelFromId(getSectionFromId(lastSavedData.section_id).grade_level_id).name }}
            <br/>
            <strong>Section</strong>: {{ getSectionFromId(lastSavedData.section_id).name }}
         </div>
         <strong>Borrower Count</strong>: {{ lastSavedData.borrower_count }}
         <br/>
         <strong>Borrowed Collections</strong>:
         <ul>
            <li
               v-bind:key="item.collection_id"
               v-for="item in lastSavedData.items"
               class=""> [{{ getCollectionFromId(item.collection_id).prefix }}] {{ getCollectionFromId(item.collection_id).name }} : {{ item.qty }}  </li>
         </ul>
		</AlertModal>

		<AlertModal msgType="error" v-if="isError">
			<ul v-if="validationMessages.length > 0">
            <li
               v-bind:key="i"
               v-for="(validationMsg, i) in validationMessages" 
               > {{ validationMsg.msg }} </li>
         </ul>
		</AlertModal>

	</div>
</template>

<script>
	import AlertModal from '../alerts/AlertModal'

	import ResCollections from '../../resources/Collections'
	import ResDepartments from '../../resources/Departments'
	import ResGradeLevels from '../../resources/GradeLevels'
	import ResPersonnelGroups from '../../resources/PersonnelGroups'
	import ResSections from '../../resources/Sections'
	import ResBorrowingDoc from '../../resources/BorrowingDocument'

	export default {
		name: 'LogForm',

		components: {
			AlertModal
		},

		data() {
			return {
				Departments: [],
				isLoadingDepartments: true,
				selectedDepartment: null,

				PersonnelGroups: [],
				isLoadingPersonnelGroups: true,
				selectedPersonnelGroup: null,

				GradeLevels: [],
				isLoadingGradeLevels: true,
				selectedGradeLevel: null,

				Sections: [],
				isLoadingSections: true,
				selectedSection: null,

				Collections: [],
				isLoadingCollections: true,
				borrowedCollections: [],

				borrower_count: 1,

				isSaving: false,
				isError: false,
				isSaved: false,
				lastSavedData: {},
				validationMessages: []
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
			// setSelectedDepartment(1);
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

			getFaculty() {
				return this.PersonnelGroups.filter(e => e.is_faculty === true);
			},

			getNonFaculty() {
				return this.PersonnelGroups.filter(e => e.is_faculty === false);
			},

			clearSelectedPersonnelGroup() {
				this.selectedPersonnelGroup = null;
			},

			clearSelectedGradeLevel() {
				this.selectedGradeLevel = null;
			},

			clearSelectedSection() {
				this.selectedSection = null;
			},

			resetSelection() {
				this.clearSelectedPersonnelGroup();
				this.clearSelectedGradeLevel();
				this.clearSelectedSection();
			},

			setSelectedDepartment(department_id) {
				this.selectedDepartment = department_id;
				this.resetSelection();
			},

			setSelectedPersonnelGroup(personnel_group_id) {
				this.selectedPersonnelGroup = personnel_group_id;
				this.initBorrowedCollections();
			},

			setSelectedGradeLevel(grade_level_id) {
				this.selectedGradeLevel = grade_level_id;
				this.clearSelectedSection();
			},

			setSelectedSection(section_id) {
				this.selectedSection = section_id;
				this.initBorrowedCollections();
			},

			initBorrowedCollections() {
				this.borrower_count = 1;
				this.borrowedCollections = [];
				this.Collections.forEach(e => {
					// this.borrowedCollections[e.prefix] = 0;
					this.borrowedCollections.push({
						collection_id: e.id,
						qty: 0
					});
				});
			},

			incrementBorrowedCollection(collection_id) {
				// this.borrowedCollections[prefix] = parseInt(this.borrowedCollections[prefix]) + 1;
				let borrowedCollection = this.borrowedCollections
					.filter(e => e.collection_id === collection_id) [0];
				borrowedCollection.qty = parseInt(borrowedCollection.qty) + 1;

				this.$forceUpdate();
			},

			decrementBorrowedCollection(collection_id) {
				// if(this.borrowedCollections[prefix] > 0) {
				// 	this.borrowedCollections[prefix] = parseInt(this.borrowedCollections[prefix]) - 1;
				// 	this.$forceUpdate();
				// }
				let borrowedCollection = this.borrowedCollections
					.filter(e => e.collection_id === collection_id) [0];
				if(borrowedCollection.qty > 0) {
					borrowedCollection.qty = parseInt(borrowedCollection.qty) - 1;
					this.$forceUpdate();
				}
			},

			incrementBorrowerCount() {
				this.borrower_count = parseInt(this.borrower_count) + 1;
				this.$forceUpdate();
			},

			decrementBorrowerCount() {
				if(this.borrower_count > 1) {
					this.borrower_count = parseInt(this.borrower_count) - 1;
					this.$forceUpdate();
				}
			},
			
			getGradeLevelFromSelectedDepartment() {
				return this.GradeLevels
					.filter(e => e.department_id === this.selectedDepartment);
			},

			getSectionFromSelectedGradeLevel() {
				return this.Sections
					.filter(e => e.grade_level_id === this.selectedGradeLevel);
			},

			getSelectedDepartment() {
				return this.Departments.filter(e => e.id === this.selectedDepartment) [0];
			},

			saveBorrowingDoc() {
				let header = {
					department_id: this.selectedDepartment,
					borrower_count: this.borrower_count,
				};

				if(this.selectedPersonnelGroup === null && this.selectedSection !== null)
					header.section_id = this.selectedSection;
				else
					header.personnel_group_id = this.selectedPersonnelGroup;

				this.isSaving = true;
				this.isSaved = false;
				this.isError = false;

				ResBorrowingDoc.create(header, this.borrowedCollections)
					.then(res => {
						this.isSaving = false;
						this.isSaved = true;
						this.lastSavedData = res.data;
						this.resetSelection();
					})
					.catch(e => {
						if (e.response.status === 422)
							this.validationMessages = e.response.data.ValidationMessages;
						this.isSaving = false;
						this.isError = true;
					});
			},

			getDepartmentFromId(department_id) {
				return this.Departments.filter(e => e.id === department_id) [0];
			},

			getPersonnelGroupFromId(personnel_group_id) {
				return this.PersonnelGroups.filter(e => e.id === personnel_group_id) [0];
			},

			getGradeLevelFromId(grade_level_id) {
				return this.GradeLevels.filter(e => e.id === grade_level_id) [0];
			},

			getSectionFromId(section_id) {
				return this.Sections.filter(e => e.id === section_id) [0];
			},

			getCollectionFromId(collection_id) {
				return this.Collections.filter(e => e.id === collection_id) [0];
			},

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.form-control-xs {
		font-size: 0.75em;
	}

	.txt-count {
		font-size: 85%;
		text-align: center;
		font-weight: bold;
		color: #3d3d3d;
	}

	.collection-card {
		min-height: 12.5em !important;
	}

	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { 
		-webkit-appearance: none; 
		margin: 0; 
	}

	input[type=number] {
		-moz-appearance:textfield; /* Firefox */
	}

</style>