<template>
  <div class="container bg-background pt-3">
    <div class="row-fluid">
      <div class="col-12">
        <img src="http://thiscatdoesnotexist.com" class="events-header" />
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- Sorting navbar -->
      <div class="col-12">
        <div
          class="
            text-success text-uppercase
            bg-primary
            w-100
            my-2
            p-1
            h-font
            justify-content-around
            d-flex
          "
        >
          <h2 class="selectable" @click="sort = ''" title="view all events">
            All
          </h2>
          <h2
            class="selectable"
            @click="sort = 'concert'"
            title="view concerts"
          >
            concerts
          </h2>
          <h2
            class="selectable"
            @click="sort = 'convention'"
            title="view conventions"
          >
            conventions
          </h2>
          <h2
            class="selectable"
            @click="sort = 'sport'"
            title="view sporting events"
          >
            sports
          </h2>
          <h2
            class="selectable"
            @click="sort = 'digital'"
            title="view virtual events"
          >
            virtual
          </h2>
        </div>
      </div>
    </div>
    <div class="row justify-content-start">
      <!-- Project here -->
      <Tower v-for="t in sortedEvents" :key="t.id" :tower="t" />
      <div class="div">
        <Paginator />
      </div>
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
</style>
