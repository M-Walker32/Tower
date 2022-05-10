<template>
  <div class="col-md-3 my-4">
    <div class="m-2 h-100 bg-light align-items-center shadow">
      <img :src="tower.coverImg" :alt="tower.name" class="event-img pb-1" />
      <div class="p-2">
        <h5 class="text-secondary m-0 p-0">{{ tower.name }}</h5>
        <div v-if="tower.isCanceled" class="text-danger darken-10">
          This event is cancelled
        </div>
        <div v-if="tower.capacity == 0" class="text-danger darken-10">
          This event is sold out
        </div>
        <p class="text-primary m-0 p-0">
          remaining seats: {{ tower.capacity }}
        </p>
        <p class="m-0 p-0">
          {{ new Date(tower.startDate).toDateString() }}
          <br />
          {{ tower.location }}
        </p>
        <router-link :to="{ name: 'EventPage', params: { id: tower.id } }">
          <button
            v-if="tower.isCanceled"
            class="my-button bg-warning darken-10 w-100 mt-4"
            :title="tower.name + ' details'"
          >
            Details
          </button>
          <button
            v-if="!tower.isCanceled"
            class="my-button w-100 mt-4"
            :title="tower.name + ' details'"
          >
            Details
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { useRoute } from "vue-router"
export default {
  props: {
    tower: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRoute()
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>