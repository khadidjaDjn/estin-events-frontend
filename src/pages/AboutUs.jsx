import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Banner */}
      <div className="about-banner">
        <h1 className="about-title">About AI Student Club</h1>
      </div>

      {/* Content */}
      <div className="about-content">
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            The AI Student Club is a community of passionate students dedicated
            to exploring and advancing the field of Artificial Intelligence.
            We aim to provide hands-on learning, workshops, and collaborative
            projects to help our members develop practical AI skills.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Platform</h2>
          <p>
            This platform was developed by the AI Student Club to share our
            events, workshops, and resources with students and AI enthusiasts.
            You can browse upcoming events, register for workshops, and
            interact with the club online.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to empower students with knowledge and skills in AI and
            Machine Learning, foster innovation, and connect like-minded
            individuals who want to explore the possibilities of AI in
            science, technology, and real-world applications.
          </p>
        </div>

        <div className="about-section">
          <h2>Join Us</h2>
          <p>
            Whether you are a beginner or an experienced AI enthusiast, the AI
            Student Club welcomes you to join our community, participate in
            workshops, and contribute to exciting AI projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
