import React, { useState } from 'react'
import {
  useClients,
  useAddClient,
  useUpdateClient,
  useDeleteClient,
} from '../hooks/clientHooks'
import Loader from './Loader'

const AdminClients: React.FC = () => {
  const { data: clients, isLoading: loading } = useClients()
  const addClientMutation = useAddClient()
  const updateClientMutation = useUpdateClient()
  const deleteClientMutation = useDeleteClient()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [designation, setDesignation] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('designation', designation)
    if (image) {
      formData.append('image', image)
    }

    addClientMutation.mutate(formData, {
      onSuccess: () => {
        setName('')
        setDescription('')
        setDesignation('')
        setImage(null)
      },
    })
  }

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedClientId) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('designation', designation)
      if (image) {
        formData.append('image', image)
      }

      updateClientMutation.mutate({
        clientId: selectedClientId,
        updatedClient: formData,
      })
    }
    setSelectedClientId(null)
  }

  const handleDeleteClient = (clientId: string) => {
    deleteClientMutation.mutate(clientId)
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Clients</h1>

      <div className="flex flex-col sm:flex-row">
        <form
          onSubmit={handleAddClient}
          className="w-full max-w-md text-base bg-white p-6 rounded shadow-md mb-6"
        >
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-1 mb-1 border rounded"
            required
          />
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-1 mb-1 border rounded"
            required
          />
          <label className="block text-gray-700">Designation</label>
          <input
            type="text"
            name="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full px-3 py-1 mb-1 border rounded"
            required
          />
          <label className="block text-gray-700">Client Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-3 py-1 file:px-1  mb-1  border rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Client
          </button>
        </form>

        {selectedClientId && (
          <form
            onSubmit={handleUpdateClient}
            className="w-full max-w-md bg-white p-6 rounded shadow-md mb-6"
          >
            <label className="block text-gray-700">Client Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-1 mb-1 border rounded"
              required
            />
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full px-3 py-1 mb-1 border rounded"
              required
            />
            <label className="block text-gray-700">Client Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex items-center  gap-2 text-sm">
              <button
                type="submit"
                className="w-fit px-3 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                type="button"
                className="w-fit px-3 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                onClick={() => setSelectedClientId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4">Client List</h2>
        <ul className="w-full flex flex-wrap overflow-hidden">
          {loading ? (
            <Loader />
          ) : (
            clients?.data?.map((client: any) => (
              <li
                key={client._id}
                className="flex justify-between  w-full  max-w-xs items-center mb-1 p-1 bg-gray-100 rounded"
              >
                <div className="relative mt-16 w-full min-h-40 max-h-60 h-full bg-white shadow-lg  rounded-lg flex flex-col  px-4 pt-16 pb-4">
                  <img
                    src={client.imageUrl}
                    alt={client.name}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full mb-4 hover:scale-110 transition-all duration-400 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-gray-500 text-sm mb-2">
                      {client.description}
                    </p>
                    <h3 className="text-lg font-bold text-blue-500">
                      {client.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {client.designation}
                    </p>
                  </div>{' '}
                  <div className="text-sm">
                    <button
                      onClick={() => setSelectedClientId(client._id)}
                      className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default AdminClients
