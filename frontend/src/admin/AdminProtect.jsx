
import { Navigate } from "react-router-dom"

function AdminProtect(props) {
 
  let user = JSON.parse(localStorage.getItem('user'));
 
  
  return <>
  {user.role === 'admin' ? {...props.children} : <Navigate to='/' />}
  </>
}

export default AdminProtect