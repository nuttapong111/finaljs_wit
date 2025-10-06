import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProgressContext = createContext();

const progressReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'ADD_WORKOUT_SESSION':
      return { ...state, progress: [...state.progress, action.payload] };
    case 'UPDATE_WORKOUT_SESSION':
      return {
        ...state,
        progress: state.progress.map(session =>
          session.id === action.payload.id ? action.payload : session
        )
      };
    case 'DELETE_WORKOUT_SESSION':
      return {
        ...state,
        progress: state.progress.filter(session => session.id !== action.payload)
      };
    case 'SET_USER_STATS':
      return { ...state, userStats: action.payload };
    case 'UPDATE_USER_STATS':
      return { ...state, userStats: { ...state.userStats, ...action.payload } };
    default:
      return state;
  }
};

const initialState = {
  progress: [],
  userStats: {
    weight: 70,
    height: 170,
    age: 25,
    activityLevel: 'moderate',
    goal: 'maintain'
  },
  loading: false
};

export const ProgressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(progressReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('fitness-progress');
    const savedUserStats = localStorage.getItem('fitness-user-stats');
    
    if (savedProgress) {
      dispatch({ type: 'SET_PROGRESS', payload: JSON.parse(savedProgress) });
    }
    
    if (savedUserStats) {
      dispatch({ type: 'SET_USER_STATS', payload: JSON.parse(savedUserStats) });
    }
  }, []);

  // Save progress to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem('fitness-progress', JSON.stringify(state.progress));
  }, [state.progress]);

  // Save user stats to localStorage whenever user stats change
  useEffect(() => {
    localStorage.setItem('fitness-user-stats', JSON.stringify(state.userStats));
  }, [state.userStats]);

  const addWorkoutSession = (session) => {
    const newSession = {
      ...session,
      id: Date.now(),
      completedAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_WORKOUT_SESSION', payload: newSession });
  };

  const updateWorkoutSession = (session) => {
    dispatch({ type: 'UPDATE_WORKOUT_SESSION', payload: session });
  };

  const deleteWorkoutSession = (sessionId) => {
    dispatch({ type: 'DELETE_WORKOUT_SESSION', payload: sessionId });
  };

  const updateUserStats = (stats) => {
    dispatch({ type: 'UPDATE_USER_STATS', payload: stats });
  };

  // Calculate calories burned for a workout session
  const calculateCaloriesBurned = (exercises, duration) => {
    const totalCaloriesPerMinute = exercises.reduce((total, exercise) => {
      return total + (exercise.caloriesPerMinute || 0);
    }, 0);
    
    return Math.round((totalCaloriesPerMinute / exercises.length) * duration);
  };

  // Calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
  const calculateBMR = (weight, height, age, gender = 'male') => {
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = (bmr, activityLevel) => {
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };
    
    return Math.round(bmr * activityMultipliers[activityLevel] || 1.55);
  };

  // Get weekly progress summary
  const getWeeklyProgress = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const weeklySessions = state.progress.filter(session => 
      new Date(session.completedAt) >= oneWeekAgo
    );
    
    const totalCalories = weeklySessions.reduce((total, session) => 
      total + (session.caloriesBurned || 0), 0
    );
    
    const totalDuration = weeklySessions.reduce((total, session) => 
      total + (session.duration || 0), 0
    );
    
    return {
      sessions: weeklySessions.length,
      totalCalories,
      totalDuration,
      averageCaloriesPerSession: weeklySessions.length > 0 ? 
        Math.round(totalCalories / weeklySessions.length) : 0
    };
  };

  // Get monthly progress summary
  const getMonthlyProgress = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const monthlySessions = state.progress.filter(session => 
      new Date(session.completedAt) >= oneMonthAgo
    );
    
    const totalCalories = monthlySessions.reduce((total, session) => 
      total + (session.caloriesBurned || 0), 0
    );
    
    const totalDuration = monthlySessions.reduce((total, session) => 
      total + (session.duration || 0), 0
    );
    
    return {
      sessions: monthlySessions.length,
      totalCalories,
      totalDuration,
      averageCaloriesPerSession: monthlySessions.length > 0 ? 
        Math.round(totalCalories / monthlySessions.length) : 0
    };
  };

  const value = {
    ...state,
    addWorkoutSession,
    updateWorkoutSession,
    deleteWorkoutSession,
    updateUserStats,
    calculateCaloriesBurned,
    calculateBMI,
    calculateBMR,
    calculateTDEE,
    getWeeklyProgress,
    getMonthlyProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
