import React, { useState } from 'react';  
import { useNavigate, useParams } from 'react-router-dom';
import sampleData from '../../assets/syllabus.json';
import './index.css';

export default function YearSemesterSelection() {
  const { branch } = useParams(); // get branch from URL
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const navigate = useNavigate();

  // Fixed 4 years for academic selection
  const years = ['1', '2', '3', '4'];

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null); // reset semester on year change

    // Add golden ripple effect
    const yearBtn = document.querySelector(`[data-year="${year}"]`);
    createRippleEffect(yearBtn);
  };

  const handleSemesterClick = (semester) => {
    if (!selectedYear) return; // guard clause
    
    setSelectedSemester(semester);
    const semesterBtn = document.querySelector(`[data-semester="${semester}"]`);
    createRippleEffect(semesterBtn);

    setTimeout(() => {
      navigate(`/${branch}/${selectedYear}/${semester}`);  // include branch param
    }, 400);
  };

  const createRippleEffect = (element) => {
    if (!element) return;
    
    element.style.transform = 'scale(0.95)';
    
    const ripple = document.createElement('div');
    ripple.className = 'golden-ripple';
    element.appendChild(ripple);
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      ripple.remove();
    }, 400);
  };

  // Corrected: Get semesters from sampleData for selected branch and selectedYear or fallback empty array
  const semesters = selectedYear && sampleData[branch] && sampleData[branch][selectedYear]
    ? Object.keys(sampleData[branch][selectedYear])
    : [];

  return (
    <div className="year-semester-container">
      {/* Background particles */}
      <div className="bg-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      <div className="hero-container">
        <div className="book-wrapper">
          <div className="open-book">
            <div className="book-spine"></div>
            
            {/* Left Page - Year Selection */}
            <div className="book-page left-page">
              <div className="left-content">
                <div className="page-icon">📅</div>
                <h1>Select Academic Year</h1>
                <p>Choose your academic year to access course materials</p>
                
                <div className="year-buttons">
                  {years.map((year) => (
                    <button
                      key={year}
                      data-year={year}
                      className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                      onClick={() => handleYearClick(year)}
                    >
                      <span className="year-icon">🎓</span>
                      {`${year} ${year === '1' ? 'st' : year === '2' ? 'nd' : year === '3' ? 'rd' : 'th'} Year`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Page - Semester Selection */}
            <div className="book-page right-page">
              <div className="right-content">
                {!selectedYear ? (
                  <div className="placeholder-content">
                    <div className="floating-elements">
                      <div className="floating-item item-1" title="Academic Years">📚</div>
                      <div className="floating-item item-2" title="Semesters">📖</div>
                      <div className="floating-item item-3" title="Courses">📝</div>
                      <div className="floating-item item-4" title="Resources">💡</div>
                      <div className="floating-item item-5" title="Success">🎯</div>
                    </div>
                    <div className="selection-prompt">
                      <span className="prompt-icon">👈</span>
                      <p>Select a year to view semesters</p>
                    </div>
                  </div>
                ) : (
                  <div className="semester-content">
                    <div className="semester-header">
                      <div className="semester-icon">📚</div>
                      <h2>Year {selectedYear} Semesters</h2>
                      <p>Choose your semester to continue</p>
                    </div>
                    
                    <div className="semester-buttons">
                      {semesters.length === 0 ? (
                        <p>No semesters available for this year.</p>
                      ) : (
                        semesters.map((semester) => (
                          <button
                            key={semester}
                            data-semester={semester}
                            className={`semester-btn ${selectedSemester === semester ? 'active' : ''}`}
                            onClick={() => handleSemesterClick(semester)}
                          >
                            <span className="semester-icon">📖</span>
                            <span className="semester-text">{semester.toUpperCase()}</span>
                            <span className="semester-arrow">→</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Golden sparkles */}
          <div className="sparkles">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
            <div className="sparkle sparkle-4"></div>
            <div className="sparkle sparkle-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
