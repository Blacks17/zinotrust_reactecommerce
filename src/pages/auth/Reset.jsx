import React, { useState } from "react";
import "./Auth.scss";
import resetImg from "../../assets/forgot.png";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Check your email");
        setEmail("");
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
          <img src={resetImg} alt='ResetPassword' width='400px' />
        </div>

        <Card>
          <div className='form'>
            <h2>Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type='email'
                placeholder='Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className='--btn --btn-primary --btn-block' type='submit'>
                Reset Password
              </button>
              <div className='links'>
                <p>
                  <Link to='/login'>Login</Link>
                </p>
                <p>
                  <Link to='/register'>Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;
