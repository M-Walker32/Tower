<template>
  <div class="bg-warning ticket w-100">
    <div class="d-flex shadow my-2">
      <img class="ticket-img" :src="ticket.event.coverImg" />
      <div class="">
        <div class="d-flex justify-content-between">
          <h5 class="m-2 text-color">{{ ticket.event.name }}</h5>
          <div
            title="delete ticket to {{ticket.event.name}}"
            class="mx-1 selectable mdi mdi-close-circle-outline"
            @click.prevent="deleteTicket"
          ></div>
        </div>
        <p class="m-2">
          {{ ticket.event.description }}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { ticketsService } from "../services/TicketsService.js"
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async deleteTicket() {
        if (await Pop.confirm()) {
          try {
            await ticketsService.deleteTicket(props.ticket)
          } catch (error) {
            logger.error(error)
            Pop.toast(error.message, 'error')
          }
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket {
  object-fit: contain;
}
.ticket-img {
  width: 20%;
  height: 100%;
  object-fit: cover;
}
</style>