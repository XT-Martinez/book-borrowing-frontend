<template>
	<div id="app">
		<Navbar/>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import Navbar from './components/Navbar'

export default {
	name: 'app',
	components: {
		Navbar
	}
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
	padding-top: 70px;
}

.b {
	font-weight: bold;
}

.v-center {
	margin-top: auto;
	margin-bottom: auto;
}
</style>
