import React, { useState, useEffect } from 'react';
import './branch.css';
import { useNavigate } from 'react-router-dom'
const Branch = ({isVisible}) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const branches = [
    {
      id: 'cse',
      name: 'Computer Science Engineering',
      code: 'CSE',
      color: '#3B82F6',
      icon: '💻'
    },
    {
      id: 'ece',
      name: 'Electronics & Communication',
      code: 'ECE',
      color: '#10B981',
      icon: '📡'
    },
    {
      id: 'eee',
      name: 'Electrical & Electronics',
      code: 'EEE',
      color: '#F59E0B',
      icon: '⚡'
    },
    {
      id: 'mech',
      name: 'Mechanical Engineering',
      code: 'MECH',
      color: '#EF4444',
      icon: '⚙️'
    },
    {
      id: 'ce',
      name: 'Civil Engineering',
      code: 'CE',
      color: '#8B5CF6',
      icon: '🏗️'
    }
  ];

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch.id);
    setTimeout(() => {
        navigate(`/${branch.id}`);
          setSelectedBranch(null);
    }, 300);
  };
  
  const createGoldenDot = (e) => {
    if (Math.random() > 0.95) {
      const dot = document.createElement('div');
      dot.className = 'golden-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 3000);
    }
  };

  return (
    <div className="branch-container" onMouseMove={createGoldenDot}>

      {/* Background Particles */}
      <div className="bg-particles">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
      </div>

      {/* Main Container */}
      <div className="hero-container">
        <div className="book-wrapper">
          <div className="open-book">
            <div className="book-spine" />
            
            {/* Left Page - Text Content */}
            <div className="book-page left-page">
              <div className="left-content">
                <div className="book-icon">🎓</div>
                <h1>Choose Your Academic Path</h1>
                <p>Select your engineering branch to access syllabi, notes, and previous year questions — all organized semester-wise for your academic success.</p>
                <div className="quote">"Your journey to excellence begins with the right choice."</div>
              </div>
            </div>

            {/* Right Page - Branch Selection */}
            <div className="book-page right-page">
              <div className="right-content">
               

                <div className="floating-elements">
                  {branches.map((branch, index) => (
                    <div
                      key={branch.id}
                      className={`floating-item item-${index + 1} ${selectedBranch === branch.id ? 'selected' : ''}`}
                      onClick={() => handleBranchClick(branch)}
                      style={{
                        '--branch-color': branch.color,
                        '--delay': `${index * 0.3}s`
                      }}
                    >
                      <div className="branch-icon">{branch.icon}</div>
                      <div className="branch-code">{branch.code}</div>
                    </div>
                  ))}
                </div>

               
              </div>
            </div>
          </div>

          {/* Sparkles */}
          <div className="sparkles">
            <div className="sparkle sparkle-1" />
            <div className="sparkle sparkle-2" />
            <div className="sparkle sparkle-3" />
            <div className="sparkle sparkle-4" />
            <div className="sparkle sparkle-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branch;