<template>
  <nav class="navbar-expand-lg">
    <div class="container-fluid">
      <div class="row">
        <div
          class="bg-primary shadow d-flex justify-content-between px-3 col-12"
        >
          <h1 class="mdi mdi-rocket h-20 logo">Events</h1>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              class="text-light mdi mdi-arrow-expand-down"
              title="open navigator"
            />
          </button>
          <!-- LOGIN COMPONENT HERE -->
          <Login />
        </div>
      </div>
      <div class="row bg-primary darken-10">
        <div class="col-12">
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto">
              <li class="d-flex">
                <router-link
                  :to="{ name: 'Home' }"
                  class="btn h-font text-success selectable text-uppercase"
                  title="Navigate Home"
                >
                  Home
                </router-link>
                <router-link
                  :to="{ name: 'Account' }"
                  class="btn h-font text-success selectable text-uppercase"
                  title="Navigate to Account"
                >
                  Account
                </router-link>
                <h2
                  title="Create New Event"
                  class="btn h-font text-success selectable text-uppercase"
                  data-bs-toggle="modal"
                  :data-bs-target="'#create-event-modal'"
                >
                  +
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <Modal id="create-event-modal">
    <template #modal-title-slot>
      <h4>Create an Event</h4>
    </template>
    <template #modal-body-slot>
      <EventForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.logo {
  text-transform: uppercase;
  font-family: "Permanent Marker", Impact, Haettenschweiler, "Arial Narrow Bold",
    sans-serif;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
