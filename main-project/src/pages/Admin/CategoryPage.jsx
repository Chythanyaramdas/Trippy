import Navbar from '../../components/navbar/navbar';
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Categorey from '../../components/Categorey/Categorey';

function CategoreyPage(){
    return(
        <div>
            <Navbar/>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">

       <AdminSidebar/>

            <Categorey />
        </div>

        </div>
    )
}
export default CategoreyPage;