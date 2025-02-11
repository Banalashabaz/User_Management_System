import React from 'react'
import { Link ,useParams} from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';
export default function UpdateForm() {
  const [formdata,setFormData]=useState([])
  const [data,setData]=useState([]);
  const {id}=useParams();
  

  const [form,setForm]=useState({firstname:'',lastname:'',emailId:'',phonenumber:''});

      // form.firstname=fname;
        
        function handlechange(e){
            e.preventDefault();
            formdata.push(form)
             axios.put(`http://localhost:4000/update-user/${id}`,form)
          

            alert('Data Updated Succesfully .......')
}
           useEffect(()=>{
               fetch(`http://localhost:4000/data/${id}`).then((res)=>res.json()).then((data)=>{
                var res=data.filter((s)=>s.id==id);
                const fnames =res.map((s)=>s.first_name)
                     
                 const lnames=res.map((s)=>s.last_name);
                 const  emails=res.map((s)=>s.email);
                 const phones=res.map((s)=>s.phone)
                setForm({...form,firstname:fnames,lastname:lnames,emailId:emails,phonenumber:phones})
               }).catch((err)=>console.log(err))
            },[data])
 

    
console.log(form)

  return (
    <div>
      <Link to='/update'></Link>
       <h1>Update Details</h1>
        <div>
            <form action="post" onSubmit={handlechange} className='updateform'>

                    <input type="text" name="firstname" id="firstname" value={form.firstname}   pattern="^[A-Za-z]+([-'][A-Za-z]+)*$"  onChange={(e)=>setForm({...form,firstname:e.target.value})}  />
                    <input type="text" name="lastname" id="lastname"   pattern="^[A-Za-z]+([-'][A-Za-z]+)*$"  value={form.lastname}  onChange={(e)=>setForm({...form,lastname:e.target.value})}  />
                    <input type="email" name="emailId" id="emailId"   value={form.emailId}   onChange={(e)=>setForm({...form,emailId:e.target.value})} />
                    <input type="text" name="phone Number" id="phonenumber" value={form.phonenumber} pattern='^[0-9]+$'  minLength={10} maxLength={10}  onChange={(e)=>setForm({...form,phonenumber:e.target.value})} />
                    <button type='submit' className='submit' >Submit</button>
               
            </form>
        </div>
 
    </div>
  )
}
