<template>
  <div class="container my-4 srounded bg-primary darken-10 rounded p-3">
    <div class="d-flex m-2">
      <div class="me-2">
        <img :src="comment.creator.picture" class="img-fluid profile-img" />
      </div>
      <div class="p-1 w-100 bg-white">
        <h6 class="text-primary d-flex font-weight-bold m-1">
          {{ comment.creator.name }}
          <i
            v-if="comment.creator.id == account.id"
            class="mdi mdi-delete-outline selectable"
            title="Delete comment"
            @click.prevent="deleteComment"
          ></i>
        </h6>
        <p class="m-1 text-dark p-0">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { commentsService } from "../services/CommentsService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteComment() {
        try {
          if (await Pop.confirm()) {
            await commentsService.deleteComment(props.comment)
          }
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>