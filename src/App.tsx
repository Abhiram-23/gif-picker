import { useEffect, useState } from "react";
import useGiphy from "./hooks/useGiphy";
import useDebounce from "./hooks/useDebounce";
import SearchBar from "./components/SearchBar";
import GifGrid from "./components/GifGrid";
import SkeletonGrid from "./components/SkeletonGrid";
import Toast from "./components/Toast";
import "./index.css";
import Pagination from "./components/Pagination";
import ToggleTheme from "./components/ToggleTheme";

const ENABLE_FETCH = true;

function App() {
  const [term, setTerm] = useState("");
  const [toast, setToast] = useState(false);
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") ?? "light";
  });

  const url = window.location;

  const {
    gifs,
    totalCount,
    isLoading,
    isRateLimited,
    error,
    fetchGifs,
    fetchTrending,
  } = useGiphy();

  const debouncedTerm = useDebounce(term, 400);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-body" : "";
  }, [theme]);

  // read URL on load
  useEffect(() => {
    const params = new URLSearchParams(url.search);
    const q = params.get("q") ?? "";
    setTerm(q);
  }, []);

  // fetch when term changes
  useEffect(() => {
    if (!ENABLE_FETCH) return;
    if (debouncedTerm) {
      fetchGifs(debouncedTerm, page);
    } else {
      fetchTrending();
    }
  }, [debouncedTerm, page]);

  const readInput = (query: string) => {
    const params = new URLSearchParams(url.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const newUrl = query
      ? `${url.pathname}?${params.toString()}`
      : url.pathname;
    window.history.pushState({}, "", newUrl);
    setPage(1);
    setTerm(query);
  };

  const copyGif = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 5000);
  };

  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`app ${theme === "dark" ? "dark" : ""}`}>
      {/* Header */}
      <div className="app-header">
        <h1>GIF Picker</h1>
        <p>Search for the perfect GIF</p>
        <ToggleTheme updateTheme={updateTheme} curTheme={theme} />
      </div>
      {/* Search */}
      <SearchBar urlQuery={term} onChange={readInput} />
      {/* Toast */}
      {toast && <Toast message="GIF URL copied to clipboard!" />}
      {/* Rate limit banner */}
      {isRateLimited && (
        <div className="rate-limit-banner">
          ⚠ API limit reached — showing previous results. Try again later.
        </div>
      )}
      {/* Error */}
      {error && (
        <div
          className="rate-limit-banner"
          style={{
            borderColor: "#f87171",
            background: "#fef2f2",
            color: "#991b1b",
          }}
        >
          ⚠ {error}
        </div>
      )}
      {/* Section label */}
      <p className="section-label">
        {term ? `Results for "${term}"` : "Trending"}
      </p>
      {/* Grid */}
      {isLoading ? (
        <SkeletonGrid />
      ) : gifs.length === 0 && term ? (
        // Empty state
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No GIFs found for "{term}"</p>
        </div>
      ) : (
        <GifGrid gifArray={gifs} copyGif={copyGif} />
      )}
      {term && !isLoading && gifs.length > 0 && !isRateLimited && (
        <Pagination
          curPage={page}
          totalPages={Math.ceil(totalCount / 12)}
          onPageChange={setPage}
        />
      )}
      {/* Attribution - required by GIPHY */}
      <p className="giphy-attribution">Powered by GIPHY</p>
    </div>
  );
}

export default App;
