<template>
	<div id="GrandTotalTable">

		<h4>Borrowing Statistics by Department</h4>
		
		<table
			class="table table-striped table-bordered table-sm table-responsive">

			<thead align="center"> 

				<!-- Columns -->
				<tr class="table-primary">
					<th>Department</th>
					<th style="width: 9%;"># of Borrowers</th>
					<th
						style="width: 6%;"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ collection.prefix }}
					</th>
					<th style="width: 8%;">Total Vol.</th>
				</tr>

			</thead>

			<tbody>
				
				<!-- Department Total -->
				<tr 
					v-bind:key="'d' + department.id"
					v-for="department in departmentReport.departmentTotals">

					<td class="b"> {{ department.name }} </td>
					<td align="center"> {{ department.totals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ department.totals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ department.totals.sub_total }}</strong> </td>
				</tr>

				<!-- Faculty Grand Total -->
				<tr>
					<td> <strong>Faculty</strong> </td>
					<td align="center"> {{ personnelReport.facultyTotals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ personnelReport.facultyTotals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ personnelReport.facultyTotals.sub_total }}</strong> </td>
				</tr>
				
				<!-- Faculty Totals -->
				<tr 
					v-bind:key="'p' + personnel.id"
					v-for="personnel in facultyTotals">

					<td class="sub-row"> {{ personnel.name }} </td>
					<td align="center"> {{ personnel.totals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ personnel.totals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ personnel.totals.sub_total }}</strong> </td>
				</tr>

				<!-- Non Faculty Totals -->
				<tr 
					v-bind:key="'p' + personnel.id"
					v-for="personnel in nonFacultyTotals">

					<td class="b"> {{ personnel.name }} </td>
					<td align="center"> {{ personnel.totals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ personnel.totals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ personnel.totals.sub_total }}</strong> </td>
				</tr>

				<!-- Department Grand Total -->
				<tr class="table-warning b">
					<td> <strong>Grand Total</strong> </td>
					<td align="center"> {{ departmentReport.grandTotals.borrower_count }} </td>
					<td
						align="center"
						v-bind:key="collection.id" v-for="collection in collections">
						{{ departmentReport.grandTotals[collection.prefix] }}
					</td>
					<td align="center"> <strong>{{ departmentReport.grandTotals.sub_total }}</strong> </td>
				</tr>
			</tbody>
			
		</table>

	</div>
</template>

<script>

	export default {
		name: 'GrandTotalTable',
		props: {
			collections: Array,
			departmentReport: Object,
			personnelReport: Object
		},

		computed: {
			facultyTotals() {
				if(!this.isLoadingPersonnelReport) {
					return this.personnelReport.personnelGroupTotals
						.filter(p => p.is_faculty);
				}
				else {
					return [];
				}
			},

			nonFacultyTotals() {
				if(!this.isLoadingPersonnelReport) {
					return this.personnelReport.personnelGroupTotals
						.filter(p => !p.is_faculty);
				}
				else {
					return [];
				}
			},
		}

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