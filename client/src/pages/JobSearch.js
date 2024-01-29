// JobSearch.js
import React, { useState } from "react";
import jobsData from "./jobs-data.json";
import "../styles/JobSearch.css";

const JobSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (jobsData) {
      const results = jobsData.filter(
        (job) =>
          job.position &&
          job.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  return (
    <div className="job-search-container">
      <h2>Job Search</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a job position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul className="job-list">
        {searchResults.map((job) => (
          <li key={job._id} className="job-item">
            <strong>{job.position}</strong>
            <p>
              <strong>Work Location:</strong> {job.workLocation}
            </p>
            <p>
              <strong>Work Type:</strong> {job.workType}
            </p>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSearch;
