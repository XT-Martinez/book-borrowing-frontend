<template>
<div class="collection-card">
	<div class="card border-secondary mb-3 collection-card">
		<div class="card-header b collection-name">
			<div class="row">
				<div class="col-6">{{collection.prefix}}</div>
				<div class="col-6">
					<input type="number" min="0" class="form-control form-control-sm txt-count"
						:value="value"
						@input="$emit('input', $event.target.value)">
				</div>
			</div>
			<!-- {{collection.prefix}} -->
		</div>
		<div class="card-body">
			<!-- <h4 class="card-title"></h4> -->
			<div class="row">
				<div class="col-12">
					<p class="card-text text-center">
						{{collection.name}}
					</p>
				</div>
			</div>											
			<!-- <div class="collection-name">{{collection.name}}</div> -->
		<!-- <p class="card-text"></p> -->
		</div>
		<div class="card-footer bg-transparent">
			<div class="row">
				<div class="col-6">
					<button
						@click="incrementBorrowedCollection()" 
						class="btn btn-sm btn-block btn-outline-success b">+1</button>
				</div>
				<div class="col-6">
					<button
						@click="decrementBorrowedCollection()" 
						class="btn btn-sm btn-block btn-outline-danger b">-1</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "CollectionCard",
	props: {
		value: Number,
		collection: Object
	},
	methods: {
		incrementBorrowedCollection() {
			this.$emit('input', parseInt(this.value) + 1);
		},

		decrementBorrowedCollection() {
			if(this.value > 0) 
				this.$emit('input', parseInt(this.value) - 1);
		},
	}
}
</script>

<style>
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

	.collection-card {
		min-height: 12.5em !important;
	}
</style>