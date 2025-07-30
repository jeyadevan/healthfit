import DailyCheckin from '@/components/DailyCheckin';
import HealthDisplay from '@/components/HealthDisplay';
import ConsistencyGrid from '@/components/ConsistencyGrid';
import ProgressStats from '@/components/ProgressStats';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Track your fitness journey and maintain consistency
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Check-in */}
          <div className="lg:col-span-1">
            <DailyCheckin />
          </div>

          {/* Health Display */}
          <div className="lg:col-span-1">
            <HealthDisplay />
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mb-8">
          <ProgressStats />
        </div>

        {/* Consistency Grid */}
        <div>
          <ConsistencyGrid />
        </div>
      </div>
    </div>
  );
} 