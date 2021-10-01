import { backendUrl } from "./clientConfig"

export const getData = async (url) => {
  const response = await fetch(backendUrl + url, {
    credentials: 'include',
    mode: 'cors'
  })
  return response.ok ? response.json() : Promise.reject(response)
}
export const postData = async (url, data) => {
  const response = await fetch(backendUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const patchData = async (url, data) => {
  const response = await fetch(backendUrl + url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

