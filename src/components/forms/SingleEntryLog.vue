<template>
<div id="SingleEntryLog">

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
				class="col-lg-3 col-6"
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
				class="col-lg-3 col-6"
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
				class="col-lg-3 col-6"
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
				class="col-lg-3 col-6"
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
					<div class="col-6">
						<h5>No. of Borrowers</h5>
					</div>
					<div class="col-2">
						<input type="number" 
							class="form-control form-control-sm txt-count"
							min="1"
							v-model="borrower_count">
					</div>
					<div class="col-2">
						<button
							@click="incrementBorrowerCount"
							class="btn btn-sm btn-block btn-outline-success b">+1</button>
					</div>
					<div class="col-2">
						<button
							@click="decrementBorrowerCount"
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
				class="col-xl-2 col-lg-3 col-sm-6 col-6">
				<CollectionCard v-model.number="borrowedCollections[i].qty" :collection="collection" />
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
	import CollectionCard from './CollectionCard'

	import ResBorrowingDoc from '../../resources/BorrowingDocument'

	export default {
		name: 'SingleEntryLog',

		components: {
			AlertModal,
			CollectionCard
		},

		props: {
			Collections: Array,
			Departments: Array,
			PersonnelGroups: Array,
			GradeLevels: Array,
			Sections: Array
		},

		data() {
			return {
				selectedDepartment: null,
				selectedPersonnelGroup: null,
				selectedGradeLevel: null,
				selectedSection: null,

				borrowedCollections: [],
				borrower_count: 1,

				isSaving: false,
				isError: false,
				isSaved: false,

				lastSavedData: {},
				validationMessages: []
			};
		},

		created() {

		},

		methods: {
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