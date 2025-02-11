import React, { useState } from 'react'
import axios from 'axios';
import { Link ,useParams} from 'react-router-dom';
export default function SubmitForm() {
        const[form,setForm]=useState({firstname:'',lastname:'',emailId:'',phonenumber:''})
        const[formdata,setFormData]=useState([])
        // const [data,setData]=useState([]);
        function handlechange(e){
            e.preventDefault();
            formdata.push(form)
            console.log(formdata);
            axios.post('http://localhost:4000/',form)
            alert('Data Submitted Succesfully')
        }
  return (
    <div>
        <Link to='/'></Link>
    <h1>User Management System</h1>

        <div>
            <form action="post" onSubmit={handlechange}>
                <label>
                    <input type="text" name="firstname" id="firstname" pattern="^[A-Za-z]+([ ][A-Za-z]+)*$" required onChange={(e)=>setForm({...form,firstname:e.target.value})} placeholder='Enter First Name' />
                    <input type="text" name="lastname" id="lastname"  pattern="^[A-Za-z]+([ ][A-Za-z]+)*$" required onChange={(e)=>setForm({...form,lastname:e.target.value})} placeholder='Enter last Name' />
                    <input type="email" name="emailId" id="emailId"   required  onChange={(e)=>setForm({...form,emailId:e.target.value})} placeholder='Enter Email Id' />
                    <input type="tel" name="phone Number" id="phonenumber" pattern='^[0-9]+$'maxLength={10} minLength={10} required onChange={(e)=>setForm({...form,phonenumber:e.target.value})} placeholder='Enter Phone Number' />
                    <button type='submit' className='submit' >Submit</button>
                   

                </label>
            </form>
        </div>
    </div>
  )
}
