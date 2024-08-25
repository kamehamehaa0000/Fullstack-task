import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_BACKEND_URL

interface ProjectData {
  _id: string
  name: string
  description: string
  imageUrl: string
}

interface ProjectsResponse {
  data: ProjectData[]
}

export const useProjects = () => {
  return useQuery<ProjectsResponse>('projects', async () => {
    const { data } = await axios.get<ProjectsResponse>(
      `${BASE_URL}/projects/getall`
    )
    return data
  })
}

export const useAddProject = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (newProject: FormData) => {
      const { data } = await axios.post(
        `${BASE_URL}/projects/add`,
        newProject,
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
        queryClient.invalidateQueries('projects')
        toast.success('Project added successfully!')
      },
      onError: () => {
        toast.error('Failed to add project.')
      },
    }
  )
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async ({
      projectId,
      updatedProject,
    }: {
      projectId: string
      updatedProject: FormData
    }) => {
      const { data } = await axios.put(
        `${BASE_URL}/projects/update/${projectId}`,
        updatedProject,
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
        queryClient.invalidateQueries('projects')
        toast.success('Project updated successfully!')
      },
      onError: () => {
        toast.error('Failed to update project.')
      },
    }
  )
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()
  const [cookies] = useCookies(['adminToken'])

  return useMutation(
    async (projectId: string) => {
      await axios.delete(`${BASE_URL}/projects/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${cookies.adminToken}`,
        },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects')
        toast.success('Project deleted successfully!')
      },
      onError: () => {
        toast.error('Failed to delete project.')
      },
    }
  )
}
