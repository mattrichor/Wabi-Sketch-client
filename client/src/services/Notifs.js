import Client from './Api'

export const GetNotifs = async (userId) => {
  try {
    const res = await Client.get(`/notifs/get/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateNotif = async (user_id, sketch_id, username) => {
  try {
    const res = await Client.post(
      `/notifs/create/${user_id}/${sketch_id}`,
      username
    )

    return res.data
  } catch (error) {
    throw error
  }
}
