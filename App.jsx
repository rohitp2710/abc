import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import bgPhoto from "./assets/abc1.jpg.jpeg";
import bgPhoto2 from "./assets/abc2.jpg.jpeg";

export default function App() {
  const zoneRef = useRef(null);
  const noBtnRef = useRef(null);

  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!accepted) return;
    const myConfetti = confetti.create(null, { resize: true });
    myConfetti({ particleCount: 300, spread: 140, origin: { y: 0.6 } });
  }, [accepted]);

  const moveNo = () => {
    const btn = noBtnRef.current;
    btn.classList.add("shake");

    setTimeout(() => {
      btn.classList.remove("shake");
      const zone = zoneRef.current.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      const pad = 10;

      btn.style.left = pad + Math.random() * (zone.width - b.width - pad * 2) + "px";
      btn.style.top = pad + Math.random() * (zone.height - b.height - pad * 2) + "px";
      btn.classList.add("bounce");
      setTimeout(() => btn.classList.remove("bounce"), 400);

      setYesScale((s) => Math.min(2.8, s + 0.18));
    }, 180);
  };

  const handleYes = () => {
    setAccepted(true);
    const rect = zoneRef.current.getBoundingClientRect();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight
      },
      colors: ["#ff4d6d", "#ff85a1", "#ffcad4"]
    });
  };

  return (
    <div
      className={`app ${accepted ? "accepted" : ""}`}
      style={accepted ? { backgroundImage: `url(${bgPhoto})` } : {}}
    >
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={{ left: `${Math.random()*100}%`, animationDelay: `${Math.random()*6}s` }}>❤️</span>
        ))}
      </div>

      <div className="card">
        {photo ? (
          <img src={photo} alt="Her" className="photo" />
        ) : (
          <div className="photo-wrapper">
            <img src={bgPhoto2} alt="Her" className="photo placeholder" />
          <label className="upload">
            
            <input type="file" accept="image/*" hidden onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}/>
          </label>
          </div>
        )}

        <h1>Shweta, will you be my Valentine? 💖</h1>

        {!accepted && (
          <>
            <div className="button-zone" ref={zoneRef} onPointerMove={moveNo}>
              <button className="yes" style={{ transform:`translate(-50%,-50%) scale(${yesScale})`}} onClick={handleYes}>Yes</button>
              <button ref={noBtnRef} className="no">No</button>
            </div>
            <p className="hint">You can't deny 😈</p>
          </>
        )}

        {accepted && <h2 className="yay">YAY! 🎉</h2>}
      </div>
    </div>
  );
}
