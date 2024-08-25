import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

interface ClientData {
  _id: string
  name: string
  designation: string
  description: string
  imageUrl: string
}

interface ClientsResponse {
  data: ClientData[]
}

export const useClients = () => {
  return useQuery<ClientsResponse>('clients', async () => {
    const { data } = await axios.get<ClientsResponse>(
      `${BASE_URL}/clients/getall`
    )
    return data
  })
}

export const useAddClient = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (newClient: FormData) => {
      const { data } = await axios.post(`${BASE_URL}/clients/add`, newClient, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients')
        toast.success('Client added successfully!')
      },
      onError: () => {
        toast.error('Failed to add client.')
      },
    }
  )
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async ({
      clientId,
      updatedClient,
    }: {
      clientId: string
      updatedClient: FormData
    }) => {
      const { data } = await axios.put(
        `${BASE_URL}/clients/update/${clientId}`,
        updatedClient,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        }
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients')
        toast.success('Client updated successfully!')
      },
      onError: () => {
        toast.error('Failed to update client.')
      },
    }
  )
}

export const useDeleteClient = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (clientId: string) => {
      await axios.delete(`${BASE_URL}/clients/delete/${clientId}`, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('clients')
        toast.success('Client deleted successfully!')
      },
      onError: () => {
        toast.error('Failed to delete client.')
      },
    }
  )
}
