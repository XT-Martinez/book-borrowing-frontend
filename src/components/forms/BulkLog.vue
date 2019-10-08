<template>
<div id="BulkLog">

	<h4>By Students</h4>

	<div class="tableFixHead">
	<table class="table table-striped table-bordered table-sm table-responsive table-fixed">

		<thead align="center"> 

			<!-- Columns -->
			<tr class="table-primary">
				<th>Grade Level</th>
				<th>Section</th>
				<th style="width: 7%;"># of Borrowers</th>
				<th
					style="width: 6%;"
					v-bind:key="collection.id" v-for="collection in Collections">
					{{ collection.prefix }}
				</th>
				<th style="width: 8%;">Total Vol.</th>
			</tr>

		</thead>

		<tbody
			v-bind:key="'d' + gradeLevel.id"
			v-for="gradeLevel in GradeLevels">
			
			<!-- Grade Level Total -->
			<tr class="table-warning">
				<td class="b"> {{ gradeLevel.name }} </td>
				<td></td>
				<td></td>
				<td v-bind:key="collection.id" v-for="collection in Collections"></td>
				<td></td>
			</tr>

			<!-- Section Total -->
			<tr
				v-bind:key="section.id" 
				v-for="section in getSectionsFromGradeLevel(gradeLevel.id)">
				<td></td>
				<td align="center"> {{ section.name }} </td>
				<td align="center"> <input type="number" class="form-control form-control-xs txt-count" > </td>
				<td
					align="center"
					v-bind:key="collection.id" v-for="collection in Collections">
					<input type="number" class="form-control form-control-xs txt-count" >
				</td>
				<td align="center"> <strong>0</strong> </td>
			</tr>
		</tbody>

	</table>
	</div>
</div>
</template>

<script>
export default {
	name: "BulkLog",

	props: {
		Collections: Array,
		Departments: Array,
		PersonnelGroups: Array,
		GradeLevels: Array,
		Sections: Array
	},

	data() {
		return {

			isSaving: false,
			isError: false,
			isSaved: false,
			lastSavedData: [],
			validationMessages: []
		}
	},

	methods: {
		getSectionsFromGradeLevel(grade_level_id) {
			return this.Sections.filter(s => s.grade_level_id === grade_level_id);
		}
	}
}
</script>

<style>
	.sub-row {
		padding-left: 1.5em;
	}

	.table thead th {
		vertical-align: middle;
	}

	.table-sm {
		font-size: 85%;
	}

	.txt-count {
		font-size: 85%;
		text-align: center;
		font-weight: bold;
		color: #3d3d3d;
	}

	.form-control-xs {
		font-size: 0.75em;
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