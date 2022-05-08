<template>
  <div class="col-3 mt-2">
    <div class="bg-light align-items-center shadow">
      <img :src="tower.coverImg" class="event-img pb-1" />
      <div class="p-2">
        <h5 class="text-secondary m-0 p-0">{{ tower.name }}</h5>
        <p class="text-primary m-0 p-0">
          remaining seats: {{ tower.capacity }}
        </p>
        <p class="m-0 p-0">
          {{ new Date(tower.startDate).toDateString() }}
          <br />
          {{ tower.location }}
        </p>
        <router-link :to="{ name: 'EventPage', params: { id: tower.id } }">
          <button class="my-button w-100 mt-4" :title="tower.name + ' details'">
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