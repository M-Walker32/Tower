<template>
  <div class="ticket">
    <div class="d-flex text-light shadow my-4 h-100">
      <img class="ticket-img" :src="ticket.event.coverImg" />
      <div class="row">
        <div class="d-flex col-12 justify-content-between">
          <h5 class="m-2 px-2 text-color">{{ ticket.event.name }}</h5>
          <div
            title="delete ticket to {{ticket.event.name}}"
            class="mx-1 text-end selectable mdi mdi-close-circle-outline"
            @click.prevent="deleteTicket"
          ></div>
        </div>
        <div class="col-12">
          <p class="m-2 px-2 pe-5">
            {{ ticket.event.description }}
          </p>
        </div>
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
  background-color: #084560;
  border-right: 20px dashed rgba(0, 0, 0, 0.456);
  width: 100%;
}
.ticket:hover {
  background-color: #052533;
}
.ticket-img {
  width: 25%;
  height: 100%;
  object-fit: cover;
}
.text-color {
  color: #a4c9d9dd;
}
</style>