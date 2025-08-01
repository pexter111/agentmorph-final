import React from 'react';
import { useApp } from '../../context/AppContext';
import ProgressWorkflow from './ProgressWorkflow';
import SkillGapCard from './SkillGapCard';
import LearningPathCard from './LearningPathCard';
import { ClockIcon, TrophyIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Dashboard: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const stats = [
    {
      name: 'Hours Completed',
      value: currentUser.currentPath ? Math.round(currentUser.currentPath.estimatedHours * (currentUser.currentPath.progress / 100)) : 0,
      icon: ClockIcon,
      color: 'text-blue-600'
    },
    {
      name: 'Skill Gaps Identified',
      value: currentUser.skillGaps.length,
      icon: MagnifyingGlassIcon,
      color: 'text-purple-600'
    },
    {
      name: 'Completion Rate',
      value: `${currentUser.completionRate}%`,
      icon: TrophyIcon,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {isNewUser ? 'Complete your assessment to get personalized recommendations' : 'Continue your personalized learning journey'}
        </p>
      </div>

      {/* New User Welcome Message */}
      {isNewUser && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-200 animate-slide-up">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">👋</span>
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-blue-900">Welcome to Hexaware Learning!</h3>
              <p className="text-blue-700 mt-1">
                Your profile has been successfully created. Take your first assessment to get personalized learning recommendations based on your skills and career goals.
              </p>
              <button 
                onClick={() => window.location.href = '/assessments'}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Your Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-gray-50`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Workflow */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
        <ProgressWorkflow user={currentUser} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Learning Path */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Learning Path</h2>
          {currentUser.currentPath ? (
            <LearningPathCard path={currentUser.currentPath} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500 mb-4">No active learning path. Complete your assessment to get recommendations.</p>
              <div className="text-sm text-gray-400">
                <p><strong>Status:</strong> Not Started</p>
                <p><strong>Estimated Time:</strong> TBD</p>
                <p><strong>Completion:</strong> 0%</p>
              </div>
            </div>
          )}
        </div>

        {/* Skill Gaps */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Priority Skill Gaps</h2>
          <div className="space-y-4">
            {currentUser.skillGaps.slice(0, 3).map((gap) => (
              <SkillGapCard key={gap.id} skillGap={gap} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;