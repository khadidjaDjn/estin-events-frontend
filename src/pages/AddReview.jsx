import React, { useState } from "react";
import "../styles/AddReview.css";

const AddReview = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0); // current selected rating
  const [hover, setHover] = useState(0);   // hover rating
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingDescriptions = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, rating, comment });
    setSubmitted(true);
    setName("");
    setEmail("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="add-review-page">
      <h1>Add a Review</h1>
      <p>Share your feedback about the event or the platform.</p>

      {submitted && (
        <div className="success-message">Review submitted successfully!</div>
      )}

      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Your Rating:
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${
                  star <= (hover || rating) ? "filled" : ""
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>
          {rating > 0 && (
            <div className="rating-description">
              {ratingDescriptions[rating - 1]}
            </div>
          )}
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            required
          ></textarea>
        </label>

        <button type="submit" className="btn-submit">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
