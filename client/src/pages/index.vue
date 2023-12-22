<script setup lang="ts" generic="T extends any, O extends any">
import { getCambridgeExplanation } from '~/utils/scraper.js'
import type { Portal } from '~/types/portal'
import { ConstructHTML } from '~/utils/markdownConverter.js'

defineOptions({
  name: 'IndexPage',
})
const name = ref('')
const scraperMode = ref(false)

const portals = reactive<Portal[]>([
  { id: 1, name: 'Cambridge Dictionary', link: 'https://dictionary.cambridge.org/dictionary/english/', checked: true, secondArgument: false },
  { id: 2, name: 'Webster Dictionary', link: 'https://www.merriam-webster.com/dictionary/', checked: false, secondArgument: false },
  { id: 3, name: 'Etymology Dictionary', link: 'https://www.etymonline.com/search?q=', checked: false, secondArgument: false },
  { id: 4, name: 'Youtube', link: 'https://www.youtube.com/results?search_query=', checked: false, secondArgument: true },
])
function finalUrl(keyword: string, url: string, secondArgument: boolean): string {
  return url + keyword + (secondArgument ? '+meaning' : '')
}

function visit() {
  if (name.value.trim() === '')
    return

  if (scraperMode.value === false) {
    portals.forEach((item: Portal) => {
      if (item.checked) {
        const finalLink = finalUrl(name.value, item.link, item.secondArgument)
        window.open(
          finalLink,
          '_blank',
        )
      }
    })
  }
}
async function scrape() {
  if (name.value.trim() === '')
    return

  const { data } = await getCambridgeExplanation(name.value)
  ConstructHTML(data)
  window.open(
    'http://localhost:3333/preview',
    '_blank',
  )
}

function toggle(index: number) {
  portals[index].checked = !portals[index].checked
}
</script>

<template>
  <div class="index-page h-full w-full">
    <div class="index-page-container relative left-0 top-1/2 p-4 -translate-y-3/4">
      <div class="w-full flex flex-col items-center justify-center gap-4 p-0">
        <p class="w-60 flex flex-col items-center">
          <img src="dictionary.png" alt="" class="h-20 w-20">
          <strong>MEMORAIYA</strong>
        </p>
        <div class="w-60">
          <input v-model="name" type="text" class="input input-bordered" placeholder="Which word do you like?" @keydown.enter="go">
        </div>

        <!-- List -->
        <div class="w-60 flex flex-wrap gap-2">
          <div v-for="(item, index) in portals" :key="index" class="flex items-center gap-1">
            <input type="checkbox" :name="item.name" class="checkbox checkbox-accent mr-1" :checked="item.checked" @change="toggle(index)">
            <label :for="item.name" class="label-text">{{ item.name }}</label>
          </div>
        </div>
        <!-- Controls -->
        <div class="mt-2 w-60 flex flex-wrap gap-2">
          <div>
            <button class="btn-primary btn" :disabled="!name" @click="visit">
              Explore Yourself
            </button>
          </div>
          <div>
            <button class="btn-secondary grid-span-3 btn" :disabled="!name" @click="scrape">
              Scrape Definitions Instead
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
