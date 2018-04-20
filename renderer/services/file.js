import axios from 'axios'

export async function fetch({host}) {
  return axios.get(`${host}/file/list`)
}
