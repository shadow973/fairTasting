import SecureStore from '@fair/components/common/SecureStore';
import FTENV from '@fair/ftenv'

export async function useApi(endpoint: string, params = {}) {
  let token = await SecureStore.get(FTENV().envName + '-token');
  let options = params
  if (token) {
    options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
  } else {
    options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  }
  try {
    const response = await fetch(`${FTENV().apiUrl}/${endpoint}`, options)
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error)
    return { error }
  }
}
export async function refreshToken(params = {}) {
  let options = params
  try {
    const response = await fetch(`${FTENV().apiUrl}/auth/refresh`, options)
    const data = await response.json();
    return data
  } catch (error) {
    return { error }
  }
}
