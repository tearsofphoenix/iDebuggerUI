import axios from 'axios'
import kHost from './constants'

export async function fetchSystemInfo() {
  return axios.get(`${kHost}/system/info`)
}
