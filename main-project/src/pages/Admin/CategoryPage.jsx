import Navbar from '../../components/navbar/navbar';
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Categorey from '../../components/Categorey/Categorey';
import  AdminNavbar from"../../components/navbar/AdminNavbar";
function CategoreyPage(){
    return(
        <div>
          <AdminNavbar/>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">

       <AdminSidebar/>

            <Categorey />
        </div>

        </div>
    )
}
export default CategoreyPage;