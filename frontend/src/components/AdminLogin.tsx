import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface LoginResponse {
  data: {
    token: string
  }
}

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cookies, setCookie] = useCookies(['adminToken'])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          username,
          password,
        }
      )

      const { token } = response.data.data
      setCookie('adminToken', token, { path: '/' })
      toast.success('Login successful!')
    } catch (error: any) {
      toast.error('Login failed. Please try again.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
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
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
