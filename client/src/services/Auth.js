import Client from './Api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login/user', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register/user', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}