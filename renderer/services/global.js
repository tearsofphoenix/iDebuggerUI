import axios from 'axios'

export async function connectApp({ip, port}) {
  const host = `http://${ip}:${port}`
  console.log(5, host)
  return axios.get(`${host}/connect`)
}
