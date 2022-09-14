import Client from './api'
export const GetPromptByDate = async (date) => {
  try {
    const res = await Client.get(`/prompts/${date}`)

    return res.data
  } catch (error) {
    throw error
  }
}
