import React from 'react';
import { Link } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { useWorkout } from '../contexts/WorkoutContext';
import { 
  CalendarIcon, 
  BookOpenIcon, 
  ChartBarIcon, 
  CalculatorIcon,
  FireIcon,
  ClockIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { getWeeklyProgress, getMonthlyProgress, userStats } = useProgress();
  const { workouts } = useWorkout();
  
  const weeklyProgress = getWeeklyProgress();
  const monthlyProgress = getMonthlyProgress();

  const features = [
    {
      title: 'วางแผนออกกำลังกาย',
      description: 'สร้างโปรแกรมออกกำลังกายที่เหมาะกับคุณ',
      icon: CalendarIcon,
      href: '/planner',
      color: 'bg-blue-500'
    },
    {
      title: 'คลังท่าออกกำลังกาย',
      description: 'ค้นหาและเรียนรู้ท่าออกกำลังกายใหม่ๆ',
      icon: BookOpenIcon,
      href: '/exercises',
      color: 'bg-green-500'
    },
    {
      title: 'ติดตามความก้าวหน้า',
      description: 'ดูสถิติและความก้าวหน้าของคุณ',
      icon: ChartBarIcon,
      href: '/progress',
      color: 'bg-purple-500'
    },
    {
      title: 'คำนวณแคลอรี่',
      description: 'คำนวณแคลอรี่ที่เผาผลาญและต้องการ',
      icon: CalculatorIcon,
      href: '/calculator',
      color: 'bg-orange-500'
    }
  ];

  const stats = [
    {
      name: 'โปรแกรมออกกำลังกาย',
      value: workouts.length,
      icon: CalendarIcon,
      color: 'text-blue-600'
    },
    {
      name: 'เซสชั่นสัปดาห์นี้',
      value: weeklyProgress.sessions,
      icon: ClockIcon,
      color: 'text-green-600'
    },
    {
      name: 'แคลอรี่เผาผลาญ (สัปดาห์)',
      value: weeklyProgress.totalCalories,
      icon: FireIcon,
      color: 'text-red-600'
    },
    {
      name: 'เวลาออกกำลังกาย (ชม.)',
      value: Math.round(weeklyProgress.totalDuration / 60),
      icon: TrophyIcon,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ยินดีต้อนรับสู่ Fitness Planner
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          แอปพลิเคชันวางแผนออกกำลังกายที่ช่วยให้คุณบรรลุเป้าหมายด้านสุขภาพและฟิตเนส
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/planner"
            className="btn btn-primary text-lg px-8 py-3"
          >
            เริ่มวางแผนออกกำลังกาย
          </Link>
          <Link
            to="/exercises"
            className="btn btn-outline text-lg px-8 py-3"
          >
            ดูท่าออกกำลังกาย
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="card text-center">
              <div className="card-body">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          ฟีเจอร์หลัก
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.href}
                className="card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="card-body text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      {(weeklyProgress.sessions > 0 || monthlyProgress.sessions > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">ความก้าวหน้าสัปดาห์นี้</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">เซสชั่นออกกำลังกาย</span>
                  <span className="font-semibold">{weeklyProgress.sessions} ครั้ง</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">แคลอรี่เผาผลาญ</span>
                  <span className="font-semibold">{weeklyProgress.totalCalories} แคลอรี่</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">เวลาออกกำลังกาย</span>
                  <span className="font-semibold">{Math.round(weeklyProgress.totalDuration / 60)} ชั่วโมง</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">ความก้าวหน้ารายเดือน</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">เซสชั่นออกกำลังกาย</span>
                  <span className="font-semibold">{monthlyProgress.sessions} ครั้ง</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">แคลอรี่เผาผลาญ</span>
                  <span className="font-semibold">{monthlyProgress.totalCalories} แคลอรี่</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">เวลาออกกำลังกาย</span>
                  <span className="font-semibold">{Math.round(monthlyProgress.totalDuration / 60)} ชั่วโมง</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          พร้อมเริ่มต้นการเดินทางสู่สุขภาพที่ดีแล้วหรือยัง?
        </h2>
        <p className="text-gray-600 mb-6">
          สร้างโปรแกรมออกกำลังกายที่เหมาะกับไลฟ์สไตล์ของคุณ และติดตามความก้าวหน้าได้ทุกวัน
        </p>
        <Link
          to="/planner"
          className="btn btn-primary text-lg px-8 py-3"
        >
          เริ่มต้นตอนนี้
        </Link>
      </div>
    </div>
  );
};

export default Home;
