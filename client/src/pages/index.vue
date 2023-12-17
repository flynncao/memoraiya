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
  { id: 4, name: 'More on Youtube', link: 'https://www.youtube.com/results?search_query=', checked: false, secondArgument: true },
])
function finalUrl(keyword: string, url: string, secondArgument: boolean): string {
  return url + keyword + (secondArgument ? '+meaning' : '')
}
async function go() {
  if (name.value.trim() !== '') {
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
    else {
      const { data } = await getCambridgeExplanation(name.value)
      ConstructHTML(data)
      window.open(
        'http://localhost:3333/preview',
        '_blank',
      )
    }
  }
}
function toggle(index: number) {
  portals[index].checked = !portals[index].checked
}
</script>

<template>
  <div>
    <div i-carbon-assembly inline-block text-4xl />
    <p>
      <a rel="noreferrer" href="#" target="_blank" style="font-family:Times New Roman">
        MEMORAIYA
      </a>
    </p>

    <div py-4 />

    <TheInput v-model="name" placeholder="Word spell?" autocomplete="false" @keydown.enter="go" />
    <div class="p-4">
      <div v-for="(item, index) in portals" :key="index" class="mb-2">
        <input type="checkbox" :name="item.name" class="mr-1" :checked="item.checked" @change="toggle(index)">
        <label :for="item.name">{{ item.name }}</label>
      </div>
      <div class="w-full flex flex-col items-center">
        <div class="overflow-hidden">
          <label for="scaperModeSwitcher" class="mr-2">Scaper the Whole Page Instead?</label>
          <input id="scaperModeSwitcher" v-model="scraperMode" type="checkbox">
        </div>
        <button class="m-3 text-sm btn" :disabled="!name" @click="go">
          Explore!
        </button>
      </div>
    </div>
  </div>
</template>
