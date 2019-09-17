<template>
	<div id="Navbar">
		
		<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-info">
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
						<!-- <a 
							class="nav-link" 
							v-bind:href="'#' + route.path">
								{{route.meta.label}} 
								<span v-if="isRouteActive(route)" class="sr-only">(current)</span>
						</a> -->
						<router-link 
							class="nav-link" 
							:to="route.path">
								{{route.meta.label}} 
								<span v-if="isRouteActive(route)" class="sr-only">(current)</span>
						</router-link>
					</li>
					<!-- <li class="nav-item">
						<a class="nav-link" href="#/log">Log<span class="sr-only">(current)</span></a>
					</li> -->
					<!-- <li class="nav-item">
						<a class="nav-link" href="#/summary">Summary</a>
					</li> -->
					<!-- <li class="nav-item">
						<a class="nav-link" href="#">Pricing</a>
					</li> -->
					<!-- <li class="nav-item">
						<a class="nav-link" href="#/">About</a>
					</li> -->
				</ul>
				<!-- <form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="text" placeholder="Search">
					<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
				</form> -->
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