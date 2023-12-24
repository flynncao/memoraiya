export const useToastStore = defineStore('toast', {
  // state
  state: () => (
    {
      message: '',
      type: '',
      duration: 1500,
      active: false,
    }),

  // getters
  getters: {},
  // actions
  actions: {
    show({ message, type, duration = 1500 }) {
      this.$state.message = message
      this.$state.type = type
      this.$state.duration = duration
      this.$state.active = true
      setTimeout(() => {
        this.$state.active = false
      }, duration)
    },
    hide() {
      this.$state.active = false
    },
  },

})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot))
