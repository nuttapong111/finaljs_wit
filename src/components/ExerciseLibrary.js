import React, { useState } from 'react';
import { useWorkout } from '../contexts/WorkoutContext';
import { 
  MagnifyingGlassIcon,
  PlayIcon,
  FireIcon,
  ClockIcon,
  EyeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ExerciseLibrary = () => {
  const { 
    filteredExercises, 
    loading, 
    searchTerm, 
    selectedMuscleGroup, 
    searchExercises, 
    filterByMuscleGroup 
  } = useWorkout();
  
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  const muscleGroups = [
    { value: 'all', label: 'ทั้งหมด' },
    { value: 'chest', label: 'หน้าอก' },
    { value: 'back', label: 'หลัง' },
    { value: 'legs', label: 'ขา' },
    { value: 'arms', label: 'แขน' },
    { value: 'core', label: 'แกนกลาง' },
    { value: 'shoulders', label: 'ไหล่' },
    { value: 'full body', label: 'ทั้งตัว' }
  ];

  const equipmentTypes = [
    { value: 'bodyweight', label: 'น้ำหนักตัว' },
    { value: 'dumbbells', label: 'ดัมเบล' },
    { value: 'barbell', label: 'บาร์เบล' },
    { value: 'kettlebell', label: 'เคตเทิลเบล' },
    { value: 'resistance band', label: 'ยางยืด' },
    { value: 'pull-up bar', label: 'บาร์โหน' },
    { value: 'machine', label: 'เครื่องออกกำลังกาย' }
  ];

  const getEquipmentLabel = (equipment) => {
    const equipmentType = equipmentTypes.find(type => type.value === equipment);
    return equipmentType ? equipmentType.label : equipment;
  };

  const getMuscleGroupLabel = (muscleGroup) => {
    const group = muscleGroups.find(group => group.value === muscleGroup);
    return group ? group.label : muscleGroup;
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleWatchVideo = (exercise) => {
    setSelectedExercise(exercise);
    setShowVideo(true);
  };

  const closeModal = () => {
    setSelectedExercise(null);
    setShowVideo(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">คลังท่าออกกำลังกาย</h1>
        <p className="text-gray-600 mt-2">ค้นหาและเรียนรู้ท่าออกกำลังกายใหม่ๆ</p>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="form-group">
              <label className="form-label">ค้นหาท่าออกกำลังกาย</label>
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => searchExercises(e.target.value)}
                  className="form-input pl-10"
                  placeholder="พิมพ์ชื่อท่าหรือกลุ่มกล้ามเนื้อ..."
                />
              </div>
            </div>

            {/* Muscle Group Filter */}
            <div className="form-group">
              <label className="form-label">กลุ่มกล้ามเนื้อ</label>
              <select
                value={selectedMuscleGroup}
                onChange={(e) => filterByMuscleGroup(e.target.value)}
                className="form-select"
              >
                {muscleGroups.map(group => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="loading mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดท่าออกกำลังกาย...</p>
        </div>
      )}

      {/* Exercise Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <div key={exercise.id} className="card group hover:shadow-lg transition-all duration-300">
              <div className="card-body">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="card-title group-hover:text-blue-600 transition-colors">
                      {exercise.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {getMuscleGroupLabel(exercise.muscleGroup)}
                    </p>
                  </div>
                  <span className="badge badge-primary">
                    {getEquipmentLabel(exercise.equipment)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {exercise.instructions}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FireIcon className="w-4 h-4 mr-1" />
                    <span>{exercise.caloriesPerMinute} แคล/นาที</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>1 นาที</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExerciseClick(exercise)}
                    className="btn btn-secondary flex-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    ดูรายละเอียด
                  </button>
                  <button
                    onClick={() => handleWatchVideo(exercise)}
                    className="btn btn-primary"
                  >
                    <PlayIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            ไม่พบท่าออกกำลังกาย
          </h3>
          <p className="text-gray-600 mb-6">
            ลองเปลี่ยนคำค้นหาหรือเลือกกลุ่มกล้ามเนื้ออื่น
          </p>
          <button
            onClick={() => {
              searchExercises('');
              filterByMuscleGroup('all');
            }}
            className="btn btn-primary"
          >
            รีเซ็ตการค้นหา
          </button>
        </div>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && !showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h2>
                  <p className="text-gray-600">{getMuscleGroupLabel(selectedExercise.muscleGroup)}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">อุปกรณ์</h3>
                    <p className="text-gray-600">{getEquipmentLabel(selectedExercise.equipment)}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">แคลอรี่</h3>
                    <p className="text-gray-600">{selectedExercise.caloriesPerMinute} แคล/นาที</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">วิธีทำ</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedExercise.instructions}</p>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowVideo(true)}
                    className="btn btn-primary"
                  >
                    <PlayIcon className="w-4 h-4" />
                    ดูวิดีโอ
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn btn-secondary"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideo && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExercise.name}</h2>
                  <p className="text-gray-600">วิดีโอสาธิต</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <PlayIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">วิดีโอสาธิต</p>
                  <a
                    href={selectedExercise.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    เปิดใน YouTube
                  </a>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowVideo(false)}
                  className="btn btn-secondary"
                >
                  กลับไปดูรายละเอียด
                </button>
                <button
                  onClick={closeModal}
                  className="btn btn-primary"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;
