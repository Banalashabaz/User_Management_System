import logo from './logo.svg';
import './App.css';
import {Routes,BrowserRouter, Route} from 'react-router-dom'
import User_Management from './Components/User_Management';
import UpdateForm from './Components/UpdateForm';
import SubmitForm from './Components/SubmitForm';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
   
<Routes>
  
   <Route path='/' element={<User_Management></User_Management>}></Route>
  <Route path='/update/:id' element={<UpdateForm ></UpdateForm>}></Route>
  </Routes>    
    </BrowserRouter>
    </div>
  );
}

export default App;
