import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link ,useParams} from 'react-router-dom';
import SubmitForm from './SubmitForm';
import UpdateForm from './UpdateForm';
export default function User_Management() {
    const[count,setCount]=useState(1)
    const[form,setForm]=useState({firstname:'',lastname:'',emailId:'',phonenumber:''})
    const[formdata,setFormData]=useState([])
    const [data,setData]=useState([]);
    const[id,setId]=useState('');
    const[cond,setCond]=useState(true);
    useEffect(()=>{
        fetch('http://localhost:4000').then((res)=>res.json()).then((data)=> setData(data)).catch((err)=>console.log(err))
    },[data])
  function handle(id){
    console.log('handler',data)
    console.log(id)
  }

  const   deleteData=(id)=>{
    try {
      const response =  axios.delete(`http://localhost:4000/delete-user/${id}`);
      alert(response.data.message);
      
    } catch (error) {
      console.error("Error deleting user:", error);
      // alert("Failed to delete user. Try again.");
    }
    window.confirm('Do You Want to Delete')
    console.log('data Deleted',id)
  }
 
 
  useEffect(()=>{
    
    if(data.length>0){
      setCond(true)
      console.log(cond)
    }
    else{
      setCond(false)
    }

  },[cond])


  return (
    <>
       <Link to='/'>
         
       
       </Link>
       <SubmitForm />

   <h1>{cond}</h1>
      <div> {data.length>0?
 <div id='table'>
         <table >
             <tr>
             <td >First Name</td>
             <td >Last Name</td>
             <td>Email Id</td>
             <td>Phone Number</td>
             <td>Edit Details</td>
             </tr>
             {
                 <>
                     {
                     data.map((items)=>{
                        return  <>
                        <tr>
                         <td>{items.first_name}</td>
                         <td>{items.last_name}</td>
                         <td>{items.email}</td>
                         <td>{items.phone}</td>
                         <td> 
                         {console.log(items.id,"uid")}
                         <Link to={`/update/${items.id}`}  style={{textDecoration:'none',fontSize:'medium',width:'70px'}}className='update' onClick={handle(items.id)}>update</Link>
                          <button className='delete' onClick={()=>deleteData(items.id)}>delete</button></td>
                         </tr>
                         </>
                     })
                     }
           </>
         }
         </table>
         </div>
         :<h1>No Data Found</h1>
}
      </div>
       
        
    </>
  )
}
