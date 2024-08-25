import rArrowimg from '../assets/page3/rbgarrow.svg'
import lbigcircle from '../assets/page3/rightbgCircle.svg'
import lmidcircle from '../assets/page3/leftmdCircle.svg'
import rbgArrow from '../assets/page3/rbgarrow.svg'
import smcircle from '../assets/page3/smcircle.svg'
import rbigcircle from '../assets/page3/leftbgCircle.svg'
import rmidcircle from '../assets/page3/rightmdCircle.svg'
import dots from '../assets/page3/dots.svg'
import rsmArrow from '../assets/page3/rarrow.svg'
import collection from '../assets/page3/collection1.svg'

const Page3 = () => {
  return (
    <>
      <div className="relative w-full h-[100vh] mt-28  ">
        <div className="w-full relative sm:w-[60%] mx-auto h-[70vh]">
          <img src={collection} alt="" />
        </div>
        {/* left bubbles */}
        <img
          src={lbigcircle}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        />
        <img
          src={lmidcircle}
          className="absolute left-20 top-1/3 -translate-y-1/3"
        />
        <img src={smcircle} className="absolute left-52 top-36" />
        <img src={rbgArrow} className=" absolute left-60 top-0 w-16 " />
        {/* Right bubbles */}
        <img
          src={rmidcircle}
          className="absolute right-10 bottom-[50%] -translate-y-[50%]"
        />
        <img
          src={rbigcircle}
          className="absolute right-0 bottom-1/4 -translate-y-1/4"
        />
        <img src={smcircle} className="absolute right-52 " />
        <img src={dots} className="absolute right-32 -top-10 " />
        <img src={rsmArrow} className="absolute right-10 -top-24 " />
        <AboutUs />
      </div>{' '}
    </>
  )
}

const AboutUs = () => {
  return (
    <>
      <div className="relative w-full my-4 justify-center flex flex-col items-center">
        <h1 className="text-3xl font-bold my-4 text-[#217BF4]">About us</h1>{' '}
        <svg
          width="188"
          height="12"
          viewBox="0 0 188 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="188" height="12" rx="6" fill="#217BF4" />
        </svg>
        <p className="my-10 text-center text-gray-600 max-w-2xl mb-8">
          Fifteen years of experience in real estate, excellent customer
          service, and a commitment to work hard, listen, and follow through. We
          provide quality service to build relationships with clients and, more
          importantly, maintain those relationships by communicating
          effectively.
        </p>
        <button className="px-20 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-400 hover:text-white active:bg-blue-400 active:text-white transition-all duration-300">
          LEARN MORE
        </button>
        <img src={rArrowimg} className="absolute right-32 h-32 " />
        <img src={rArrowimg} className="absolute left-32 top-56 h-32 " />
      </div>
    </>
  )
}
export default Page3
