import { useState } from 'react'
import { useAddNewsletter } from '../hooks/newsletterHooks'
const Newsletter = () => {
  const [email, setEmail] = useState('')
  const addNewsletter = useAddNewsletter()
  const handleSubmit = () => {
    if (email) {
      addNewsletter.mutate(email, {
        onSuccess: () => {
          setEmail('')
        },
      })
    }
  }
  return (
    <div className="w-full flex bg-[#217BF4] px-2 sm:px-16 xl:px-36 h-20 items-center overflow-hidden justify-between">
      <div className=" hidden sm:flex gap-4 flex-grow">
        <div>Home</div>
        <div>Services</div>
        <div>Project</div>
        <div>Testimonials</div>
        <div>Contact</div>
      </div>
      <div className="flex gap-3  items-center justify-center ">
        <div className="w-28 text-sm sm:text-base">Suscribe Us</div>
        <div className="w-full">
          <input
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value)
            }}
            className="p-2 border  placeholder:text-white border-white outline-none rounded-l-lg bg-[#217BF4]"
            placeholder="Enter Email Address"
          />
          <button
            onClick={handleSubmit}
            className="bg-white p-2 border border-white rounded-r-lg text-blue-400"
          >
            Suscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
