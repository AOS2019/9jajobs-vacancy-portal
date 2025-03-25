// pages/jobs/[id].js
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/jobs?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="container">
      <header>
        <h1>9jaJobPortal</h1>
        <p>Discover the Latest Job Vacancies in Nigeria</p>
      </header>

      <nav>
        <a href="#" onClick={() => router.push("/")}>
          Home
        </a>
        <a href="#" onClick={() => router.push("/")}>
          Back to Listings
        </a>
        <a href="#">Contact Us</a>
      </nav>

      <div id="jobDetail">
        <div className="job-details">
          <h2>{job.title}</h2>
          <p>
            <strong>Company:</strong> {job.company}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Date Posted:</strong> {job.datePosted}
          </p>
          <p>
            <strong>Description:</strong> {job.description}
          </p>
          <p>
            <strong>Key Responsibilities:</strong> {job.keyResponsibilities}
          </p>
          <p>
            <strong>Required Skills:</strong> {job.requiredSkills}
          </p>
          <p>
            <strong>Closing Date:</strong> {job.closingDate}
          </p>
          <p>
            <strong>How to Apply:</strong> {job.applicationMethod}
          </p>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 9jaJobPortal. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
