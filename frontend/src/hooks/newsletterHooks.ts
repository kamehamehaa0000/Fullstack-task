import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

interface NewsletterData {
  _id: string
  email: string
}

interface NewslettersResponse {
  data: NewsletterData[]
}

export const useNewsletters = () => {
  const [cookies] = useCookies(['adminToken'])

  return useQuery<NewslettersResponse>(
    'newsletters',
    async () => {
      const { data } = await axios.get<NewslettersResponse>(
        `${BASE_URL}/newsletters/getall`,
        {
          headers: {
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        }
      )
      return data
    },
    {
      onError: () => {
        toast.error('Failed to fetch newsletters.')
      },
    }
  )
}

export const useAddNewsletter = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (email: string) => {
      const { data } = await axios.post(
        `${BASE_URL}/newsletters/add`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        }
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('newsletters')
        toast.success('Email added to newsletter successfully!')
      },
      onError: () => {
        toast.error('Failed to add email to newsletter.')
      },
    }
  )
}

export const useRemoveNewsletter = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (email: string) => {
      await axios.delete(`${BASE_URL}/newsletters/remove/${email}`, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('newsletters')
        toast.success('Email removed from newsletter successfully!')
      },
      onError: () => {
        toast.error('Failed to remove email from newsletter.')
      },
    }
  )
}
