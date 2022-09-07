import Client from './Api'

export const SaveSketch = async (data) => {
  try {
    const res = await Client.post('/sketches', data)
    console.log(data)
    return res.data
  } catch (error) {
    throw error
  }
}
