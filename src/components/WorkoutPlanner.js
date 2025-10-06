import React, { useState } from 'react';
import { useWorkout } from '../contexts/WorkoutContext';
import { 
  PlusIcon, 
  TrashIcon, 
  PlayIcon,
  ClockIcon,
  FireIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const WorkoutPlanner = () => {
  const { workouts, exercises, addWorkout, deleteWorkout } = useWorkout();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: [],
    duration: 30,
    difficulty: 'beginner'
  });
  const [selectedExercise, setSelectedExercise] = useState('');
  const [exerciseSets, setExerciseSets] = useState('');
  const [exerciseReps, setExerciseReps] = useState('');

  const difficultyLevels = [
    { value: 'beginner', label: 'เริ่มต้น', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'ปานกลาง', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'ขั้นสูง', color: 'bg-red-100 text-red-800' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddExercise = () => {
    if (selectedExercise && exerciseSets && exerciseReps) {
      const exercise = exercises.find(ex => ex.id === parseInt(selectedExercise));
      if (exercise) {
        const newExercise = {
          ...exercise,
          sets: parseInt(exerciseSets),
          reps: parseInt(exerciseReps)
        };
        
        setFormData(prev => ({
          ...prev,
          exercises: [...prev.exercises, newExercise]
        }));
        
        setSelectedExercise('');
        setExerciseSets('');
        setExerciseReps('');
      }
    }
  };

  const handleRemoveExercise = (index) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.exercises.length > 0) {
      addWorkout(formData);
      setFormData({
        name: '',
        description: '',
        exercises: [],
        duration: 30,
        difficulty: 'beginner'
      });
      setShowForm(false);
    }
  };

  const calculateTotalCalories = (workout) => {
    const totalCaloriesPerMinute = workout.exercises.reduce((total, exercise) => {
      return total + (exercise.caloriesPerMinute || 0);
    }, 0);
    
    const averageCaloriesPerMinute = workout.exercises.length > 0 ? 
      totalCaloriesPerMinute / workout.exercises.length : 0;
    
    return Math.round(averageCaloriesPerMinute * workout.duration);
  };

  const getDifficultyInfo = (difficulty) => {
    return difficultyLevels.find(level => level.value === difficulty) || difficultyLevels[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">วางแผนออกกำลังกาย</h1>
          <p className="text-gray-600 mt-2">สร้างโปรแกรมออกกำลังกายที่เหมาะกับคุณ</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary"
        >
          <PlusIcon className="w-5 h-5" />
          สร้างโปรแกรมใหม่
        </button>
      </div>

      {/* Workout List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {workouts.map((workout) => {
          const difficultyInfo = getDifficultyInfo(workout.difficulty);
          const totalCalories = calculateTotalCalories(workout);
          
          return (
            <div key={workout.id} className="card">
              <div className="card-header">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="card-title">{workout.name}</h3>
                    <p className="card-description">{workout.description}</p>
                  </div>
                  <button
                    onClick={() => deleteWorkout(workout.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="card-body">
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center text-gray-500 mb-1">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">เวลา</span>
                      </div>
                      <div className="font-semibold">{workout.duration} นาที</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-gray-500 mb-1">
                        <FireIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">แคลอรี่</span>
                      </div>
                      <div className="font-semibold">{totalCalories}</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center text-gray-500 mb-1">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">ท่า</span>
                      </div>
                      <div className="font-semibold">{workout.exercises.length}</div>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-center">
                    <span className={`badge ${difficultyInfo.color}`}>
                      {difficultyInfo.label}
                    </span>
                  </div>

                  {/* Exercises List */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">ท่าออกกำลังกาย:</h4>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-700">{exercise.name}</span>
                          <span className="text-gray-500">
                            {exercise.sets} x {exercise.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="btn btn-primary w-full">
                    <PlayIcon className="w-4 h-4" />
                    เริ่มออกกำลังกาย
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {workouts.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ยังไม่มีโปรแกรมออกกำลังกาย
          </h3>
          <p className="text-gray-600 mb-6">
            เริ่มสร้างโปรแกรมออกกำลังกายแรกของคุณ
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="w-5 h-5" />
            สร้างโปรแกรมใหม่
          </button>
        </div>
      )}

      {/* Create Workout Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">สร้างโปรแกรมออกกำลังกาย</h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">ชื่อโปรแกรม</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="เช่น โปรแกรมเริ่มต้น"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ระดับความยาก</label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {difficultyLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">คำอธิบาย</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                    placeholder="อธิบายเกี่ยวกับโปรแกรมนี้..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ระยะเวลา (นาที)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="form-input"
                    min="5"
                    max="180"
                  />
                </div>

                {/* Add Exercise */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">เพิ่มท่าออกกำลังกาย</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="form-group">
                      <label className="form-label">ท่าออกกำลังกาย</label>
                      <select
                        value={selectedExercise}
                        onChange={(e) => setSelectedExercise(e.target.value)}
                        className="form-select"
                      >
                        <option value="">เลือกท่า</option>
                        {exercises.map(exercise => (
                          <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">เซ็ต</label>
                      <input
                        type="number"
                        value={exerciseSets}
                        onChange={(e) => setExerciseSets(e.target.value)}
                        className="form-input"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">ครั้ง</label>
                      <input
                        type="number"
                        value={exerciseReps}
                        onChange={(e) => setExerciseReps(e.target.value)}
                        className="form-input"
                        min="1"
                        max="100"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">&nbsp;</label>
                      <button
                        type="button"
                        onClick={handleAddExercise}
                        className="btn btn-secondary w-full"
                      >
                        <PlusIcon className="w-4 h-4" />
                        เพิ่ม
                      </button>
                    </div>
                  </div>

                  {/* Selected Exercises */}
                  {formData.exercises.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">ท่าที่เลือก:</h4>
                      {formData.exercises.map((exercise, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <div>
                            <span className="font-medium">{exercise.name}</span>
                            <span className="text-gray-500 ml-2">
                              ({exercise.muscleGroup})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">
                              {exercise.sets} x {exercise.reps}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExercise(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formData.name || formData.exercises.length === 0}
                >
                  สร้างโปรแกรม
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;
