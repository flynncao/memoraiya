<script setup>
const store = useToastStore()
const reactiveStore = storeToRefs(store)
const bgColor = computed(() => {
  switch (reactiveStore.type) {
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    case 'warning':
      return 'bg-yellow-500'
    default:
      return 'bg-green-500'
  }
})
const classObj = computed(() => {
  return {
    'fixed top-2 left-1/2 -translate-x-1/2  p-4 rounded text-white transition-all': true,
    [bgColor.value]: true,
  }
})
</script>

<template>
  <div v-if="reactiveStore.active.value" :class="classObj">
    {{ reactiveStore.message }}
  </div>
</template>
