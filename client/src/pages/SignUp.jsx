import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(res.ok){
        navigate('/sign-in');
      }else{
        setError(data.message);
      }
    }catch(err){
      setError('Something went wrong');
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'> Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={handleChange}  type="text" placeholder="Username" className='border rounded-lg' id='username' required />
        <input onChange={handleChange} type="email" placeholder="Email" className='border rounded-lg' id='email' required />
        <input onChange={handleChange} type="password" placeholder="Password" className='border rounded-lg' id='password' required />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading? "Loading ..": "Sign Up"}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in' className='text-blue-700 hover:underline'>Sign In</Link>
      </div>
      {error && <p className='text-red-600 mt-3'>{error}</p>}
    </div>
  )
}

export default SignUp;