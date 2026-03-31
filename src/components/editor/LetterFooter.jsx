import React from "react";

export default function LetterFooter() {
  return (
    <footer>
      <div className="flex flex-row w-full" style={{ minHeight: '160px' }}>
        <div className="flex flex-1 flex-col items-start justify-start">
          <img src="/signature.png" alt="Signature" className="pointer-events-none" style={{ width: '140px', height: '80px', objectFit: 'contain', marginBottom: '-18px' }} />
          <p className="font-bold text-[#2b3437]">Rev. Fr. Charles Ndubuisi</p>
          <p className="text-sm text-[#2b3437]">Diocesan Chancellor</p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <img src="/stamp.png" alt="Stamp" className="pointer-events-none" style={{ width: '165px', height: '115px', objectFit: 'contain', opacity: 0.9 }} />
        </div>

        <div className="flex flex-1" />
      </div>
    </footer>
  );
}
