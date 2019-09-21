<template>

	<div id="StudentTotalsReport">

		<h4>Borrowing Statistics for Students</h4>
		<table
			class="table table-striped table-bordered table-sm table-responsive">

			<thead align="center"> 

				<!-- Columns -->
				<tr class="table-primary">
					<th>Grade Level</th>
					<th>Section</th>
					<th style="width: 9%;"># of Borrowers</th>
					<th
						style="width: 6%;"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ collection.prefix }}
					</th>
					<th style="width: 8%;">Total Vol.</th>
				</tr>

			</thead>

			<tbody
				v-bind:key="'d' + gradeLevel.id"
				v-for="gradeLevel in studentReport.gradeLevelTotals">
				
				<!-- Grade Level Total -->
				<tr class="table-warning">
					<td class="b"> {{ gradeLevel.name }} </td>
					<td></td>
					<td align="center" class="b"> {{ gradeLevel.totals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections"
						class="b">
						{{ gradeLevel.totals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ gradeLevel.totals.sub_total }}</strong> </td>
				</tr>

				<!-- Section Total -->
				<tr
					v-bind:key="section.id" 
					v-for="section in gradeLevel.sections">
					<td></td>
					<td align="center"> {{ section.name }} </td>
					<td align="center"> {{ section.totals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ section.totals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ section.totals.sub_total }}</strong> </td>
				</tr>
			</tbody>
			
		</table>

	</div>
</template>

<script>
	// import axios from 'axios';

	export default {
		name: 'StudentTotalsReport',

		props: {
			collections: Array,
			studentReport: Object
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.sub-row {
		padding-left: 1.5em;
	}

	.table thead th {
		vertical-align: middle;
	}

	.table-sm {
		font-size: 85%;
	}
</style>