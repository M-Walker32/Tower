<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-3">
        <div class="type-box p-1">{{ tower.type }}</div>
        <h1 class="bg-danger text-light my-2" v-if="tower.isCanceled">
          This event has been cancelled.
        </h1>
        <div class="d-flex justify-content-between my-4">
          <h1 class="h-font">{{ tower.name }}</h1>
          <div v-if="tower.capacity > 0">
            <button
              v-if="!tower.isCanceled"
              class="attend"
              title="attend this event"
              @click="attend"
            >
              Attend
            </button>
          </div>
          <div v-if="!tower.isCanceled">
            <button
              v-if="account.id == tower.creatorId"
              title="cancel {{tower.name}}"
              @click="cancelEvent"
            >
              Cancel
            </button>
          </div>
        </div>
        <img :src="tower.coverImg" class="events-header shadow my-2" />
        <div
          class="
            event-details
            p-2
            my-2
            h-font
            shadow
            justify-content-between
            d-flex
          "
        >
          <div>
            Date:
            <span class="text-warning">{{
              new Date(tower.startDate).toDateString()
            }}</span>
          </div>
          <div class="div">
            Location: <span class="text-warning">{{ tower.location }}</span>
          </div>
          <div class="div">
            Seats left: <span class="text-warning">{{ tower.capacity }}</span>
          </div>
        </div>
        <div class="p-3 bg-secondary shadow">
          <!-- TODO make a componenet for each person attending, this might be challenng to access?, update title tag -->
          <img
            src="http://thiscatdoesnotexist.com"
            title="name of attender"
            class="profile-img shadow"
          />
        </div>
        <div class="my-2">
          {{ tower.description }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { towersService } from "../services/TowersService.js"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { onMounted, watchEffect } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { ticketsService } from "../services/TicketsService.js"
export default {
  name: 'EventPage',
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      const tower = AppState.activeEvent
      route.params
      try {
        if (route.name == 'EventPage') {
          await towersService.getTower(route.params)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await ticketsService.getTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      async cancelEvent() {
        try {
          await towersService.cancelEvent(route.params)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async attend() {
        try {
          await ticketsService.createTicket(this.tower.id, this.account.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      tower: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>