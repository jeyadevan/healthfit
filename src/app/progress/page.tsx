import ProgressStats from '@/components/ProgressStats';
import ConsistencyGrid from '@/components/ConsistencyGrid';
import HealthDisplay from '@/components/HealthDisplay';

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Progress & Analytics
          </h1>
          <p className="text-gray-600">
            Detailed insights into your fitness journey
          </p>
        </div>

        {/* Stats and Streak */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <ProgressStats />
          </div>
          <div>
            <HealthDisplay />
          </div>
        </div>

        {/* Consistency Grid */}
        <div>
          <ConsistencyGrid />
        </div>
      </div>
    </div>
  );
} 