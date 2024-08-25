import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import img1 from '../assets/page3/img3.svg'
import circle from '../assets/circle.svg'
import dots from '../assets/page3/dots.svg'
import rlgcircle from '../assets/page3/leftmdCircle.svg'
import { useClients } from '../hooks/clientHooks'
const Testimonials = () => {
  const { data: clients } = useClients()

  return (
    <div id="testimonials" className="relative w-full  h-auto p-8 sm:p-16">
      <h2 className="w-fit mx-auto text-3xl font-bold text-center text-blue-600 mb-4">
        Happy Clients
      </h2>
      <img
        src={circle}
        className="absolute -top-1/4 -left-28 -translate-y-1/4"
      />
      <img
        src={dots}
        className="rotate-90 absolute right-10 -top-1/4 translate-y-1/2"
      />
      <img
        src={rlgcircle}
        className="hidden sm:flex absolute right-24 -top-1/4 translate-y-[60%]"
      />
      <Swiper
        className="px-4 mt-10 sm:mt-16  sm:px-20 overflow-x-hidden"
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {clients?.data?.map((client) => {
          return (
            <SwiperSlide>
              <ClientCard
                image={client.imageUrl}
                name={client.name}
                description={client.description}
                designation={client.designation}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

interface ClientCardProps {
  image?: string
  name?: string
  description?: string
  designation?: string
}

const ClientCard: React.FC<ClientCardProps> = ({
  image = img1,
  name = 'Client name',
  description = 'Client Description',
  designation = 'CEO, Forecionsure',
}) => {
  return (
    <div className="relative my-16 h-full max-h-52 bg-white shadow-lg max-w-xs rounded-lg flex flex-col  px-8 py-16">
      <img
        src={image}
        alt={name}
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full mb-4 hover:scale-110 transition-all duration-700 object-cover"
      />
      <div className="text-left">
        <p className="text-gray-500 h-20 overflow-hidden text-sm mb-2">
          {description}
        </p>
        <h3 className="text-lg font-bold text-blue-500">{name}</h3>
        <p className="text-gray-500 text-sm">{designation}</p>
      </div>
    </div>
  )
}

export default Testimonials
