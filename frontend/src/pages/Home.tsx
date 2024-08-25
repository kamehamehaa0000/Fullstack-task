import homebg from '../assets/Home/homebg.svg'
import ContactForm from '../components/ContactForm'

const Home = () => {
  return (
    <>
      <div
        id="home"
        style={{ backgroundImage: `url(${homebg})` }}
        className="z-99 min-h-[calc(100vh-80px)] flex sm:flex-row flex-col justify-between items-center bg-cover  bg-no-repeat "
      >
        <div className="px-24 my-auto sm:my-0 text-white font-bold text-6xl sm:text-8xl sm:w-1/2">
          <h1>Consultation,</h1>
          <h1>Design,</h1>
          <h1>& Marketing.</h1>
        </div>
        <div className="sm:w-1/2 mb-10 sm:mb-0 flex items-center justify-around">
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Home
