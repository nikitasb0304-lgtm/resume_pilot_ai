import { useMutation } from '@tanstack/react-query'
import API from '../api/axios'

export const useATS = () => {
  const analyzeResume = useMutation({
    mutationFn: async (payload) => {
      const { data } = await API.post('/ats/score', payload)
      return data
    },
  })
  
  return { analyzeResume }
}
