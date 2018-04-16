import axios from 'axios'
import kHost from './constants'

export async function fetch() {
  return axios.get(`${kHost}/snapshot`)
}
