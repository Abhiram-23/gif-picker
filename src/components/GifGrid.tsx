import type { Gif } from "../types/giphy";
import GifCard from "./GifCard";

interface gifGridInterface {
  gifArray: Gif[];
  copyGif: () => void;
}
function GifGrid({ gifArray, copyGif }: gifGridInterface) {
  return (
    <div className="gif-grid">
      {gifArray.map((items) => (
        <GifCard copied={copyGif} gifData={items} key={items.id} />
      ))}
    </div>
  );
}

export default GifGrid;
