import React, { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { 
  CalculatorIcon,
  FireIcon,
  HeartIcon,
  ScaleIcon,
  ChartBarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const CalorieCalculator = () => {
  const { userStats, calculateBMR, calculateTDEE, calculateBMI } = useProgress();
  const [formData, setFormData] = useState({
    weight: userStats.weight,
    height: userStats.height,
    age: userStats.age,
    gender: 'male',
    activityLevel: userStats.activityLevel,
    goal: userStats.goal
  });
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const activityLevels = [
    { value: 'sedentary', label: 'นั่งทำงาน', multiplier: 1.2, description: 'ไม่ค่อยออกกำลังกาย' },
    { value: 'light', label: 'ออกกำลังกายเบาๆ', multiplier: 1.375, description: '1-3 ครั้ง/สัปดาห์' },
    { value: 'moderate', label: 'ออกกำลังกายปานกลาง', multiplier: 1.55, description: '3-5 ครั้ง/สัปดาห์' },
    { value: 'active', label: 'ออกกำลังกายหนัก', multiplier: 1.725, description: '6-7 ครั้ง/สัปดาห์' },
    { value: 'very_active', label: 'ออกกำลังกายหนักมาก', multiplier: 1.9, description: '2 ครั้ง/วัน' }
  ];

  const goals = [
    { value: 'lose', label: 'ลดน้ำหนัก', deficit: 500 },
    { value: 'maintain', label: 'รักษาน้ำหนัก', deficit: 0 },
    { value: 'gain', label: 'เพิ่มน้ำหนัก', deficit: -500 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateCalories = () => {
    const bmr = calculateBMR(formData.weight, formData.height, formData.age, formData.gender);
    const tdee = calculateTDEE(bmr, formData.activityLevel);
    const bmi = calculateBMI(formData.weight, formData.height);
    
    const selectedGoal = goals.find(g => g.value === formData.goal);
    const targetCalories = tdee - selectedGoal.deficit;
    
    const proteinNeeds = Math.round(formData.weight * 1.6); // 1.6g per kg
    const carbNeeds = Math.round((targetCalories * 0.45) / 4); // 45% of calories from carbs
    const fatNeeds = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fat

    setResults({
      bmr,
      tdee,
      bmi,
      targetCalories,
      proteinNeeds,
      carbNeeds,
      fatNeeds,
      goal: selectedGoal
    });
    setShowResults(true);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'น้ำหนักน้อย', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (bmi < 23) return { category: 'น้ำหนักปกติ', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmi < 25) return { category: 'น้ำหนักเกิน', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (bmi < 30) return { category: 'อ้วนระดับ 1', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { category: 'อ้วนระดับ 2', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getActivityLevelInfo = (level) => {
    return activityLevels.find(a => a.value === level) || activityLevels[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">คำนวณแคลอรี่</h1>
        <p className="text-gray-600 mt-2">คำนวณแคลอรี่ที่ร่างกายต้องการและแคลอรี่ที่ควรบริโภค</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">ข้อมูลส่วนตัว</h2>
            <p className="card-description">กรอกข้อมูลเพื่อคำนวณแคลอรี่ที่เหมาะสม</p>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => { e.preventDefault(); calculateCalories(); }} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">น้ำหนัก (กก.)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
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
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="form-input"
                    min="100"
                    max="250"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">อายุ (ปี)</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="form-input"
                    min="10"
                    max="100"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">เพศ</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </div>
              </div>

              {/* Activity Level */}
              <div className="form-group">
                <label className="form-label">ระดับกิจกรรม</label>
                <div className="space-y-3">
                  {activityLevels.map((level) => (
                    <label key={level.value} className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="activityLevel"
                        value={level.value}
                        checked={formData.activityLevel === level.value}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{level.label}</div>
                        <div className="text-sm text-gray-500">{level.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="form-group">
                <label className="form-label">เป้าหมาย</label>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <label key={goal.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="goal"
                        value={goal.value}
                        checked={formData.goal === goal.value}
                        onChange={handleInputChange}
                      />
                      <span className="font-medium text-gray-900">{goal.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                <CalculatorIcon className="w-5 h-5" />
                คำนวณแคลอรี่
              </button>
            </form>
          </div>
        </div>

        {/* Results */}
        {showResults && results && (
          <div className="space-y-6">
            {/* BMI Card */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ดัชนีมวลกาย (BMI)</h3>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {results.bmi}
                  </div>
                  <div className={`badge ${getBMICategory(results.bmi).bgColor} ${getBMICategory(results.bmi).color}`}>
                    {getBMICategory(results.bmi).category}
                  </div>
                </div>
              </div>
            </div>

            {/* Calorie Needs */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ความต้องการแคลอรี่</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
                      <span className="text-gray-600">BMR (แคลอรี่พื้นฐาน)</span>
                    </div>
                    <span className="font-semibold">{Math.round(results.bmr)} แคล</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FireIcon className="w-5 h-5 text-orange-500 mr-2" />
                      <span className="text-gray-600">TDEE (แคลอรี่รวม)</span>
                    </div>
                    <span className="font-semibold">{Math.round(results.tdee)} แคล</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ScaleIcon className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="text-gray-600">แคลอรี่เป้าหมาย</span>
                    </div>
                    <span className="font-semibold text-lg">{Math.round(results.targetCalories)} แคล</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Macronutrients */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">สารอาหารหลักที่แนะนำ</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">โปรตีน</span>
                    <span className="font-semibold">{results.proteinNeeds} กรัม</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">คาร์โบไฮเดรต</span>
                    <span className="font-semibold">{results.carbNeeds} กรัม</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ไขมัน</span>
                    <span className="font-semibold">{results.fatNeeds} กรัม</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Info */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">ข้อมูลเป้าหมาย</h3>
              </div>
              <div className="card-body">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <InformationCircleIcon className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">
                        เป้าหมาย: {results.goal.label}
                      </h4>
                      <p className="text-sm text-blue-700">
                        {results.goal.deficit > 0 
                          ? `ควรบริโภคน้อยกว่า TDEE ${results.goal.deficit} แคลอรี่ต่อวัน เพื่อลดน้ำหนัก 0.5 กก./สัปดาห์`
                          : results.goal.deficit < 0
                          ? `ควรบริโภคมากกว่า TDEE ${Math.abs(results.goal.deficit)} แคลอรี่ต่อวัน เพื่อเพิ่มน้ำหนัก 0.5 กก./สัปดาห์`
                          : 'ควรบริโภคเท่ากับ TDEE เพื่อรักษาน้ำหนักปัจจุบัน'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!showResults && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">วิธีใช้งาน</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">กรอกข้อมูลส่วนตัว</h4>
                    <p className="text-sm text-gray-600">น้ำหนัก, ส่วนสูง, อายุ, เพศ และระดับกิจกรรม</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">เลือกเป้าหมาย</h4>
                    <p className="text-sm text-gray-600">ลดน้ำหนัก, รักษาน้ำหนัก หรือเพิ่มน้ำหนัก</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ดูผลลัพธ์</h4>
                    <p className="text-sm text-gray-600">รับคำแนะนำแคลอรี่และสารอาหารที่เหมาะสม</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieCalculator;
