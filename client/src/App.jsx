import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Books } from './components/Books';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import AddStudent from './components/AddStudent';
import { useState } from 'react';
import { Logout } from './components/Logout';
import axios from "axios"
import { useEffect } from 'react';
import AddBooks from './components/AddBook';


function App() {
  const [role, setRole] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify', { withCredentials: true })
      .then(res => {
        if (res.data.login) {
          setRole(res.data.role)
        } else {
          setRole('')
        }
        console.log('Verification Response ',res)
      }).catch(err => {
        console.log('Error during verification:', err.response ? err.response.data : err);
      });
  }, [setRole]);


  return (
    <>  
      <BrowserRouter>
        <Navbar role = {role} />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/books" element={<Books/>} ></Route>
          <Route path="/login" element={<Login setRoleVar = {setRole}/>} ></Route>
          <Route path="/dashboard" element={<Dashboard/>} ></Route>
          <Route path="/addstudent" element={<AddStudent/>} ></Route>
          <Route path="/logout" element={<Logout setRole = {setRole}/>} ></Route>
          <Route path="/addbook" element={<AddBooks />} ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
