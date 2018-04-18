import axios from 'axios'
import kHost from './constants'

export async function fetch() {
  return axios.get(`${kHost}/view/snapshot`)
}

export async function update(data) {
  return axios.post(`${kHost}/view/update`, data)
}
