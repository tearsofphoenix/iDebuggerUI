import axios from 'axios'

export async function fetch({host}) {
  return axios.get(`${host}/file/list`)
}

export async function deleteFileRequest({host, payload}) {
  return axios.post(`${host}/file/remove`, payload)
}

export async function renameFileRequest({host, payload}) {
  return axios.post(`${host}/file/rename`, payload)
}
