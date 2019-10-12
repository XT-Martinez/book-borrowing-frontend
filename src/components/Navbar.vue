<template>
	<div id="Navbar">
		<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-info">
			<div class="container">
			<router-link to="/" class="navbar-brand b">Book Borrowing Logger</router-link>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
				aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav mr-auto">
					<li
						v-bind:key="route.path"
						v-for="route in $router.options.routes"
						class="nav-item"
						v-bind:class="{active: isRouteActive(route)}">
						<router-link 
							class="nav-link" 
							:to="route.path">
								{{route.meta.label}} 
								<span v-if="isRouteActive(route)" class="sr-only">(current)</span>
						</router-link>
					</li>
				</ul>
			</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				router: this.$router
			}
		},
		created() {
			// alert(this.$route.currentRoute);
		},
		methods: {
			isRouteActive(route) {
				return route.path === this.$router.currentRoute.path;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar-nav a {
		font-weight: bold;
	}
	/* .nav-item.active > .nav-link {
		color: #fff;
		font-weight: bold;
	} */
</style>