import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Vocab } from '~/types/vocab'

interface CambridgeResponse extends AxiosResponse<Vocab> { }
export function getCambridgeExplanation(word: string): Promise<CambridgeResponse> {
  const toastStore = useToastStore()
  try {
    const res = axios.get<Vocab>(`http://localhost:7001/cambridge?q=${word}`)
    console.log('frontend res :>> ', res)
    toastStore.show({
      message: 'Success',
      type: 'success',
      duration: 1500,
    })
    return res
  }
  catch (err) {
    // TODO: This may not be the best way to handle the error
    /* eslint no-console: "off" */
    console.log('error:', err)
    toastStore.show({
      message: err,
      type: 'success',
      duration: 1500,
    })
    throw err // Re-throw the error after logging or handling if needed
  }
}
