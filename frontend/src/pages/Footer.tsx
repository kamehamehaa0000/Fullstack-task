import Newsletter from '../components/Newsletter'
import footerimg from '../assets/Footer/Rectangle.svg'
import logo from '../assets/Footer/logo.svg'
import fb from '../assets/Footer/Frame.svg'
import twt from '../assets/Footer/Group-1.svg'
import insta from '../assets/Footer/Group.svg'
import lnkin from '../assets/Footer/Linkedin.svg'
const Footer = () => {
  return (
    <div className="w-full text-white bg-red-300">
      <div
        style={{ backgroundImage: `url(${footerimg})` }}
        className="h-[460px] relative flex sm:flex-row flex-col justify-between items-center bg-cover  bg-no-repeat "
      >
        <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center gap-1 bg-[rgba(0,0,0,0.5)]">
          <h1 className=" p-2 text-3xl font-semibold">
            Learn more about our listing process, as well as our
          </h1>{' '}
          <h1 className="  p-2  text-3xl font-semibold">
            additional staging and design work.
          </h1>
          <button className=" my-4 rounded px-16 py-2 bg-white text-blue-500 font-semibold">
            LEARN MORE
          </button>
        </div>
      </div>
      <Newsletter />
      <div className="px-8 py-6 flex items-center justify-between bg-[#21202E] overflow-hidden">
        <h1 className="hidden sm:block">All Rights Reserved 2023</h1>
        <img src={logo} alt="logo" />
        <div className="flex items-center flex-wrap gap-2 justify-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src={twt} alt="Twitter" />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src={insta} alt="Instagram" />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src={fb} alt="Facebook" />
          </div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src={lnkin} alt="Linkedin" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
