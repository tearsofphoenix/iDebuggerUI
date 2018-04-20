import axios from 'axios'

export async function fetchSystemInfo({host}) {
  return axios.get(`${host}/system/info`)
}
