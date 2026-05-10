export default function RootLoading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5 className="text-muted">Loading DoDave Academy...</h5>
      </div>
    </div>
  );
}
