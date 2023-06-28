import React, { useState } from "react";
import "./Auth.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login success");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const signInGoogle = () => {
    setIsLoading(true);

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsLoading(false);
        toast.success("Login Succesful");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className='container auth'>
        <div className='img'>
          <img src={loginImg} alt='loginImage' width='400px' />
        </div>

        <Card>
          <div className='form'>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
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
              <button className='--btn --btn-primary --btn-block' type='submit'>
                Login
              </button>
              <div className='links'>
                <Link to='/reset'>Forgot Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className='--btn --btn-danger --btn-block'
              onClick={signInGoogle}
            >
              <FaGoogle color='#fff' />
              <p style={{ marginLeft: "10px", color: "#fff" }}>
                Login With Google
              </p>
            </button>

            <span className='register'>
              <p style={{ paddingRight: "10px" }}>Don't have an account?</p>
              <Link to='/register'>Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
