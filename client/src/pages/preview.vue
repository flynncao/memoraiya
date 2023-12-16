<script lang="ts" setup>
import { vocabHTML, vocabMD } from '~/utils/db'

// TODO: use explicit page structure instead of using v-html

async function copy() {
  // const source = vocabMD.value
  const source = vocabMD.value
  const { copy, copied, isSupported } = useClipboard({ source })
  if (isSupported.value) {
    await copy(source.value)
    if (copied.value)
    /* eslint no-alert: "off" */
      alert('Copied to clipboard!')
  }
}
</script>

<template>
  <div>
    <button class="bg-accent-sky-500 btn" @click="copy">
      Copy Markdown SourceCode to Clipboard
    </button>
    <div class="markdown-body" v-html="vocabHTML" />
  </div>
</template>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  margin: 0 auto;
  padding: 45px;
  text-align: left;
}

h1 {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.markdown-body h2 {
  font-size: 1.5rem;
  line-height: 2rem;
}

.markdown-body h3 {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.markdown-body p {
  width: 100%;
  font-size: 1rem;
  line-height: 1.5rem;
}
</style>
