import axios from 'axios'

export async function list({host}) {
  return axios.get(`${host}/network/list`)
}
