<template>
  <div class="mt-3" v-if="totalPages > 1">
    <div class="d-flex text-right justify-content-end">
      <h5
        class="text-dark"
        :class="{
          selectable: currentPage > 1,
          'lighten-10': currentPage == 1,
        }"
        @click="changePage(-1)"
      >
        back
      </h5>
      <div class="h5 px-2">
        {{ currentPage }}
      </div>
      <h5
        class="text-dark"
        :class="{
          selectable: currentPage != totalPages,
          'lighten-10': currentPage == totalPages,
        }"
        @click="changePage(1)"
      >
        next
      </h5>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { towersService } from "../services/TowersService.js";
export default {
  setup() {
    return {
      currentPage: computed(() => AppState.currentPage),
      totalPages: computed(() => AppState.totalPages),
      async changePage(value) {
        let newPage = AppState.currentPage + value;
        if (newPage > AppState.totalPages || newPage <= 0) {
          Pop.toast("You're' there", "warning");
          return;
        }
        towersService.changePage(newPage);
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>