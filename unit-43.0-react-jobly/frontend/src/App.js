import './App.css';
import { Routes, Route } from 'react-router';
import CompaniesList from './CompaniesList';
import Company from './Company';
import JobsList from './JobsList';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Navbar from './Navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<></>}/>
        <Route path="/companies/:handle" element={<Company/>}/>
        <Route path='/companies' element={<CompaniesList />}/>
        <Route path="/jobs" element={<JobsList/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUpForm/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
