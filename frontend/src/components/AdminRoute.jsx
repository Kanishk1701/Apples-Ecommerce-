    import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  // If user exists AND is admin, show the protected screen.
  // Otherwise, kick them to login.
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}

export default AdminRoute