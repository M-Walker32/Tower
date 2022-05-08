<template>
  <div class="modal" id="create-event-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot class="modal-title" name="modal-title-slot"></slot>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="modal-body-slot"></slot>
        </div>
      </div>
    </div>
  </div>
</template>