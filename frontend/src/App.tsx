import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Final from './pages/Final'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <div className="w-full scroll-smooth">
        <Routes>
          <Route path="/*" element={<Final />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" autoClose={1000} />{' '}
    </BrowserRouter>
  )
}

export default App
