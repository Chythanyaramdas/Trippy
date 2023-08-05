import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {adminApi} from"../utils/admin/adminApi";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../redux/adminSlice';

function AdminVerification({ children, accessBy }) {
    const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const {id} = useSelector(store => store.admin)
  const jwtToken=localStorage.getItem('adminToken')


  useEffect(() => {
    const verifyToken = async () => {
      
      if (accessBy === 'Authorized') {
        if(id){
          setLoading(false)
        }
         else if (jwtToken) {
          try {
            const response = await adminApi.get('/token_v');
            if (response.data.status) {
              console.log(response.data);
              setLoading(false); // Set loading state to false
            } else {
              navigate('/admin/adminLogin');
            }
          } catch (error) {
            console.log('err', error);
            setLoading(false); // Set loading state to false
          }
         
        } else {
          window.location.href = '/admin/adminLogin';
        }
      } else if (accessBy === 'non-Authorized') {
        if(id){
          setLoading(false)
        }
        else if (jwtToken) {
          const response = await adminApi.get('/token_v');
            if (response.data.status) {
              dispatch(adminLogin(response.data.admin))
              setLoading(false)
            }
          
        }
      }
    };

    verifyToken();
  }, []);

  if( accessBy === 'Authorized' && loading ) {
    console.log('1');
     return null; // or a loading indicator if desired
   }
   else if( accessBy === 'non-Authorized' && !loading ){
     return navigate('/admin/banner')
   }
 console.log('2');
   return children;

}
export default AdminVerification;