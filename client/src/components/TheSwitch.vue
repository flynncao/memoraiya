<script setup lang="ts">
const { isDark, ipadMode } = $defineProps<{
  isDark: boolean
  ipadMode: boolean
}>()
const localIsDark = ref<boolean>(false)
const throttledToggleDark = useThrottleFn((target: boolean) => {
  if (target !== isDark) {
    toggleDark()
    setTimeout(() => {
      localIsDark.value = target
    })
  }
}, 1500)

function handleToggleDark(target: boolean) {
  throttledToggleDark(target)
}
function handleSwitch() {
  handleToggleDark(!isDark)
}
</script>

<template>
  <div v-if="!ipadMode" class="dark-mode-switcher flex">
    <div
      class="item item-light grid cursor-pointer place-content-center"
      @click="handleToggleDark(false)"
    >
      <el-icon @click="handleToggleDark(false)">
        <Sunny />
      </el-icon>
    </div>
    <div
      class="item item-dark grid cursor-pointer place-content-center"
      @click="handleToggleDark(true)"
    >
      <el-icon>
        <Moon />
      </el-icon>
    </div>
  </div>
  <div
    v-else
    class="dark-mode-switcher flex cursor-pointer"
    @click="handleSwitch"
  >
    <el-icon class="text-xl">
      <Sunny v-show="!localIsDark" />
      <Moon v-show="localIsDark" />
    </el-icon>
  </div>
</template>
