import { useState } from 'react'
import { useCookies } from 'react-cookie'
import AdminProfile from './AdminProfile'
import AdminClients from './AdminClients'
import AdminProjects from './AdminProjects'
import AdminNewsletter from './AdminNewsletter'
import AdminContacts from './AdminContacts'

const AdminDashboard: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['adminToken'])
  const [currentTab, setCurrentTab] = useState('')
  let element
  switch (currentTab) {
    case 'admin': {
      element = <AdminProfile />
      break
    }
    case 'projects': {
      element = <AdminProjects />
      break
    }
    case 'clients': {
      element = <AdminClients />
      break
    }
    case 'newsletters': {
      element = <AdminNewsletter />
      break
    }
    case 'contacts': {
      element = <AdminContacts />
      break
    }
    default: {
      element = 'Please select a tab'
    }
  }
  const handleLogout = () => {
    removeCookie('adminToken')
  }
  return (
    <div className="w-full min-h-screen  bg-gray-100  p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl my-3">Admin Dashboard</h1>
        <button
          className="text-white rounded-full px-4 py-1 bg-red-700"
          onClick={handleLogout}
        >
          {' '}
          logout{' '}
        </button>
      </div>

      <div className="w-full rounded-xl bg-white p-2 text-lg font-medium gap-2 flex-wrap flex">
        <ButtonDash
          name={'Admin Profile'}
          tab="admin"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'Clients'}
          tab="clients"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'Projects'}
          tab="projects"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'Contacts'}
          tab="contacts"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <ButtonDash
          name={'Newsletter'}
          tab="newsletters"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      </div>
      <div className="w-full p-6 bg-gray-100">{element}</div>
    </div>
  )
}
const ButtonDash = ({
  name,
  tab,
  currentTab,
  setCurrentTab,
}: {
  name: string
  tab: string
  currentTab: string
  setCurrentTab: (tab: string) => void
}) => {
  return (
    <button
      onClick={() => setCurrentTab(tab)}
      className={`${
        currentTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100'
      } rounded-full hover:text-blue-500 text-base px-4 py-1`}
    >
      {name}
    </button>
  )
}
export default AdminDashboard
