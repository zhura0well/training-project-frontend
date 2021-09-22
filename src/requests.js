export const getData = async (url) => {
  const response = await fetch(url)
  return response.ok ? response.json() : Promise.reject(response)
}
export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

export const patchData = async (url, data) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

