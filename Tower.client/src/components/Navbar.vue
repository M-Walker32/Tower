<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <img
      src="https://i.pinimg.com/originals/e4/51/bd/e451bda0a314a5c3ac725e4ce14b15e4.jpg"
      height="40"
      class="rounded-circle"
    />
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li class="d-flex">
          <router-link
            :to="{ name: 'Home' }"
            class="btn text-success selectable text-uppercase"
          >
            Home
          </router-link>
          <router-link
            :to="{ name: 'Account' }"
            class="btn text-success selectable text-uppercase"
          >
            Account
          </router-link>
          <h2
            title="Create New Event"
            class="btn text-success selectable text-uppercase"
            data-bs-toggle="modal"
            :data-bs-target="'#create-event-modal'"
          >
            +
          </h2>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
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
export default {
  setup() {
    return {};
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
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
