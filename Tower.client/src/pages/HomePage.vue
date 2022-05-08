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
            bg-primary
            w-100
            my-2
            p-1
            text-light
            h-font
            justify-content-around
            d-flex
          "
        >
          <h2 class="selectable" @click.prevent="" title="sort by concert">
            concert
          </h2>
          <h2 class="selectable" @click.prevent="" title="sort by convention">
            convention
          </h2>
          <h2 class="selectable" @click.prevent="" title="sort by sport">
            sport
          </h2>
          <h2 class="selectable" @click.prevent="" title="sort by digital">
            digital
          </h2>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- Project here -->
      <Tower v-for="t in towers" :key="t.id" :tower="t" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"
import { towersService } from "../services/TowersService.js"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      await towersService.getAllTowers()
    })
    return {
      towers: computed(() => AppState.towers)
    }
  },
}
</script>

<style scoped lang="scss">
</style>
