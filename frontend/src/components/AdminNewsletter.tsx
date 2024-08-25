import React, { useState } from 'react'
import { useNewsletters, useRemoveNewsletter } from '../hooks/newsletterHooks' // Adjust the import path as needed

const AdminNewsletter: React.FC = () => {
  const { data, isLoading, isError } = useNewsletters()
  const removeNewsletterMutation = useRemoveNewsletter()
  const [emailToRemove, setEmailToRemove] = useState<string | null>(null)

  const handleRemoveEmail = (email: string) => {
    setEmailToRemove(email)
    removeNewsletterMutation.mutate(email, {
      onSuccess: () => {
        setEmailToRemove(null)
      },
      onError: () => {
        setEmailToRemove(null)
      },
    })
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading newsletters</div>

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Newsletter List :</h1>
      <ul>
        {data?.data.map((newsletter) => (
          <li
            className=" flex items-center flex-wrap justify-between max-w-xs gap-5"
            key={newsletter._id}
          >
            {newsletter.email}
            <button
              className="bg-red-500 rounded text-white px-2 text-sm"
              onClick={() => handleRemoveEmail(newsletter.email)}
              disabled={
                removeNewsletterMutation.isLoading &&
                emailToRemove === newsletter.email
              }
            >
              {removeNewsletterMutation.isLoading &&
              emailToRemove === newsletter.email
                ? 'Removing...'
                : 'Remove'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminNewsletter
