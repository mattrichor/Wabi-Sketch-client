import Client from './Api'

export const GetUserAndFriends = async (userId) => {
  try {
    const res = await Client.get(`/users/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}
