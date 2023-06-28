import React, { useState } from "react";
import "./Auth.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/Card/Card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/Loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cfmPassword) {
      toast.error("Password do not match!");
    } else {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          toast.success("Registration successfull");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className='container auth'>
        <Card>
          <div className='form'>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='password'
                placeholder='Confirm Password'
                required
                value={cfmPassword}
                onChange={(e) => setCfmPassword(e.target.value)}
              />
              <button type='submit' className='--btn --btn-primary --btn-block'>
                Register
              </button>
            </form>
            <span className='register'>
              <p style={{ paddingRight: "10px" }}>Already have an account?</p>
              <Link to='/login'>Login</Link>
            </span>
          </div>
        </Card>

        <div className='img'>
          <img src={registerImg} alt='Register' width='400px' />
        </div>
      </section>
    </>
  );
};

export default Register;
