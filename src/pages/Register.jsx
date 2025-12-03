import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Register.css";
import { useParams } from "react-router-dom";

const Register = () => {
  const { id } = useParams(); // from /event/:id/register
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [isClosed, setIsClosed] = useState(false);

  // Fetch registration form from backend
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/events/${id}/registration-form`
        );
        setFormFields(res.data);

        // Initialize formData keys with empty values
        const initialData = {};
        res.data.forEach((f) => {
          if (f.type === "checkbox") initialData[f.label] = [];
          else initialData[f.label] = "";
        });
        setFormData(initialData);
      } catch (err) {
        if (err.response?.status === 404) {
          setIsClosed(true);
        } else {
          console.error("Error fetching registration form:", err);
        }
      }
    };
    fetchForm();
  }, [id]);

  // Handle input changes
  const handleChange = (label, value, type) => {
    if (type === "checkbox") {
      const arr = formData[label] || [];
      if (arr.includes(value)) {
        setFormData({ ...formData, [label]: arr.filter((v) => v !== value) });
      } else {
        setFormData({ ...formData, [label]: [...arr, value] });
      }
    } else {
      setFormData({ ...formData, [label]: value });
    }
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/events/${id}/register`,
        formData
      );
      alert(res.data.msg || "Registration successful!");
      // Reset form
      const resetData = {};
      formFields.forEach((f) => {
        resetData[f.label] = f.type === "checkbox" ? [] : "";
      });
      setFormData(resetData);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed!");
    }
  };

  if (isClosed) {
    return (
      <div className="register-page">
        <div className="register-container">
          <h1 className="register-title">Event Registration</h1>
          <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
            Event Registration is closed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Event Registration</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          {formFields.map((f, i) => (
            <div key={i} className="form-field">
              <label>
                {f.label} {f.required && "*"}
              </label>

              {f.type === "text" && (
                <input
                  type="text"
                  value={formData[f.label]}
                  onChange={(e) => handleChange(f.label, e.target.value, f.type)}
                  required={f.required}
                />
              )}

              {(f.type === "radio" || f.type === "checkbox") &&
                f.options.map((opt, idx) => (
                  <div key={idx} className="option-row">
                    <input
                      type={f.type}
                      id={`${f.label}-${idx}`}
                      name={f.label}
                      value={opt}
                      checked={
                        f.type === "checkbox"
                          ? formData[f.label]?.includes(opt)
                          : formData[f.label] === opt
                      }
                      onChange={() => handleChange(f.label, opt, f.type)}
                      required={f.required && f.type === "radio"}
                    />
                    <label htmlFor={`${f.label}-${idx}`}>{opt}</label>
                  </div>
                ))}
            </div>
          ))}

          <button type="submit" className="btn-submit">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
