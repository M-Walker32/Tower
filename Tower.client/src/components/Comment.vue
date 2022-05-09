<template>
  <div class="container my-4 rounded bg-grey rounded p-3">
    <div class="d-flex m-2">
      <div class="me-2">
        <img :src="comment.creator.picture" class="img-fluid profile-img" />
      </div>
      <div class="d-flex">
        <div class="d-flex align-items-center">
          <i
            class="m-1 mdi mdi-delete-outline selectable on-hover"
            title="Delete note"
            @click="deleteComment"
          ></i>
        </div>
      </div>
      <div class="p-1 w-100 bg-white">
        <h6 class="text-primary font-weight-bold m-1">
          {{ comment.creator.name }}
        </h6>
        <p class="m-1 p-0">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>