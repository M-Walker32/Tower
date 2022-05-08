import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  activeEvent: {},
  currentPage: 1,
  totalPages: 0,
  towers: [],
  comments: [],
  tickets: [],
})
