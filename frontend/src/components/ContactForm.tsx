import React, { useState } from 'react'
import { useAddContact } from '../hooks/contactHooks'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const addContact = useAddContact()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addContact.mutateAsync(formData)
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      city: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ backgroundColor: 'rgba(52, 64, 106, 0.8)' }}
      className="border text-white flex flex-col items-center p-4 w-[350px] rounded-md"
    >
      <h1 className="text-2xl font-semibold">Get a Free</h1>
      <h1 className="text-2xl font-semibold">Consultation</h1>
      <input
        style={{ backgroundColor: 'rgba(73, 87, 134, 0.6)' }}
        type="text"
        name="fullName"
        required
        value={formData.fullName}
        onChange={handleChange}
        className="w-full my-2 border rounded-lg outline-1 outline-gray-300 px-4 py-2"
        placeholder="Full Name"
      />
      <input
        style={{ backgroundColor: 'rgba(73, 87, 134, 0.6)' }}
        type="email"
        name="email"
        required
        value={formData.email}
        onChange={handleChange}
        className="w-full my-2 border rounded-lg outline-1 outline-gray-300 px-4 py-2"
        placeholder="Enter Email Address"
      />
      <input
        style={{ backgroundColor: 'rgba(73, 87, 134, 0.6)' }}
        type="tel"
        name="mobile"
        required
        value={formData.mobile}
        onChange={handleChange}
        className="w-full my-2 border rounded-lg outline-1 outline-gray-300 px-4 py-2"
        placeholder="Mobile Number"
      />
      <input
        style={{ backgroundColor: 'rgba(73, 87, 134, 0.6)' }}
        type="text"
        name="city"
        required
        value={formData.city}
        onChange={handleChange}
        className="w-full my-2 border rounded-lg outline-1 outline-gray-300 px-4 py-2"
        placeholder="Area, City"
      />
      <button
        type="submit"
        className="bg-[#F56C21] px-8 my-4 rounded text-white py-2"
      >
        Get Quick Quote
      </button>
    </form>
  )
}

export default ContactForm
