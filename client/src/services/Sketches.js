import Client from './Api'

export const SaveSketch = async (user_id, data) => {
  try {
    console.log(user_id)
    console.log(data)
    const res = await Client.post(`/sketches/upload/${user_id}`, data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetSketches = async (user_id) => {
  try {
    console.log(user_id)
    const res = await Client.get(`/sketches/${user_id}`)

    return res.data
  } catch (error) {
    throw error
  }
}
