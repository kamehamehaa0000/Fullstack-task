import { useCookies } from 'react-cookie'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

const Admin: React.FC = () => {
  const [cookies] = useCookies(['adminToken'])
  return <div>{cookies.adminToken ? <AdminDashboard /> : <AdminLogin />}</div>
}

export default Admin
