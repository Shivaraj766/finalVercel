import React, { useEffect, useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

const DigitalLibraryHome = () => {
  const [goldenDots, setGoldenDots] = useState([]);
  const navigate = useNavigate();    
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.92) {
        createGoldenDot(e.clientX, e.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const createGoldenDot = (x, y) => {
    const newDot = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    
    setGoldenDots(prev => [...prev, newDot]);
    
    setTimeout(() => {
      setGoldenDots(prev => prev.filter(dot => dot.id !== newDot.id));
    }, 3000);
  };

  const startBrowsing = () => {
    const button = document.querySelector('.cta-button');
    if (button) {
      button.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        button.style.transform = 'scale(1)';
        navigate('/branches');
        // Replace this alert with your navigation logic
        // Example: navigate('/dashboard') or window.location.href = '/dashboard'
      }, 400);
    }
  };

  const handleFloatingItemHover = (e, isEnter) => {
    const item = e.currentTarget;
    if (isEnter) {
      item.style.animation = 'none';
      item.style.boxShadow = '0 25px 50px rgba(139, 69, 19, 0.5), inset 0 2px 20px rgba(255, 255, 255, 0.3)';
    } else {
      item.style.animation = 'floatItem 5s ease-in-out infinite';
      item.style.boxShadow = '0 12px 30px rgba(139, 69, 19, 0.3), inset 0 2px 10px rgba(255, 255, 255, 0.1)';
    }
  };

  return (
    <div className="digital-library-container">
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
            
            <div className="book-page left-page">
              <div className="left-content">
                <div className="book-icon">📚</div>
                <h1>Welcome to Your Digital Library</h1>
                <p>Find syllabi, notes, previous year questions — all semester-wise.</p>
                <button className="cta-button" onClick={startBrowsing}>
                  Start Browsing
                </button>
              </div>
            </div>

            <div className="book-page right-page">
              <div className="right-content">
                <div className="floating-elements">
                  <div 
                    className="floating-item item-1" 
                    title="Library Books"
                    onMouseEnter={(e) => handleFloatingItemHover(e, true)}
                    onMouseLeave={(e) => handleFloatingItemHover(e, false)}
                  >
                    📖
                  </div>
                  <div 
                    className="floating-item item-2" 
                    title="Ideas & Knowledge"
                    onMouseEnter={(e) => handleFloatingItemHover(e, true)}
                    onMouseLeave={(e) => handleFloatingItemHover(e, false)}
                  >
                    💡
                  </div>
                  <div 
                    className="floating-item item-3" 
                    title="PDF Documents"
                    onMouseEnter={(e) => handleFloatingItemHover(e, true)}
                    onMouseLeave={(e) => handleFloatingItemHover(e, false)}
                  >
                    PDF
                  </div>
                  <div 
                    className="floating-item item-4" 
                    title="Academic Success"
                    onMouseEnter={(e) => handleFloatingItemHover(e, true)}
                    onMouseLeave={(e) => handleFloatingItemHover(e, false)}
                  >
                    🎓
                  </div>
                  <div 
                    className="floating-item item-5" 
                    title="Study Notes"
                    onMouseEnter={(e) => handleFloatingItemHover(e, true)}
                    onMouseLeave={(e) => handleFloatingItemHover(e, false)}
                  >
                    📝
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sparkles">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
            <div className="sparkle sparkle-4"></div>
            <div className="sparkle sparkle-5"></div>
          </div>
        </div>
      </div>

      {/* Golden dots for cursor trail */}
      {goldenDots.map(dot => (
        <div
          key={dot.id}
          className="golden-dot"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
          }}
        />
      ))}
    </div>
  );
};

export default DigitalLibraryHome;