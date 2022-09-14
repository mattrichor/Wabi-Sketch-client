import Client from './Api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    let user = JSON.stringify(res.data.user)
    localStorage.setItem('userObj', user)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token exists & is valid
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

//THIS IS A COMMENT
//PLS ALLOW ME TO PUSH
