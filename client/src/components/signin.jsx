import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";
import { useRef, useState } from "react";
import "./signin.css";

export default function Login({ SetShowsignin, setCurrent_user,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/user/signin", user);
      setCurrent_user(res.data.username);
      myStorage.setItem('user', res.data.username);
      SetShowsignin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signinContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>harassment spots</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="signinBtn" type="submit">
          signin
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="signinCancel" onClick={() => SetShowsignin(false)} />
    </div>
  );
}