import React, { useState } from "react";
import "../styles/Login.css";

const LoginModal = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    close();
  };

  return (
    <div className="login-overlay" onClick={close}>
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="login-title">Sign In</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="example@gmail.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="•••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">Login</button>
        </form>

        <button className="close-btn" onClick={close}>✕</button>
      </div>
    </div>
  );
};

export default LoginModal;
