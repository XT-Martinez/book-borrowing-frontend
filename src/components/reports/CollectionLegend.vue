<template>
	<div id="CollectionLegend">
		<h5>Legend</h5>
		<table class="table table-sm table-bordered" id="legend">
			<thead>
				<tr class="table-warning">
					<th>Prefix</th>
					<th>Collection</th>
				</tr>
			</thead>
			<tbody>
				<tr v-bind:key="collection.id" v-for="collection in collections">
					<th scope="row"> {{ collection.prefix }} </th>
					<td> {{ collection.name }} </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	// import axios from 'axios';

	export default {
		name: 'CollectionLegend',
		props: {
			collections: Array,
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#legend {
		font-size: 85%;
	}
</style>