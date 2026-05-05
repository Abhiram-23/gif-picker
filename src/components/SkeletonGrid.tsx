function SkeletonGrid() {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="skeleton-card" />
      ))}
    </div>
  );
}

export default SkeletonGrid;
