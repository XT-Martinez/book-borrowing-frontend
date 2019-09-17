<template>
	<div id="LogView">
		<!-- <h2>Log View</h2> -->
		<LogForm/>
	</div>
</template>

<script>
	// import axios from 'axios';
	import LogForm from './forms/LogForm'

	export default {
		name: 'LogView',
		components: {
			LogForm
		},
		
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>