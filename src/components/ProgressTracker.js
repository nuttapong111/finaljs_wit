import React, { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { 
  ChartBarIcon,
  FireIcon,
  ClockIcon,
  TrophyIcon,
  CalendarIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const ProgressTracker = () => {
  const { 
    progress, 
    userStats, 
    addWorkoutSession, 
    updateUserStats, 
    calculateCaloriesBurned,
    getWeeklyProgress,
    getMonthlyProgress 
  } = useProgress();
  
  const { workouts } = useWorkout();
  
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [showStatsForm, setShowStatsForm] = useState(false);
  const [sessionData, setSessionData] = useState({
    workoutId: '',
    duration: 30,
    notes: '',
    completedAt: new Date().toISOString().split('T')[0]
  });
  const [statsData, setStatsData] = useState({
    weight: userStats.weight,
    height: userStats.height,
    age: userStats.age,
    activityLevel: userStats.activityLevel,
    goal: userStats.goal
  });

  const activityLevels = [
    { value: 'sedentary', label: 'นั่งทำงาน (ไม่ค่อยออกกำลังกาย)' },
    { value: 'light', label: 'ออกกำลังกายเบาๆ 1-3 ครั้ง/สัปดาห์' },
    { value: 'moderate', label: 'ออกกำลังกายปานกลาง 3-5 ครั้ง/สัปดาห์' },
    { value: 'active', label: 'ออกกำลังกายหนัก 6-7 ครั้ง/สัปดาห์' },
    { value: 'very_active', label: 'ออกกำลังกายหนักมาก 2 ครั้ง/วัน' }
  ];

  const goals = [
    { value: 'lose', label: 'ลดน้ำหนัก' },
    { value: 'maintain', label: 'รักษาน้ำหนัก' },
    { value: 'gain', label: 'เพิ่มน้ำหนัก' }
  ];

  const weeklyProgress = getWeeklyProgress();
  const monthlyProgress = getMonthlyProgress();

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    if (sessionData.workoutId) {
      const selectedWorkout = workouts.find(w => w.id === parseInt(sessionData.workoutId));
      if (selectedWorkout) {
        const caloriesBurned = calculateCaloriesBurned(selectedWorkout.exercises, sessionData.duration);
        
        addWorkoutSession({
          ...sessionData,
          workoutName: selectedWorkout.name,
          caloriesBurned,
          exercises: selectedWorkout.exercises
        });
        
        setSessionData({
          workoutId: '',
          duration: 30,
          notes: '',
          completedAt: new Date().toISOString().split('T')[0]
        });
        setShowSessionForm(false);
      }
    }
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    updateUserStats(statsData);
    setShowStatsForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getActivityLevelLabel = (level) => {
    const activity = activityLevels.find(a => a.value === level);
    return activity ? activity.label : level;
  };

  const getGoalLabel = (goal) => {
    const goalObj = goals.find(g => g.value === goal);
    return goalObj ? goalObj.label : goal;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ติดตามความก้าวหน้า</h1>
          <p className="text-gray-600 mt-2">ดูสถิติและความก้าวหน้าของคุณ</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowStatsForm(true)}
            className="btn btn-secondary"
          >
            แก้ไขข้อมูลส่วนตัว
          </button>
          <button
            onClick={() => setShowSessionForm(true)}
            className="btn btn-primary"
          >
            <PlusIcon className="w-5 h-5" />
            บันทึกเซสชั่น
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {weeklyProgress.sessions}
            </div>
            <div className="text-sm text-gray-600">เซสชั่นสัปดาห์นี้</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <FireIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {weeklyProgress.totalCalories}
            </div>
            <div className="text-sm text-gray-600">แคลอรี่เผาผลาญ (สัปดาห์)</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round(weeklyProgress.totalDuration / 60)}
            </div>
            <div className="text-sm text-gray-600">ชั่วโมงออกกำลังกาย</div>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-4">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {monthlyProgress.sessions}
            </div>
            <div className="text-sm text-gray-600">เซสชั่นรายเดือน</div>
          </div>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">ข้อมูลส่วนตัว</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">น้ำหนัก</span>
                <span className="font-semibold">{userStats.weight} กก.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ส่วนสูง</span>
                <span className="font-semibold">{userStats.height} ซม.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">อายุ</span>
                <span className="font-semibold">{userStats.age} ปี</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ระดับกิจกรรม</span>
                <span className="font-semibold text-sm">
                  {getActivityLevelLabel(userStats.activityLevel)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เป้าหมาย</span>
                <span className="font-semibold">{getGoalLabel(userStats.goal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">สถิติรายเดือน</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">เซสชั่นทั้งหมด</span>
                <span className="font-semibold">{monthlyProgress.sessions} ครั้ง</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">แคลอรี่เผาผลาญ</span>
                <span className="font-semibold">{monthlyProgress.totalCalories} แคล</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เวลาออกกำลังกาย</span>
                <span className="font-semibold">{Math.round(monthlyProgress.totalDuration / 60)} ชม.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">เฉลี่ยต่อเซสชั่น</span>
                <span className="font-semibold">{monthlyProgress.averageCaloriesPerSession} แคล</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">เซสชั่นล่าสุด</h3>
        </div>
        <div className="card-body">
          {progress.length > 0 ? (
            <div className="space-y-4">
              {progress.slice(0, 10).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{session.workoutName}</h4>
                    <p className="text-sm text-gray-600">{formatDate(session.completedAt)}</p>
                    {session.notes && (
                      <p className="text-sm text-gray-500 mt-1">{session.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{session.duration} นาที</div>
                      <div className="text-gray-500">เวลา</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{session.caloriesBurned}</div>
                      <div className="text-gray-500">แคลอรี่</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{session.exercises.length}</div>
                      <div className="text-gray-500">ท่า</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ยังไม่มีเซสชั่นออกกำลังกาย
              </h3>
              <p className="text-gray-600 mb-6">
                เริ่มบันทึกเซสชั่นออกกำลังกายของคุณ
              </p>
              <button
                onClick={() => setShowSessionForm(true)}
                className="btn btn-primary"
              >
                <PlusIcon className="w-5 h-5" />
                บันทึกเซสชั่น
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Session Modal */}
      {showSessionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <form onSubmit={handleSessionSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">บันทึกเซสชั่นออกกำลังกาย</h2>
                <button
                  type="button"
                  onClick={() => setShowSessionForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">โปรแกรมออกกำลังกาย</label>
                  <select
                    value={sessionData.workoutId}
                    onChange={(e) => setSessionData({...sessionData, workoutId: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">เลือกโปรแกรม</option>
                    {workouts.map(workout => (
                      <option key={workout.id} value={workout.id}>
                        {workout.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">วันที่ออกกำลังกาย</label>
                  <input
                    type="date"
                    value={sessionData.completedAt}
                    onChange={(e) => setSessionData({...sessionData, completedAt: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ระยะเวลา (นาที)</label>
                  <input
                    type="number"
                    value={sessionData.duration}
                    onChange={(e) => setSessionData({...sessionData, duration: parseInt(e.target.value)})}
                    className="form-input"
                    min="1"
                    max="300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">หมายเหตุ (ไม่บังคับ)</label>
                  <textarea
                    value={sessionData.notes}
                    onChange={(e) => setSessionData({...sessionData, notes: e.target.value})}
                    className="form-input"
                    rows="3"
                    placeholder="เพิ่มหมายเหตุเกี่ยวกับเซสชั่นนี้..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowSessionForm(false)}
                  className="btn btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <CheckIcon className="w-4 h-4" />
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Stats Modal */}
      {showStatsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <form onSubmit={handleStatsSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">แก้ไขข้อมูลส่วนตัว</h2>
                <button
                  type="button"
                  onClick={() => setShowStatsForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">น้ำหนัก (กก.)</label>
                    <input
                      type="number"
                      value={statsData.weight}
                      onChange={(e) => setStatsData({...statsData, weight: parseFloat(e.target.value)})}
                      className="form-input"
                      min="30"
                      max="200"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ส่วนสูง (ซม.)</label>
                    <input
                      type="number"
                      value={statsData.height}
                      onChange={(e) => setStatsData({...statsData, height: parseInt(e.target.value)})}
                      className="form-input"
                      min="100"
                      max="250"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">อายุ (ปี)</label>
                  <input
                    type="number"
                    value={statsData.age}
                    onChange={(e) => setStatsData({...statsData, age: parseInt(e.target.value)})}
                    className="form-input"
                    min="10"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ระดับกิจกรรม</label>
                  <select
                    value={statsData.activityLevel}
                    onChange={(e) => setStatsData({...statsData, activityLevel: e.target.value})}
                    className="form-select"
                    required
                  >
                    {activityLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">เป้าหมาย</label>
                  <select
                    value={statsData.goal}
                    onChange={(e) => setStatsData({...statsData, goal: e.target.value})}
                    className="form-select"
                    required
                  >
                    {goals.map(goal => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowStatsForm(false)}
                  className="btn btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <CheckIcon className="w-4 h-4" />
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
