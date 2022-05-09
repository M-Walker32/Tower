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
          <!-- TODO  a v-if fucntion that makes the attend button disappear if you have a ticket -->
          <div v-if="!patron">
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
        <div v-if="tickets[0]" class="p-3 bg-secondary shadow d-flex">
          <!-- TODO make a componenet for each person attending, this might be challenng to access?, update title tag -->
          <div class="m-2" v-for="t in tickets" :key="t.id" :tickets="t">
            <img
              :src="t.creator.picture"
              :title="t.creator.name + ' is attending'"
              class="patron-img shadow"
            />
          </div>
        </div>
        <div class="my-2">
          {{ tower.description }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h5 class="d-flex">
          Comments:
          <form @submit.prevent="createComment">
            <input
              name="add-note-input"
              class="mx-2"
              type="text"
              v-model="formData.body"
            />
            <button
              type="submit"
              title="create a comment"
              class="mdi mdi-plus bg-warning p-1 selectable"
            ></button>
          </form>
        </h5>
        <Comment v-for="c in comments" :key="c.id" :comment="c" />
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
import { commentsService } from "../services/CommentsService.js"
export default {
  name: 'EventPage',
  setup() {
    const formData = ref({})
    const route = useRoute()
    watchEffect(async () => {
      const tower = AppState.activeEvent
      route.params
      try {
        if (route.name == 'EventPage') {
          await towersService.getTower(route.params)
          // await ticketsService.getMyTickets()
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        await ticketsService.getEventTickets(route.params.id)
        await commentsService.getComments(route.params.id)
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      formData,
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
      async createComment() {
        try {
          formData.value.eventId = route.params.id
          await commentsService.createComment(formData.value)
          formData.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      tower: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      myTickets: computed(() => AppState.myTickets),
      patron: computed(() => AppState.myTickets.find(p => p.eventId == AppState.activeEvent.id))
    }
  }
}
</script>


<style lang="scss" scoped>
</style>