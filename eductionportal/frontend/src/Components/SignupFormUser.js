import React, { useState , useContext} from 'react';
import '../CSS/Login.css'
import axios from '../Api/axios';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function SignupFormUser() {
  const LOGIN_URL = '/users/signup';

  const navigate = useNavigate();

  const  { setAuth } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        { firstName, lastName, email, password}
    );
    console.log("Signup FOrm user - response :"+JSON.stringify(response));
    setAuth(response.data);
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setAuth(null)
    navigate('../login_user')
    } catch(err){
        console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <center>
      <h1>User Sign Up</h1>
      </center>
      <label>
        First Name:
        <input maxLength={20} required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input maxLength={20} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input maxLength={20} required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input maxLength={20} required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit" className='login-form-item-sb'>Sign Up</button>
    </form>
  );
}
export default SignupFormUser;
