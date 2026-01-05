import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const codspaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codspaceName}-8000.app.github.dev/api/teams/`;
        
        console.log('Fetching Teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Teams:', teamsList);
        
        setTeams(teamsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

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
          <strong>Error loading teams:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container content-wrapper">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1>👥 Teams</h1>
          <button className="btn btn-success">+ Create Team</button>
        </div>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h4 className="alert-heading">No Teams Found</h4>
          <p>There are currently no teams available. Click the button above to create one!</p>
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">{team.name || 'Team'}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {team.description || 'No description available'}
                  </p>
                  <div className="row g-2 mb-3">
                    {team.members_count !== undefined && (
                      <div className="col-6">
                        <span className="badge bg-primary w-100">Members: {team.members_count}</span>
                      </div>
                    )}
                    {team.created_at && (
                      <div className="col-6">
                        <span className="badge bg-secondary w-100">
                          {new Date(team.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-light d-flex gap-2">
                  <button className="btn btn-primary btn-sm flex-grow-1">View</button>
                  <button className="btn btn-secondary btn-sm flex-grow-1">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
