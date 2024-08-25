import logo from '../assets/Navbar/logo.svg'
const Navbar = () => {
  return (
    <div className="w-full overflow-x-hidden flex justify-center">
      <div className="flex w-[80vw] font-semibold  my-2  items-center justify-between h-16  p-2 py-4">
        <div className="flex w-[234px] items-center  justify-center">
          <img src={logo} alt="logo" className="m-2 " />
        </div>
        <div className="sm:flex  hidden sm:flex-row gap-5 items-center justify-center mr-5">
          <a href="#home" className="p-4 uppercase">
            Home
          </a>
          <a href="#services" className="p-4 uppercase">
            Services
          </a>
          <a href="#projects" className="p-4 uppercase">
            About Projects
          </a>
          <a href="#testimonials" className="p-4 uppercase">
            Testimonials
          </a>
          <button className="bg-[#F56C21] rounded uppercase px-8 text-white py-2">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
