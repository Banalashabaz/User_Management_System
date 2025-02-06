import React from 'react'
import { Link ,useParams} from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';
export default function UpdateForm() {
  const [form,setForm]=useState({firstname:'',lastname:'',emailId:'',phonenumber:''})
  const [formdata,setFormData]=useState([])
  const [data,setData]=useState([]);
  const {id}=useParams();
  
  
  const result=data.filter((y)=>y.id==id);
  console.log('result ',result)
  const uid=result.map((x)=>x.id)
  const fname=result.map((x)=>x.first_name)
  const lname=result.map((x)=>x.last_name)
  const email=result.map((x)=>x.email)
  const phone=result.map((x)=>x.phone)
  
 
        function handlechange(e){
            e.preventDefault();
            formdata.push(form)
            console.log(formdata);
             axios.put(`http://localhost:4000/update-user/${uid}`,form)
            console.log(form,'form data');
            console.log(data,'updated Data',id) 

            alert('Data Updated Succesfully .......')
}
           useEffect(()=>{
               fetch('http://localhost:4000/').then((res)=>res.json()).then((data)=>{setData(data)}).catch((err)=>console.log(err))
            },[data])
 

    


  return (
    <div>
      <Link to='/update'></Link>
       <h1>Update Details</h1>
      
        <div>
            <form action="post" onSubmit={handlechange} className='updateform'>

                    <input type="text" name="firstname" id="firstname"    pattern="^[A-Za-z]+([-'][A-Za-z]+)*$" placeholder={fname}  onChange={(e)=>setForm({...form,firstname:e.target.value})}  />
                    <input type="text" name="lastname" id="lastname"   pattern="^[A-Za-z]+([-'][A-Za-z]+)*$"   placeholder={lname}  onChange={(e)=>setForm({...form,lastname:e.target.value})}  />
                    <input type="email" name="emailId" id="emailId"   placeholder={email}  onChange={(e)=>setForm({...form,emailId:e.target.value})} />
                    <input type="text" name="phone Number" id="phonenumber" pattern='^[0-9]+$'  placeholder={phone} minLength={10} maxLength={10}  onChange={(e)=>setForm({...form,phonenumber:e.target.value})} />
                    <button type='submit' className='submit' >Submit</button>
               
            </form>
        </div>
 
    </div>
  )
}
