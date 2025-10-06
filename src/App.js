import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WorkoutProvider } from './contexts/WorkoutContext';
import { ProgressProvider } from './contexts/ProgressContext';
import Header from './components/Header';
import Home from './components/Home';
import WorkoutPlanner from './components/WorkoutPlanner';
import ExerciseLibrary from './components/ExerciseLibrary';
import ProgressTracker from './components/ProgressTracker';
import CalorieCalculator from './components/CalorieCalculator';
import './App.css';

function App() {
  return (
    <WorkoutProvider>
      <ProgressProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/planner" element={<WorkoutPlanner />} />
                <Route path="/exercises" element={<ExerciseLibrary />} />
                <Route path="/progress" element={<ProgressTracker />} />
                <Route path="/calculator" element={<CalorieCalculator />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ProgressProvider>
    </WorkoutProvider>
  );
}

export default App;