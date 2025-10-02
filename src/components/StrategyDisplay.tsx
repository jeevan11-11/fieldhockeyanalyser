import { StrategyPrediction } from '../types/analysis';
import { TrendingUp, Wind, Target, Shield, AlertTriangle, Activity } from 'lucide-react';

interface StrategyDisplayProps {
  prediction: StrategyPrediction;
}

export default function StrategyDisplay({ prediction }: StrategyDisplayProps) {
  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-blue-500';
    if (rating >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceColor = (score: number): string => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Strategy Recommendations</h2>
        <div className={`px-4 py-2 rounded-lg font-semibold ${getConfidenceColor(prediction.confidenceScore)}`}>
          {prediction.confidenceScore}% Confidence
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Play Style</h3>
          </div>
          <p className="text-gray-700">{prediction.playStyleRecommendation}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Passing Strategy</h3>
          </div>
          <p className="text-gray-700">{prediction.passingStrategy}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Speed of Play</h3>
          </div>
          <p className="text-gray-700 text-xl font-semibold">{prediction.speedOfPlay}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Defensive Approach</h3>
          </div>
          <p className="text-gray-700">{prediction.defensiveApproach}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tactical Ratings</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Ball Control Importance</span>
              <span className="text-sm font-semibold text-gray-900">{prediction.ballControlImportance}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getRatingColor(prediction.ballControlImportance)}`}
                style={{ width: `${prediction.ballControlImportance * 10}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Aerial Play Viability</span>
              <span className="text-sm font-semibold text-gray-900">{prediction.aerialPlayViability}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getRatingColor(prediction.aerialPlayViability)}`}
                style={{ width: `${prediction.aerialPlayViability * 10}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Dribbling Effectiveness</span>
              <span className="text-sm font-semibold text-gray-900">{prediction.dribblingEffectiveness}/10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getRatingColor(prediction.dribblingEffectiveness)}`}
                style={{ width: `${prediction.dribblingEffectiveness * 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {prediction.keyInsights && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Wind className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">Key Insights</h3>
          </div>
          <div className="text-blue-800 whitespace-pre-line">{prediction.keyInsights}</div>
        </div>
      )}

      {prediction.riskFactors && prediction.riskFactors !== 'No significant risk factors identified' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Risk Factors</h3>
          </div>
          <div className="text-red-800 whitespace-pre-line">{prediction.riskFactors}</div>
        </div>
      )}
    </div>
  );
}
