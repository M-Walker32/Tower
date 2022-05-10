<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-3">
        <div class="d-flex align-items-end">
          <div class="type-box p-2">{{ tower.type }}</div>
          <h1 class="h-font px-3">{{ tower.name }}</h1>
        </div>
        <div class="line w-100 my-4"></div>

        <h1 class="bg-danger text-light my-2" v-if="tower.isCanceled">
          This event has been cancelled.
        </h1>
        <img
          :src="tower.coverImg"
          class="events-header shadow my-2"
          :alt="tower.name"
        />
        <div
          class="
            event-details
            p-2
            my-2
            h-font
            col-12
            shadow
            justify-content-between
            d-flex
          "
        >
          <div class="col-4">
            Date:
            <span class="text-primary">{{
              new Date(tower.startDate).toDateString()
            }}</span>
          </div>
          <div class="col-4">
            Location:
            <span class="text-primary">{{ tower.location }}</span>
          </div>
          <div class="col-4 text-end">
            Seats left:
            <span class="text-primary">{{ tower.capacity }}</span>
          </div>
        </div>
        <div v-if="tickets[0]" class="p-3 bg-primary lighten-20 shadow d-flex">
          <div class="m-2" v-for="t in tickets" :key="t.id" :tickets="t">
            <img
              :src="t.creator.picture"
              :title="t.creator.name + ' is attending'"
              class="patron-img shadow"
            />
          </div>
        </div>

        <div class="d-flex justify-content-between my-4">
          <div v-if="account.id">
            <div v-if="!patron">
              <div v-if="tower.capacity > 0">
                <button
                  v-if="!tower.isCanceled"
                  class="attend my-button"
                  title="attend this event"
                  @click="attend"
                >
                  Attend
                </button>
              </div>
            </div>
          </div>
          <div class="div" v-if="account.id == tower.creatorId">
            <div v-if="!tower.isCanceled">
              <button
                v-if="account.id == tower.creatorId"
                title="cancel {{tower.name}}"
                @click="cancelEvent"
                class="my-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div class="my-2 text-dark bg-light">
          <p class="m-3 p-3">
            <span class="text-secondary darken-10">DESCRIPTION:</span>
            {{ tower.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="line w-100 my-4"></div>
    <div class="row">
      <div class="col-12">
        <h5 class="d-flex text-light col-12">Comments:</h5>
        <form class="col-12" @submit.prevent="createComment">
          <input
            name="add-note-input"
            class="mr-2 rounded"
            type="text"
            v-model="formData.body"
            required
          />
          <i
            type="submit"
            title="create a comment"
            class="text-primary lighten-20 mx-2 selectable"
          >
            +
          </i>
        </form>
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
import { accountService } from "../services/AccountService.js"
export default {
  name: 'EventPage',
  setup() {
    const formData = ref({})
    const route = useRoute()
    watchEffect(async () => {
      // const tower = AppState.activeEvent
      route.params
      try {
        if (route.name == 'EventPage') {
          await towersService.getTower(route.params)
          await ticketsService.getMyTickets()
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    onMounted(async () => {
      try {
        if (route.name == 'EventPage') {
          await ticketsService.getEventTickets(route.params.id)
          await commentsService.getComments(route.params.id)
          // await accountService.getAccount()
          // await ticketsService.getMyTickets()
        }
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
.type-box {
  background-color: #943d03;
  color: whitesmoke;
}
.line {
  height: 2px;
  background-color: #e6eca0;
}
</style>