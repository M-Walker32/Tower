<template>
  <form @submit.prevent="createEvent">
    <div class="mb-3">
      <label for="event-name" class="form-label">Event Name:</label>
      <input
        type="text"
        class="form-control"
        v-model="editable.name"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-description" class="form-label"
        >Event Description:</label
      >
      <input
        type="text"
        class="form-control"
        v-model="editable.description"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-img" class="form-label">Event Image URL:</label>
      <input
        type="text"
        class="form-control"
        max="200"
        v-model="editable.coverImg"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-location" class="form-label">Event Location:</label>
      <input
        type="text"
        class="form-control"
        v-model="editable.location"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-capacity" class="form-label">Event Capacity:</label>
      <input
        type="number"
        class="form-control"
        v-model="editable.capacity"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-startDate" class="form-label">Event Date:</label>
      <input
        type="date"
        class="form-control"
        v-model="editable.startDate"
        required
      />
    </div>
    <div class="mb-3">
      <label for="event-type" class="form-label">Event Type:</label>
      <select
        class="form-select my-button"
        aria-label="select event type"
        v-model="editable.type"
        required
      >
        <option selected disabled>Type</option>
        <option value="concert">concert</option>
        <option value="convention">convention</option>
        <option value="sport">sport</option>
        <option value="digital">digital</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { towersService } from "../services/TowersService.js"
import Pop from "../utils/Pop.js"
import { logger } from "../utils/Logger.js"
import { router } from "../router.js"
import { useRouter } from "vue-router"
import { Modal } from "bootstrap"
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createEvent() {
        try {
          const newEvent = await towersService.createEvent(editable.value)
          editable.value = ''
          Modal.getOrCreateInstance(document.getElementById('create-event-modal')).toggle()
          router.push({ name: 'EventPage', params: { id: newEvent.id } })
        } catch (error) {
          editable.value = ''
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>