'use client';

import { useState, useEffect } from "react";
import Script from 'next/script';
import Link from "next/link";
import Head from 'next/head';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    keyResponsibilities: "",
    requiredSkills: "",
    closingDate: "",
    applicationMethod: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch jobs when component mounts
  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle job submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      ...formData,
      datePosted: new Date().toISOString().split("T")[0],
    };

    const res = await fetch("./pages/api/postJob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    if (res.ok) {
      setSuccessMessage("Job post submitted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        // Clear the form and reload jobs
        setFormData({
          title: "",
          company: "",
          location: "",
          description: "",
          keyResponsibilities: "",
          requiredSkills: "",
          closingDate: "",
          applicationMethod: "",
        });
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <>
        <Head>
        <Script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        strategy="beforeInteractive" // Ensures jQuery loads before other scripts
      />
          <link rel="stylesheet" href="./public/assets/css/styles.css" />
        </Head>
        {<div>
      <header>
        <h1>9jaJobPortal</h1>
        <p>Discover the Latest Job Vacancies in Nigeria</p>
      </header>

      <nav>
        <a href="#" onClick={() => setFormVisible(false)}>Home</a>
        <a href="#" onClick={() => setFormVisible(!formVisible)}>Post a Job</a>
        <a href="#">Contact Us</a>
      </nav>

      <div className="container">
        <div className="search-bar">
          <input type="text" placeholder="Search for jobs..." />
          <button>Search</button>
        </div>

        <div id="jobListings">
          {jobs.map((job) => (
            <div key={job._id} className="job-listing">
              <h2 className="job-title">
                <Link href={`/jobs/${job._id}`}>{job.title}</Link>
              </h2>
              <p className="job-details">
                Company: {job.company} | Location: {job.location} | Date Posted: {job.datePosted}
              </p>
              <p>
                {job.description.length > 100
                  ? job.description.substring(0, 100) + "..."
                  : job.description}
              </p>
              <button onClick={() => (window.location.href = `/jobs/${job._id}`)}>
                Apply
              </button>
            </div>
          ))}
        </div>

        {formVisible && (
          <div className="form-container">
            <h3>Post a New Job</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Job Description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="text"
                name="keyResponsibilities"
                placeholder="Key Responsibilities (separated by commas)"
                value={formData.keyResponsibilities}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="requiredSkills"
                placeholder="Required Skills (separated by commas)"
                value={formData.requiredSkills}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="closingDate"
                placeholder="Closing Date"
                value={formData.closingDate}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="applicationMethod"
                placeholder="Application Method (e.g., email or link)"
                value={formData.applicationMethod}
                onChange={handleChange}
                required
              />
              <button type="submit">Submit Job</button>
            </form>
          </div>
        )}

        {successMessage && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(135deg, #f093fb, #f5576c)",
              color: "#fff",
              padding: "20px 40px",
              fontSize: "24px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
              zIndex: "9999",
              textAlign: "center",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {successMessage}
          </div>
        )}
      </div>

      <footer>
        <p>&copy; 2025 9jaJobPortal. All Rights Reserved.</p>
      </footer>
    </div>}
      </>
    
  );
}
