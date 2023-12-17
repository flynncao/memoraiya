import { ConvertHTMLToMarkdown } from '~/utils/markdownConverter'

export const vocabHTML = useStorage('vocabHTML', '<p>No vocabulary queried.</p>')

export const vocabMD = computed(() => {
  return useStorage('vocabMD', ConvertHTMLToMarkdown(vocabHTML.value))
})
