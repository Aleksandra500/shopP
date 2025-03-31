
import AdminNavComponent from './adminComponents/AdminNavComponent'
import AllProdustPage from '../pages/AllProduct'
function AdminPage({showAll}) {
  return (
    <div >
      <AdminNavComponent />
      <div>
       {showAll && <AllProdustPage/>}
      </div>
     
    </div>
  )
}

export default AdminPage