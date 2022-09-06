import Client from './Api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/login/', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('tokens', res.data)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/api/signup/', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token exists & is valid
    const res = await Client.get('/api/token/verify/')
    return res.data
  } catch (error) {
    throw error
  }
}
