import { useState } from "react";
import type { Gif } from "../types/giphy";

interface gifcardInterface {
  copied: () => void;
  gifData: Gif;
}

function GifCard({ copied, gifData }: gifcardInterface) {
  const [isCopied, setIsCopied] = useState(false);
  const copyGif = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(gifData.images.fixed_width.mp4);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    copied();
  };
  return (
    <div className="gif-card">
      <video autoPlay loop muted playsInline>
        <source src={gifData.images.fixed_width.mp4} type="video/mp4" />
      </video>
      <button
        onClick={copyGif}
        className={`copy-btn ${isCopied ? "copied" : ""}`}
      >
        {isCopied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export default GifCard;
