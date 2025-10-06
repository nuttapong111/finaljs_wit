import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WorkoutContext = createContext();

const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_WORKOUTS':
      return { ...state, workouts: action.payload };
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] };
    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map(workout =>
          workout.id === action.payload.id ? action.payload : workout
        )
      };
    case 'DELETE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.filter(workout => workout.id !== action.payload)
      };
    case 'SET_EXERCISES':
      return { ...state, exercises: action.payload };
    case 'SET_FILTERED_EXERCISES':
      return { ...state, filteredExercises: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_MUSCLE_GROUP':
      return { ...state, selectedMuscleGroup: action.payload };
    default:
      return state;
  }
};

const initialState = {
  workouts: [],
  exercises: [],
  filteredExercises: [],
  loading: false,
  searchTerm: '',
  selectedMuscleGroup: 'all'
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // Load workouts from localStorage on mount
  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitness-workouts');
    if (savedWorkouts) {
      dispatch({ type: 'SET_WORKOUTS', payload: JSON.parse(savedWorkouts) });
    }
  }, []);

  // Save workouts to localStorage whenever workouts change
  useEffect(() => {
    localStorage.setItem('fitness-workouts', JSON.stringify(state.workouts));
  }, [state.workouts]);

  // Load exercises from API
  useEffect(() => {
    const loadExercises = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        // Mock exercise data - in real app, this would be from an API
        const mockExercises = [
          {
            id: 1,
            name: 'Push-ups',
            muscleGroup: 'chest',
            equipment: 'bodyweight',
            instructions: 'Start in plank position, lower body to ground, push back up',
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            caloriesPerMinute: 8
          },
          {
            id: 2,
            name: 'Squats',
            muscleGroup: 'legs',
            equipment: 'bodyweight',
            instructions: 'Stand with feet shoulder-width apart, lower into squat position, return to standing',
            videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ',
            caloriesPerMinute: 10
          },
          {
            id: 3,
            name: 'Plank',
            muscleGroup: 'core',
            equipment: 'bodyweight',
            instructions: 'Hold plank position with straight body line',
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            caloriesPerMinute: 5
          },
          {
            id: 4,
            name: 'Pull-ups',
            muscleGroup: 'back',
            equipment: 'pull-up bar',
            instructions: 'Hang from bar, pull body up until chin over bar, lower slowly',
            videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
            caloriesPerMinute: 12
          },
          {
            id: 5,
            name: 'Lunges',
            muscleGroup: 'legs',
            equipment: 'bodyweight',
            instructions: 'Step forward into lunge position, return to starting position',
            videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
            caloriesPerMinute: 9
          },
          {
            id: 6,
            name: 'Burpees',
            muscleGroup: 'full body',
            equipment: 'bodyweight',
            instructions: 'Squat down, jump back to plank, do push-up, jump forward, jump up',
            videoUrl: 'https://www.youtube.com/watch?v=TU8QYVW0gDU',
            caloriesPerMinute: 15
          }
        ];
        
        dispatch({ type: 'SET_EXERCISES', payload: mockExercises });
        dispatch({ type: 'SET_FILTERED_EXERCISES', payload: mockExercises });
      } catch (error) {
        console.error('Error loading exercises:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadExercises();
  }, []);

  // Filter exercises based on search term and muscle group
  useEffect(() => {
    let filtered = state.exercises;

    if (state.searchTerm) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        exercise.muscleGroup.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }

    if (state.selectedMuscleGroup !== 'all') {
      filtered = filtered.filter(exercise =>
        exercise.muscleGroup === state.selectedMuscleGroup
      );
    }

    dispatch({ type: 'SET_FILTERED_EXERCISES', payload: filtered });
  }, [state.exercises, state.searchTerm, state.selectedMuscleGroup]);

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_WORKOUT', payload: newWorkout });
  };

  const updateWorkout = (workout) => {
    dispatch({ type: 'UPDATE_WORKOUT', payload: workout });
  };

  const deleteWorkout = (workoutId) => {
    dispatch({ type: 'DELETE_WORKOUT', payload: workoutId });
  };

  const searchExercises = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const filterByMuscleGroup = (muscleGroup) => {
    dispatch({ type: 'SET_SELECTED_MUSCLE_GROUP', payload: muscleGroup });
  };

  const value = {
    ...state,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchExercises,
    filterByMuscleGroup
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
