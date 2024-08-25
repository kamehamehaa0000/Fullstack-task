import filled from '../assets/page2/circleFilled.svg'
import smhollow from '../assets/page2/Ellipse 8.svg'
import dots from '../assets/page2/dots.svg'
import img1 from '../assets/page2/img1.svg'
import img2 from '../assets/page2/img2.svg'
import img3 from '../assets/page2/img3.svg'
import logo1 from '../assets/page2/home.svg'
import logo2 from '../assets/page2/paintbrush-2.svg'
import logo3 from '../assets/page2/circle-dollar-sign.svg'
import bghollow from '../assets/page2/new.svg'

const Page2 = () => {
  return (
    <>
      <div
        id="services"
        className="relative h-[80vh] w-full flex flex-col p-10 bg-white"
      >
        <div className="absolute top-20 left-24">
          <img src={filled} alt="Filled Circle" className="" />
        </div>
        <div className="absolute w-1/2  flex items-center justify-center top-1/2 transform -translate-x-1/2">
          <img src={smhollow} alt="Hollow Circle" className="" />
          <img
            src={dots}
            alt="Dots"
            className="absolute top-1/2 left-1/2 transform -translate-y-1/2"
          />
        </div>
        <div className="absolute top-0 right-0 overflow-hidden">
          <img src={bghollow} alt="Big Hollow Circle" className=" " />
        </div>
        <div className="absolute flex z-10 justify-end top-10 right-0 w-1/2 overflow-hidden ">
          <img src={img1} className=" top-0 right-0 w-1/3 " />
          <div>
            <img src={img2} className=" top-0 right-0 my-4" />
            <img src={img3} className=" top-0 right-0 w-3/4" />
          </div>
        </div>
        <div className=" w-1/2 h-[90%]  flex items-center justify-end ">
          <div className=" flex flex-col items-start justify-center text-left mb-16">
            <h1 className="text-3xl w-fit font-bold text-blue-500">
              Not Your Average Realtor
            </h1>
            <p className="text-gray-600 max-w-sm mt-4">
              Most realtors charge for selling property.We offer more than just
              selling services. We design,renovate, and transform your space to
              maximize its value.
            </p>
          </div>
        </div>
      </div>
      <WhyUsComponent />
    </>
  )
}

export default Page2

const WhyUsComponent = () => {
  return (
    <>
      <div className="w-full  justify-center flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4 text-[#217BF4]">
          Why Choose us?
        </h1>{' '}
        <svg
          width="188"
          height="12"
          viewBox="0 0 188 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="188" height="12" rx="6" fill="#217BF4" />
        </svg>
      </div>
      <div className="w-full my-5 flex  justify-center space-x-8 mt-10">
        <div className="flex flex-col items-center">
          <div className=" w-20 h-20 flex items-center justify-center mb-4 bg-[#F4F8FE] rounded-full">
            <img src={logo1} alt="Design" className=" w-12 h-12 " />
          </div>{' '}
          <h2 className="text-lg font-semibold text-blue-500">Potential ROI</h2>
          <p className="text-gray-600 text-center max-w-xs">
            Our strategies aim to maximize the return on your investment, making
            your home more valuable in the market.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className=" w-20 h-20 flex items-center justify-center mb-4 bg-[#F4F8FE] rounded-full">
            <img src={logo2} alt="Design" className=" w-12 h-12 " />
          </div>
          <h2 className="text-lg font-semibold text-blue-500">Design</h2>
          <p className="text-gray-600 text-center max-w-xs">
            We guide you through the design process to create spaces that are
            not only beautiful but also functional.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className=" w-20 h-20 flex items-center justify-center mb-4 bg-[#F4F8FE] rounded-full">
            <img src={logo3} alt="Design" className=" w-12 h-12 " />
          </div>{' '}
          <h2 className="text-lg font-semibold text-blue-500">Marketing</h2>
          <p className="text-gray-600 text-center max-w-xs">
            Our marketing strategies ensure your property gets the attention it
            deserves from the right buyers.
          </p>
        </div>
      </div>
    </>
  )
}
