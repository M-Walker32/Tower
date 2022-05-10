<template>
  <div class="container">
    <div class="row-fluid">
      <div class="col-12">
        <h2 class="h-font my-2">My Upcoming Events</h2>
        <!-- Tickets go here -->
        <div class="col-md-10 my-5 col-12">
          <Ticket v-for="t in myTickets" :key="t.id" :ticket="t" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { logger } from "../utils/Logger.js"
import { ticketsService } from "../services/TicketsService.js"
import Pop from "../utils/Pop.js"
export default {
  setup() {
    watchEffect(async () => {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  }
}
</script>

<style scoped>
</style>
