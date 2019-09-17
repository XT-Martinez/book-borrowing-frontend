<template>
	<div id="LogFormItem">
		<!-- Button trigger modal -->
		<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#LogItemModal">
			Launch demo modal
		</button>

		<!-- Modal -->
		<div class="modal fade" id="LogItemModal" tabindex="-1" role="dialog" aria-labelledby="LogItemModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-sm" role="document">
				<div class="modal-content">

					<div class="modal-header">
						<h4 class="modal-title text-danger" id="LogItemModalLabel">Error!</h4>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						</div>

					<!-- Model Body -->
					<div class="modal-body">
						Test
					</div>

					<!-- Modal Footer -->
					<!-- <div class="modal-footer">
						<button type="button" class="btn btn-success">Save</button>
						<button type="button" class="btn btn-secondary" data-dismiss="modal" id="dismissModal">Close</button>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'LogFormItem',
		props: {
			Collections: Array,
			PersonnelGroups: Array
		},

		created() {
			// $('#LogItemModal').on('shown.bs.modal', function () {
			// 	$('#myInput').trigger('focus');
			// });
			// alert('hi');
			this.$nextTick(() => {
				// $('#LogItemModal').modal('show');
			})
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/* .modal-dialog {
		width: 850px;
	} */

	.collection-name {
		font-size: 85%;
	}

	input.collection-name {
		text-align: center;
		font-weight: bold;
	}

	.card-footer {
		padding: 0.2em;
	}

	@media (min-width: 1200px) {
		.modal-xl {
			width: 70%; 
		}
	}
</style>