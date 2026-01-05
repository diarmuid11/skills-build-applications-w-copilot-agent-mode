import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const codspaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codspaceName}-8000.app.github.dev/api/activities/`;
        
        console.log('Fetching Activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Activities:', activitiesList);
        
        setActivities(activitiesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
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
          <strong>Error loading activities:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container content-wrapper">
      <div className="row mb-4">
        <div className="col-12">
          <h1>💪 Activities</h1>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h4 className="alert-heading">No Activities Found</h4>
          <p>There are currently no activities available. Please check back later.</p>
        </div>
      ) : (
        <div className="row">
          {activities.map((activity) => (
            <div key={activity.id} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="mb-0">{activity.name || activity.title || 'Activity'}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {activity.description || 'No description available'}
                  </p>
                  <div className="row g-2">
                    {activity.calories && (
                      <div className="col-md-6">
                        <span className="badge bg-success">Calories: {activity.calories}</span>
                      </div>
                    )}
                    {activity.duration && (
                      <div className="col-md-6">
                        <span className="badge bg-info">Duration: {activity.duration} min</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Activities;
