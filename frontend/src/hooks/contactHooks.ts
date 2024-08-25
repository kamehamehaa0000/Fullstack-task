import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'

const BASE_URL = import.meta.env.VITE_BACKEND_URL
interface ContactData {
  _id: string
  fullName: string
  email: string
  mobile: string
  city: string
}

interface ContactsResponse {
  data: ContactData[]
}

export const useContacts = () => {
  const [cookies] = useCookies(['adminToken'])

  return useQuery<ContactsResponse>('contacts', async () => {
    try {
      const { data } = await axios.get<ContactsResponse>(
        `${BASE_URL}/contacts/getall`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        }
      )
      return data
    } catch (error) {
      toast.error(`Error fetching contacts: ${(error as Error).message}`)
      throw error
    }
  })
}

export const useAddContact = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (newContact: {
      fullName: string
      email: string
      mobile: string
      city: string
    }) => {
      const { data } = await axios.post(`${BASE_URL}/contacts/add`, newContact)
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('contacts')
        toast.success('Contact added successfully!')
      },
      onError: (error) => {
        toast.error(`Error adding contact: ${(error as Error).message}`)
      },
    }
  )
}
