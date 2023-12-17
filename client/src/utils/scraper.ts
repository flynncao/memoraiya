import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Vocab } from '~/types/vocab'

interface CambridgeResponse extends AxiosResponse<Vocab> { }

export function getCambridgeExplanation(word: string): Promise<CambridgeResponse> {
  try {
    const res = axios.get<Vocab>(`http://localhost:7001/cambridge?q=${word}`)
    return res
  }
  catch (err) {
    /* eslint no-console: "off" */
    console.log('error:', err)
    throw err // Re-throw the error after logging or handling if needed
  }
}
