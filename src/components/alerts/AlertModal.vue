<template>

<!-- Modal -->
<div class="modal fade" id="AlertModal" tabindex="-1" role="dialog" aria-labelledby="AlertModalLabel" aria-hidden="true">
   <div class="modal-dialog" role="document">
      <div class="alert" role="alert"
         v-bind:class="{
            'alert-success': isSuccess,
            'alert-warning': isWarning,
            'alert-info': isInfo,
            'alert-danger': isError
            }">
         <h4 v-if="isSuccess" class="alert-heading">Successful!</h4>
         <h4 v-if="isWarning" class="alert-heading">Warning!</h4>
         <h4 v-if="isError" class="alert-heading">Something went wrong...</h4>
         <h4 v-if="isInfo" class="alert-heading">Heads up!</h4>
         <hr/>
         <slot></slot>
      </div>      
   </div>
</div>

</template>

<script>
// Jquery
import JQuery from 'jquery'
const $ = JQuery;

export default {
   name: "AlertModal",

   props: {
      msgType: {
         type: String,
         required: true,
         validator(value) {
            return ['success', 'warning', 'error', 'info'].indexOf(value) !== -1;
         }
      }
   },

   data() {
      return {
         isSuccess: this.msgType === 'success',
         isWarning: this.msgType === 'warning',
         isError: this.msgType === 'error',
         isInfo: this.msgType === 'info',
      }
   },

   created() {
      this.$nextTick(() => {
         let modal = $('#AlertModal');
         modal.modal('show');

         modal.on('hidden.bs.modal', e => {
            this.$emit('modal-close');
         });
      });
   }

}
</script>