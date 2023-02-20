import './App.css';
import { Routes, Route } from 'react-router';
import CompaniesList from './CompaniesList';
import Company from './Company';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Navbar from './Navbar';
import { useState } from 'react';
import JoblyApi from './api';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Homepage from './Homepage';
import { useEffect } from 'react';
function App() {
  
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  async function register (newUser) {
    try{
      const res = await JoblyApi.register(newUser)
      JoblyApi.token = res
      const user = await JoblyApi.getUser(newUser.username)
      setCurrentUser(user)
      localStorage.token = res
      localStorage.username = user.username
      navigate("/")
    }
    catch (thrownErrors){
      alert(thrownErrors)
    }
  }
  async function login (user) {
    try{
      const res = await JoblyApi.login(user)
      JoblyApi.token = res
      const loginUser = await JoblyApi.getUser(user.username)
      setCurrentUser(loginUser)
      localStorage.token = res
      localStorage.username = user.username
      navigate("/")
    }
    catch(thrownErrors){
      alert(thrownErrors)
    }
  }

  function logout () {
    setCurrentUser(null)
    localStorage.clear()
  }

  async function apply (username, id) {
    try{
      await JoblyApi.apply(username, id)
      const user = await JoblyApi.getUser(username)
      setCurrentUser(user)
    }
    catch(thrownErrors){
      alert(thrownErrors)
    }
  }

  async function update (username, data) {
      const updatedInfo = await JoblyApi.update(username, data)
      const user = await JoblyApi.getUser(updatedInfo.username)
      setCurrentUser(user)
  }

  useEffect(()=>{
    async function getFromLocalStorage (){
      if (localStorage.token && localStorage.username){
        JoblyApi.token = localStorage.token
        const user = await JoblyApi.getUser(localStorage.username)
        setCurrentUser(user)
      }
    }
    getFromLocalStorage()
  }, [])
  return (
    <div className="App">
      <Navbar currentUser={currentUser} logout={logout}/>
      <Routes>
        <Route path="/companies/:handle" element={<Company apply={apply} currentUser={currentUser}/>}/>
        <Route path='/companies' element={<CompaniesList apply={apply} currentUser={currentUser}/>}/>
        <Route path="/jobs" element={<JobsList currentUser={currentUser} apply={apply}/>}/>
        <Route path="/login" element={<LoginForm login={login} currentUser={currentUser}/>}/>
        <Route path="/signup" element={<SignUpForm register={register} currentUser={currentUser}/>}/>
        <Route path="/profile" element={<Profile currentUser={currentUser} update={update}/>}/>
        <Route path="/" element={<Homepage currentUser={currentUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
