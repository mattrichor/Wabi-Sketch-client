import Client from './Api'

export const GetUserAndFriends = async (userId) => {
  try {
    const res = await Client.get(`/users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetAllUsers = async () => {
  try {
    const res = await Client.get(`/friends/users`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const SendFriendRequest = async (userId, friendId) => {
  try {
    const res = await Client.post(`/friends/request/${userId}/${friendId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
