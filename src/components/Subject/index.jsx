import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";

export default function SubjectUnitPage() {
  // ────────────────────────────────
  // 1. URL params (works with both
  //    /cse/1/1  and  /cse/year1/sem1)
  // ────────────────────────────────
  const { branch, yearId, semId } = useParams();
  const navigate = useNavigate();

  // strip the optional text prefix (“year”, “sem”)
  const clean = (val, prefix) => val?.replace(new RegExp(`^${prefix}`, "i"), "");
  
  const year = clean(decodeURIComponent(yearId), "year");
  const sem = clean(decodeURIComponent(semId), "sem");
  // ────────────────────────────────
  // 2. env-driven API base
  // ────────────────────────────────
  const API_BASE =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || ""; // "" ⇒ same-origin

  // ────────────────────────────────
  // 3. state
  // ────────────────────────────────
  const [subjects,        setSubjects]        = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [animateUnits,    setAnimateUnits]    = useState(false);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);

  // ────────────────────────────────
  // 4. fetch on route change
  // ────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/api/syllabus/${branch}/${year}/${sem}`)
      .then((res) => {
        if (!res.ok) throw new Error("Data not found");
        return res.json();
      })
      .then((data) => {
        setSubjects(data);
        setSelectedSubject(data[0] || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [API_BASE, branch, year, sem]);

  // ────────────────────────────────
  // 5. trigger card entrance animation
  // ────────────────────────────────
  useEffect(() => {
    if (!selectedSubject) return;
    setAnimateUnits(false);
    const t = setTimeout(() => setAnimateUnits(true), 100);
    return () => clearTimeout(t);
  }, [selectedSubject]);

  // ────────────────────────────────
  // 6. helpers
  // ────────────────────────────────
  const buildPdfUrl = (pdfPath = "") =>
    /^https?:\/\//i.test(pdfPath)
      ? pdfPath
      : `${import.meta.env.BASE_URL.replace(/\/$/, "")}${pdfPath}`;

  const openPdf = (pdfPath) =>
    window.open(buildPdfUrl(pdfPath), "_blank", "noopener,noreferrer");

  const createGoldenRipple = (el) => {
    if (!el) return;
    const ripple = document.createElement("div");
    ripple.className = "sup-golden-ripple";
    el.style.position = "relative";
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  };

  const handleSubjectClick = (subject, e) => {
    setSelectedSubject(subject);
    if (e?.currentTarget) createGoldenRipple(e.currentTarget);
  };

  // ────────────────────────────────
  // 7. render
  // ────────────────────────────────
  return (
    <div className="sup-container">
      <div className="sup-library-content">
        {/* ---------- LEFT SIDEBAR ---------- */}
        <aside className="sup-sidebar">
          <div className="sup-sidebar-header">
            <div className="sup-book-icon">📚</div>
            <div className="sup-title-container">
              <div className="sup-badges">
                <span className="sup-year-badge">Year&nbsp;{year}</span>
                <span className="sup-sem-badge">Sem&nbsp;{sem}</span>
              </div>
            </div>
          </div>

          <div className="sup-subjects-scroll">
            {loading ? (
              <p>Loading…</p>
            ) : error ? (
              <p className="sup-error">{error}</p>
            ) : subjects.length === 0 ? (
              <p>No subjects available</p>
            ) : (
              subjects.map((subject, index) => (
                <button
                  key={subject.name}
                  className={`sup-subject-card ${
                    selectedSubject?.name === subject.name ? "active" : ""
                  }`}
                  onClick={(e) => handleSubjectClick(subject, e)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="sup-subject-icon">📖</div>
                  <span className="sup-subject-name">{subject.name}</span>
                  <div className="sup-subject-glow" />
                </button>
              ))
            )}
          </div>

          <button className="sup-back-button" onClick={() => navigate(-1)}>
            <span className="sup-back-icon">←</span>
            <span>Back to Selection</span>
          </button>
        </aside>

        {/* ---------- RIGHT MAIN CONTENT ---------- */}
        <main className="sup-units-main">
          {!selectedSubject ? (
            <div className="sup-placeholder-content">
              <div className="sup-floating-book">📚</div>
              <h3>Select a Subject</h3>
              <p>Choose a subject from the left panel to view its units and PDFs</p>
            </div>
          ) : (
            <div className="sup-units-content">
              <div className="sup-subject-header">
                <h3 className="sup-current-subject">{selectedSubject.name}</h3>
                <div className="sup-subject-decoration" />
              </div>

              <div className="sup-units-grid">
                {selectedSubject.unitPdfs?.length ? (
                  selectedSubject.unitPdfs.map((pdfPath, idx) => (
                    <button
                      key={idx}
                      className={`sup-unit-card ${animateUnits ? "animate" : ""}`}
                      style={{ animationDelay: `${idx * 0.15}s` }}
                      onClick={() => openPdf(pdfPath)}
                    >
                      <div className="sup-unit-number">
                        <span>{String(idx + 1).padStart(2, "0")}</span>
                      </div>
                      <div className="sup-unit-content">
                        <h4>Unit {idx + 1}</h4>
                        <p>Click to view PDF</p>
                      </div>
                      <div className="sup-unit-icon">📄</div>
                    </button>
                  ))
                ) : (
                  <div className="sup-no-units">
                    <div className="sup-no-units-icon">📭</div>
                    <p>No PDF units available for this subject</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
