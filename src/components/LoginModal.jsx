// import React, { useState } from "react";
// import "../styles/Login.css";
// import { useNavigate } from "react-router-dom"; // <-- import useNavigate

// const LoginModal = ({ close }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate(); // <-- initialize navigate

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ email, password });

//     // Redirect to admin page
//     navigate("/admin");
    
//     // Close the modal
//     close();
//   };

//   return (
//     <div className="login-overlay" onClick={close}>
//       <div className="login-box" onClick={(e) => e.stopPropagation()}>
//         <h2 className="login-title">Sign In</h2>

//         <form onSubmit={handleSubmit} className="login-form">
//           <label>Email</label>
//           <input 
//             type="email" 
//             placeholder="example@gmail.com" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label>Password</label>
//           <input 
//             type="password" 
//             placeholder="•••••••••" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="login-btn" type="submit">Login</button>
//         </form>

//         <button className="close-btn" onClick={close}>✕</button>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;


import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // <-- Import Axios

const API_BASE_URL = "http://localhost:5000"; // <-- Define your base URL

const LoginModal = ({ close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // <-- State for error message
  const [loading, setLoading] = useState(false); // <-- State for loading visual
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    const url = `${API_BASE_URL}/api/admin/login`
      console.log("Submitting login via POST", { email, password, url });

    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await axios.post(url, {
        email,
        password,
      });

      // 1. Successful Login: Extract token and club info
      const { token, club } = response.data;
      
      // 2. Store the JWT Token and User Data in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('clubName', club.name);
      localStorage.setItem('clubAvatar', club.avatar);
      localStorage.setItem('clubId', club.id);

      // 3. Redirect to the protected admin page
      navigate("/admin");
      
      // 4. Close the modal on success
      close();

    } catch (err) {
      // 5. Handle Errors (Wrong credentials, network issues, etc.)
      if (err.response) {
        // Server responded with a status code outside the 2xx range (e.g., 401 Unauthorized)
        // We expect the backend to send a JSON message like { message: "Invalid credentials" }
        setError(err.response.data.message || "Login failed. Please try again.");
      } else if (err.request) {
        // Request was made but no response was received (e.g., backend is down)
        setError("Network error: Cannot connect to the server.");
      } else {
        // Something else happened in setting up the request
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
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

          {/* 👇 Error Display Handler 👇 */}
          {error && <p className="error-message" style={{color: 'red', margin: '10px 0'}}>{error}</p>}
          
          <button 
            className="login-btn" 
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <button className="close-btn" onClick={close}>✕</button>
      </div>
    </div>
  );
};

export default LoginModal;