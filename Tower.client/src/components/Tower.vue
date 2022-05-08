<template>
  <div class="col-3 mt-2">
    <div class="bg-light align-items-center shadow">
      <img :src="tower.coverImg" class="event-img pb-1" />
      <div class="p-2">
        <h5 class="text-secondary m-0 p-0">{{ tower.name }}</h5>
        <p class="text-primary m-0 p-0">
          remaining seats: {{ tower.capacity }}
        </p>
        <p class="m-0 p-0">
          {{ new Date(tower.startDate).toDateString() }}
          <br />
          {{ tower.location }}
        </p>
        <button class="my-button w-100 mt-4">Details</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    tower: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
</style>