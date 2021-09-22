const backendUrl = 'https://shop-training-project-backend.herokuapp.com/'

export const getData = async (url) => {
  const response = await fetch(backendUrl + url)
  return response.ok ? response.json() : Promise.reject(response)
}
export const postData = async (url, data) => {
  const response = await fetch(backendUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
    body: JSON.stringify(data)
  })
  return response.ok ? response.json() : Promise.reject(response)
}

