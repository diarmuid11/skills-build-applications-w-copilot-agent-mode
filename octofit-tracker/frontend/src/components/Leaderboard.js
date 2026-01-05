import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const codspaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codspaceName}-8000.app.github.dev/api/leaderboard/`;
        
        console.log('Fetching Leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Leaderboard:', leaderboardList);
        
        setLeaderboard(leaderboardList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankBadgeClass = (index) => {
    if (index === 0) return 'rank-badge gold';
    if (index === 1) return 'rank-badge silver';
    if (index === 2) return 'rank-badge bronze';
    return 'rank-badge';
  };

  if (loading) {
    return (
      <div className="container content-wrapper">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container content-wrapper">
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error loading leaderboard:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container content-wrapper">
      <div className="row mb-4">
        <div className="col-12">
          <h1>🏆 Leaderboard</h1>
        </div>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h4 className="alert-heading">No Leaderboard Data</h4>
          <p>There are currently no leaderboard entries. Please check back later.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '10%' }}>Rank</th>
                <th style={{ width: '35%' }}>User</th>
                <th className="text-center" style={{ width: '25%' }}>Score</th>
                <th style={{ width: '30%' }}>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={index < 3 ? 'table-success' : ''}>
                  <td className="text-center">
                    <span className={getRankBadgeClass(index)}>{index + 1}</span>
                  </td>
                  <td>
                    <strong>{entry.user?.username || entry.name || 'Unknown User'}</strong>
                  </td>
                  <td className="text-center">
                    <span className="badge bg-primary" style={{ fontSize: '0.9rem', padding: '0.6rem 0.8rem' }}>
                      {entry.score || entry.points || 0}
                    </span>
                  </td>
                  <td>{entry.team?.name || entry.team || 'No Team'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
