interface searchBarProps {
  urlQuery: string;
  onChange: (value: string) => void;
}

function SearchBar({ urlQuery, onChange }: searchBarProps) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          className="search-input"
          placeholder="Search GIFs..."
          onChange={(e) => onChange(e.target.value)}
          value={urlQuery}
        />
        {urlQuery && (
          <button className="clear-btn" onClick={() => onChange("")}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
