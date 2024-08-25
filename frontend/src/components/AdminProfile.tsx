import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

interface AdminResponse {
  data: {
    admin: {
      username: string
    }
  }
}

const AdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<{ username: string } | null>(null)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cookies] = useCookies(['adminToken'])

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get<AdminResponse>(
          `${import.meta.env.VITE_BACKEND_URL}/admin/current`,
          {
            headers: {
              Authorization: `Bearer ${cookies.adminToken}`,
            },
          }
        )
        setAdmin(response.data.data.admin)
        setUsername(response.data.data.admin.username)
      } catch (error: any) {
        toast.error('Failed to load admin profile.')
      }
    }

    fetchAdminProfile()
  }, [cookies.adminToken])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.put<AdminResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/admin/update`,
        { username, password },
        {
          headers: {
            Authorization: `Bearer ${cookies.adminToken}`,
          },
        }
      )

      setAdmin(response.data.data.admin)
      toast.success('Profile updated successfully!')
    } catch (error: any) {
      toast.error('Failed to update profile.')
    }
  }

  return (
    <div className=" mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Profile</h1>
      {admin && (
        <form
          onSubmit={handleUpdate}
          className="max-w-sm bg-white p-4 rounded shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Leave blank to keep current password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  )
}

export default AdminProfile
