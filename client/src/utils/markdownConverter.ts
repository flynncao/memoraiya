import TurndownService from 'turndown'
import type { Vocab } from '~/types/vocab'
import { vocabHTML } from '~/utils/db'

export function ConstructHTML(vocab: Vocab): string {
  let html = `<div><h1>${vocab.title}</h1><p>${vocab.pos} ${vocab.dpos}</p><p>UK:${vocab.uk_pron} | US:${vocab.us_pron}</p><h2>Definitions</h2></div>`
  vocab.definitions.forEach((definition) => {
    html += `<p><strong>${definition.description}</strong></p>`
    definition.examples.forEach((example) => {
      html += `<p>${example}</p>`
    })
  })
  html += '<h2>Examples</h2>'
  vocab.dataset_examples.forEach((example) => {
    html += `<p>${example}</p>`
  })

  html += '</div>'

  vocabHTML.value = html

  return html
}

export function ConvertHTMLToMarkdown(html: string): string {
  const turndown = new TurndownService()
  turndown.options = {
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
    br: '\n',
    hr: '---',
    keepReplacement: (content: string, node: any) => {
      return node.isBlock
    },
  }
  return turndown.turndown(html)
}
