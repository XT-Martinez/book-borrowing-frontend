<template>
	<div id="FilterForm">
		<div class="card">
			<!-- <h5 class="card-header b">Filter</h5> -->
			<div class="card-body">
				<form>
					<div class="form-group row">
						<h6 class="col-12">
							<input type="radio" id="filter_type" value="1" v-model.number="filter.filter_type"/> Filter By Month/Year
						</h6>
						<div class="col-6">
							<label class="form-check-label b" for="isMonthly">Month</label>
							<select
								v-model="filter.month"
								class="form-control">
								<option 
								v-bind:key="month.id"
								v-bind:value="month.id"
								v-for="month in months"> {{ month.name }} </option>
							</select>
						</div>
						<div class="col-6">
							<label class="form-check-label b" for="isMonthly">Year</label>
							<select
								v-model="filter.year"
								class="form-control">
								<option
								v-bind:key="year"
								v-bind:value="year"
								v-for="year in years"> {{ year }} </option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<h6 class="col-12">
							<input type="radio" id="filter_type" value="2" v-model.number="filter.filter_type"/> Filter By Date Range
						</h6>
						<div class="col-6">
							<label class="form-check-label b">Start Date</label>
							<input type="text" class="form-control datepicker" placeholder="MM-DD-YYYY"
								v-model="filter.start_date">
						</div>
						<div class="col-6">
							<label class="form-check-label b">End Date</label>
							<input type="text" class="form-control datepicker" placeholder="MM-DD-YYYY"
								v-model="filter.end_date">
						</div>
					</div>
				</form>
			</div>

			<div class="card-footer">
				<div class="row">
					<div class="col">
						<button
							@click="filterReport"
							type="button"
							class="b btn btn-block btn-success">Filter</button>
					</div>
					<div class="col">
						<button
							@click="print"
							type="button"
							class="b btn btn-block btn-warning">Print</button>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import DateTimeHelper from '../../helpers/DateTime'

export default {
	name: 'FilterForm',

	props: {
		filter: Object
	},

	data() {
		return {
			months: DateTimeHelper.getMonths(),
			years: DateTimeHelper.getYears(),

			start_date: new Date()
		}
	},

	methods: {
		filterReport() {
			this.$emit('filterReport', this.filter);
		},

		print() {
			this.$emit('print', this.filter);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>