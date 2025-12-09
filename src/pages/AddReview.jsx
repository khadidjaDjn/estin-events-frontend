import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AddReview.css";

const AddReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { eventId } = useParams(); // get eventId from URL
  const navigate = useNavigate();

  const ratingDescriptions = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventId)
    try {
      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/addReview`,
        { name, email, rating, comment }
      );

      console.log(res.data);
      setSubmitted(true);

      // reset form
      setName("");
      setEmail("");
      setRating(0);
      setComment("");

      // optionally redirect to event page
      navigate(`/event/${eventId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="add-review-page">
      <h1>Add a Review</h1>
      {submitted && <div className="success-message">Review submitted!</div>}

      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>

        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>

        <label>
          Rating:
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`star ${star <= (hover || rating) ? "filled" : ""}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>
          {rating > 0 && <div>{ratingDescriptions[rating - 1]}</div>}
        </label>

        <label>
          Comment:
          <textarea value={comment} onChange={e => setComment(e.target.value)} rows={5} required />
        </label>

        <button type="submit" className="btn-submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
