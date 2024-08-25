import React from 'react'
import { useContacts } from '../hooks/contactHooks'

const AdminContacts: React.FC = () => {
  const { data: contacts, isLoading, isError } = useContacts()

  if (isLoading) {
    return <div>Loading contacts...</div>
  }

  if (isError) {
    return <div>Failed to load contacts</div>
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6">Manage Contacts</h1>

      <h2 className="text-xl font-semibold mb-4">All Contacts</h2>
      <ul className="flex flex-wrap gap-5">
        {contacts?.data.map((contact: any) => (
          <li
            key={contact._id}
            className="mb-4 p-4 bg-white max-w-xs rounded shadow"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="mr-4">
                  <h3 className="text-lg font-semibold">{contact.fullName}</h3>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                  <p className="text-sm text-gray-600">{contact.mobile}</p>
                  <p className="text-sm text-gray-600">{contact.city}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default AdminContacts
