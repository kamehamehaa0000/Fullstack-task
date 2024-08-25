import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import img1 from '../assets/page3/img3.svg'
import { useProjects } from '../hooks/projectHooks'

const Projects = () => {
  const { data: projects } = useProjects()
  console.log(projects)
  return (
    <div id="projects" className="w-full mt-20 h-auto py-16 px-4 bg-blue-50">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Our Projects
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        We know what buyers are looking for and suggest projects that will bring
        clients top dollar for the sale of their homes.
      </p>
      <Swiper
        className="px-4 sm:px-20 overflow-x-hidden"
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
        {projects?.data?.map((project) => {
          return (
            <SwiperSlide>
              <ProjectCard
                image={project.imageUrl}
                title={project.name}
                description={project.description}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

interface ProjectCardProps {
  image?: string
  title?: string
  description?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image = img1,
  title = 'Project Title',
  description = 'Project Description',
}) => {
  return (
    <div className="bg-white  rounded-lg overflow-hidden shadow-lg flex flex-col items-center">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full  hover:scale-110 transition-all duration-700 object-center object-cover"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-blue-500">{title}</h3>
        <p className="h-10 text-gray-500 text-sm">{description}</p>
        <button className="mt-4 px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
          SEE MORE
        </button>
      </div>
    </div>
  )
}

export default Projects
