import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./signup.css";

export default function Register({ SetShowsignup }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/user/signup", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="SignupContainer">
      <div className="logo">
  
        <span>harassments spots</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="SignupBtn" type="submit">
          Signup
        </button>
        {success && (
          <span className="success">Successfull. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel
        className="SignupCancel"
        onClick={() => SetShowsignup(false)}
      />
    </div>
  );
}