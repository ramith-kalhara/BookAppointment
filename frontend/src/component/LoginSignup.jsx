import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../style/css/loginstyle.module.css'; 
import signin from '../assets/img/signin-image.jpg';
import signup from '../assets/img/signup-image.jpg';
import '../style/fonts/material-icon/css/material-design-iconic-font.css'
import Swal from "sweetalert2";
const LoginSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [repeatPassword, setRepeatPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic email validation 
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (!email || !emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return; 
    }
  
    if (!password) {
      Swal.fire({
        icon: "error",
        title: "Password Required",
        text: "Please enter your password.",
      });
      return; 
    }
  
    if (password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please check and try again.",
      });
      return;
    }
  
    // Fetch all users to check if email already exists
    try {
      const response = await axios.get('http://localhost:8086/api/user/all');
      const users = response.data; 
  
      // Check if the entered email already exists
      const emailExists = users.some(user => user.email === email);
  
      if (emailExists) {
        Swal.fire({
          icon: "error",
          title: "Email Already Exists",
          text: "The email you entered is already registered. Please use a different email.",
        });
        return; 
      }
  
      // Proceed with user creation if email doesn't exist
      const UserDto = {
        name: name,
        email: email,
        password: password,
      };
  
      const createResponse = await axios.post('http://localhost:8086/api/user/create', UserDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('User created:', createResponse.data);
      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully.",
      });
  
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue with creating the user. Please try again.",
      });
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const UserDto = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post('http://localhost:8086/api/user/login', UserDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        
        const userId = response.data.id;
        if (userId) {
          localStorage.setItem('userId', userId); 
          
          // Log the user details to console
          const userDetails = {
            userId: response.data.id,
            email: response.data.email,
            name: response.data.name,
          };
          console.log('User details:', userDetails); 
          
          navigate('/appointment'); // Navigate to the appointment page
        } else {
          console.log('User ID is missing in the response');
        }
      } else {
        console.log('Invalid credentials');
      }
  
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  

  return (
    <div>
      <div className={styles.main}>
        {/* Sign up form */}
        <section className={styles.signup} id="signup-section">
          <div className={styles.container}>
            <div className={styles["signup-content"]}>
              <div className={styles["signup-form"]}>
                <h2 className={styles["form-title"]}>Sign up</h2>
                <form method="POST" className={styles["register-form"]} id="register-form" onSubmit={handleSubmit}>
                  <div className={styles["form-group"]}>
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input type="text" name="name" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email" />
                    </label>
                    <input type="email" name="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input type="password" name="pass" id="pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="re-pass">
                      <i className="zmdi zmdi-lock-outline" />
                    </label>
                    <input type="password" name="re_pass" id="re_pass"value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} placeholder="Repeat your password" />
                  </div>
                  <div className={styles["form-group"]}>
                    <input type="checkbox" name="agree-term" id="agree-term" className={styles.agreeTerm} />
                    <label htmlFor="agree-term" className={styles.labelAgreeTerm}>
                      <span><span /></span>
                      I agree to all statements in  
                      <a href="#" className={styles.termService}>Terms of service</a>
                    </label>
                  </div>
                  <div className={`${styles["form-group"]} ${styles["form-button"]}`}>
                    <input type="submit" name="signup" id="signup" className={styles["form-submit"]} defaultValue="Register" />
                  </div>
                </form>
              </div>
              <div className={styles.signupImage}>
                <figure>
                  <img src={signup} alt="sign up" />
                </figure>
                <a href="#sign-in-section" className={styles.signupImageLink}>I am already a member</a>
              </div>
            </div>
          </div>
        </section>

        {/* Sign in Form */}
        <section className={styles["sign-in"]} id="sign-in-section">
          <div className={styles.container}>
            <div className={styles["signin-content"]}>
              <div className={styles["signin-image"]}>
                <figure>
                  <img src={signin} alt="sign in" />
                </figure>
                <a href="#signup-section" className={styles["signup-image-link"]}>Create an account</a>
              </div>
              <div className={styles["signin-form"]}>
                <h2 className={styles["form-title"]}>Sign in</h2>
                <form method="POST" className={styles["register-form"]} id="login-form" onSubmit={handleLogin}>
                  <div className={styles["form-group"]}>
                    <label htmlFor="your_name">
                      <i className="zmdi zmdi-account material-icons-name" />
                    </label>
                    <input type="email" name="your_email" id="your_email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={styles["form-group"]}>
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock" />
                    </label>
                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  
                  <div className={`${styles["form-group"]} ${styles["form-button"]}`}>
                    <input type="submit" name="signin" id="signin" className={styles["form-submit"]} defaultValue="Log in" />
                  </div>
                </form>
               
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginSignup;
