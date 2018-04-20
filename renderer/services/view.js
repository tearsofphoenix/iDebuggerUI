import axios from 'axios'

export async function fetch({host}) {
  return axios.get(`${host}/view/snapshot`)
}

export async function update({host, data}) {
  return axios.post(`${host}/view/update`, data)
}
