import Client from './Api'

export const SaveSketch = async (data) => {
  try {
    console.log(data)
    const res = await Client.post(`/sketches/upload/${data.user_Id}`, data)

    return res.data
  } catch (error) {
    throw error
  }
}
