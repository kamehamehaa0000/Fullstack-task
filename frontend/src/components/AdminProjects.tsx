import React, { useState } from 'react'
import {
  useProjects,
  useAddProject,
  useUpdateProject,
  useDeleteProject,
} from '../hooks/projectHooks'

interface ProjectData {
  _id: string
  name: string
  description: string
  imageUrl: string
}

const AdminProjects: React.FC = () => {
  const { data: projects } = useProjects()
  const addProjectMutation = useAddProject()
  const updateProjectMutation = useUpdateProject()
  const deleteProjectMutation = useDeleteProject()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  )

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (image) {
      formData.append('image', image)
    }
    try {
      await addProjectMutation.mutateAsync(formData)
      setName('')
      setDescription('')
      setImage(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedProjectId) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      if (image) {
        formData.append('image', image)
      }

      try {
        await updateProjectMutation.mutateAsync({
          projectId: selectedProjectId,
          updatedProject: formData,
        })
        setName('')
        setDescription('')
        setImage(null)
        setSelectedProjectId(null)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProjectMutation.mutateAsync(projectId)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Projects</h1>
      <div className="flex flex-col sm:flex-row">
        <form
          onSubmit={handleAddProject}
          className="w-full max-w-md text-base bg-white p-6 rounded shadow-md mb-6"
        >
          <label className="block text-gray-700">Project Name</label>
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
          <label className="block text-gray-700">Project Image</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-3 py-1 file:px-1 mb-1 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Project
          </button>
        </form>

        {selectedProjectId && (
          <form
            onSubmit={handleUpdateProject}
            className="w-full max-w-md bg-white p-6 rounded shadow-md mb-6"
          >
            <label className="block text-gray-700">Project Name</label>
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
              className="w-full px-3 py-2 border rounded"
            />
            <label className="block text-gray-700">Project Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded"
            />
            <div className="flex items-center gap-2 text-sm">
              <button
                type="submit"
                className="w-fit px-3 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
              >
                Update Project
              </button>
              <button
                type="button"
                className="w-fit px-3 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                onClick={() => setSelectedProjectId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Project List</h2>
        <ul className="w-screen flex flex-wrap">
          {projects?.data?.map((project: ProjectData) => (
            <li
              key={project._id}
              className="flexjustify-between  items-center mb-4 p-4 rounded"
            >
              <div className="relative min-w-xs max-h-72 h-full  w-full max-w-xs bg-white shadow-lg rounded-lg flex flex-col">
                <div className="h-32 rounded overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className=" w-full h-32 mb-4 hover:scale-110 transition-all duration-500 object-cover"
                  />
                </div>
                <div className="text-left px-2 py-2">
                  <p className="text-gray-500 h-10 overflow-hidden text-sm mb-2">
                    {project.description}
                  </p>
                  <h3 className="text-lg font-bold text-blue-500">
                    {project.name}
                  </h3>
                </div>
                <div className="text-sm flex justify-end px-4 my-2">
                  <button
                    onClick={() => {
                      setName(project.name)
                      setDescription(project.description)
                      setImage(null)
                      setSelectedProjectId(project._id)
                    }}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminProjects
