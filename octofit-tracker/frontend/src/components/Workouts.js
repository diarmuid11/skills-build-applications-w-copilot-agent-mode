import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codspaceName = process.env.REACT_APP_CODESPACE_NAME || 'localhost:8000';
        const apiUrl = `https://${codspaceName}-8000.app.github.dev/api/workouts/`;
        
        console.log('Fetching Workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsList = data.results || (Array.isArray(data) ? data : []);
        console.log('Processed Workouts:', workoutsList);
        
        setWorkouts(workoutsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter(
    (workout) => filterDifficulty === 'all' || workout.difficulty === filterDifficulty
  );

  const getDifficultyBadge = (difficulty) => {
    const difficultyMap = {
      easy: 'success',
      intermediate: 'warning',
      advanced: 'danger',
      beginner: 'info',
    };
    const badgeClass = difficultyMap[difficulty?.toLowerCase()] || 'secondary';
    return <span className={`badge bg-${badgeClass}`}>{difficulty}</span>;
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
          <strong>Error loading workouts:</strong> {error}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container content-wrapper">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1>🏋️ Personalized Workouts</h1>
          <button className="btn btn-success">+ Create Workout</button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group" aria-label="Difficulty Filter">
            <input
              type="radio"
              className="btn-check"
              name="difficulty"
              id="all"
              value="all"
              checked={filterDifficulty === 'all'}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            />
            <label className="btn btn-outline-primary" htmlFor="all">
              All Difficulties
            </label>

            <input
              type="radio"
              className="btn-check"
              name="difficulty"
              id="easy"
              value="easy"
              checked={filterDifficulty === 'easy'}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            />
            <label className="btn btn-outline-success" htmlFor="easy">
              Easy
            </label>

            <input
              type="radio"
              className="btn-check"
              name="difficulty"
              id="intermediate"
              value="intermediate"
              checked={filterDifficulty === 'intermediate'}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            />
            <label className="btn btn-outline-warning" htmlFor="intermediate">
              Intermediate
            </label>

            <input
              type="radio"
              className="btn-check"
              name="difficulty"
              id="advanced"
              value="advanced"
              checked={filterDifficulty === 'advanced'}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            />
            <label className="btn btn-outline-danger" htmlFor="advanced">
              Advanced
            </label>
          </div>
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          <h4 className="alert-heading">No Workouts Found</h4>
          <p>
            {filterDifficulty !== 'all'
              ? 'No workouts match the selected difficulty level. Try a different filter.'
              : 'There are currently no workouts available. Please check back later.'}
          </p>
        </div>
      ) : (
        <div className="row">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="col-lg-6 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{workout.name || workout.title || 'Workout'}</h5>
                  {workout.difficulty && getDifficultyBadge(workout.difficulty)}
                </div>
                <div className="card-body">
                  <p className="card-text">
                    {workout.description || 'No description available'}
                  </p>
                  <div className="row g-3">
                    {workout.duration && (
                      <div className="col-md-4">
                        <div className="text-center">
                          <span className="badge bg-info mb-2 d-block">⏱️</span>
                          <small className="text-muted d-block">Duration</small>
                          <strong>{workout.duration} min</strong>
                        </div>
                      </div>
                    )}
                    {workout.exercises && (
                      <div className="col-md-4">
                        <div className="text-center">
                          <span className="badge bg-primary mb-2 d-block">💪</span>
                          <small className="text-muted d-block">Exercises</small>
                          <strong>{workout.exercises}</strong>
                        </div>
                      </div>
                    )}
                    {workout.calories && (
                      <div className="col-md-4">
                        <div className="text-center">
                          <span className="badge bg-danger mb-2 d-block">🔥</span>
                          <small className="text-muted d-block">Calories</small>
                          <strong>{workout.calories}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-light d-flex gap-2">
                  <button className="btn btn-primary btn-sm flex-grow-1">Start</button>
                  <button className="btn btn-outline-secondary btn-sm flex-grow-1">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
