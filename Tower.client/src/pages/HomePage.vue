<template>
  <div class="container-fluid bg-background pt-3">
    <div class="row">
      <div class="col-12 events-header">
        <h1 class="logo">Upcoming Events</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- Sorting navbar -->
      <div
        class="
          text-success text-uppercase
          bg-primary
          col-12 col-md-6
          mt-3
          h-font
          justify-content-around
          p-2
          d-flex
        "
      >
        <h5 class="selectable" @click="sort = ''" title="view all events">
          All
        </h5>
        <h5 class="selectable" @click="sort = 'concert'" title="view concerts">
          concerts
        </h5>

        <h5
          class="selectable"
          @click="sort = 'sport'"
          title="view sporting events"
        >
          sports
        </h5>
      </div>
      <div
        class="
          mt-md-3
          col-12 col-md-6
          text-success text-uppercase
          h-font
          justify-content-around
          d-flex
          p-2
          bg-primary
        "
      >
        <h5
          class="selectable"
          @click="sort = 'convention'"
          title="view conventions"
        >
          conventions
        </h5>

        <h5
          class="selectable"
          @click="sort = 'digital'"
          title="view virtual events"
        >
          virtual
        </h5>
      </div>
    </div>
    <div class="row my-3">
      <!-- Project here -->
      <Tower v-for="t in sortedEvents" :key="t.id" :tower="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
import { towersService } from "../services/TowersService.js"
export default {
  name: 'Home',
  setup() {
    const sort = ref('')
    const sortedEvents = ref([])
    watchEffect(() => {
      let list = AppState.towers
      if (sort.value) {
        list = list.filter(t => t.type == sort.value)
      }
      sortedEvents.value = list
    })
    watchEffect(async () => {
      try {
        await towersService.getAllTowers()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sort,
      sortedEvents
    }
  },
}
</script>

<style scoped lang="scss">
.logo {
  text-transform: uppercase;
  font-family: "Permanent Marker", Impact, Haettenschweiler, "Arial Narrow Bold",
    sans-serif;
  position: absolute;
  color: azure;
  top: 4em;
  left: 1em;
}
</style>
