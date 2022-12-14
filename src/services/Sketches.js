import Client from './api'

export const UploadSketch = async (user_id, data) => {
  try {
    const res = await Client.post(`/sketches/upload/${user_id}`, data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const SendSketch = async (user_id, sketch_id, data) => {
  try {
    const res = await Client.put(`/sketches/send/${user_id}/${sketch_id}`, data)

    return res.data
  } catch (error) {
    throw error
  }
}

export const SaveSketch = async (user_id, sketch_id, data) => {
  try {
    const res = await Client.put(`/sketches/save/${user_id}/${sketch_id}`, data)

    return res.data
  } catch (error) {
    throw error
  }
}
export const GetSketches = async (user_id) => {
  try {
    const res = await Client.get(`/sketches/${user_id}`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const GetSketchById = async (sketch_id) => {
  try {
    const res = await Client.get(`/sketches/get/${sketch_id}`)

    return res.data
  } catch (error) {
    throw error
  }
}
