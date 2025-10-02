import { TurfConditions } from '../types/analysis';

interface TurfConditionsFormProps {
  data: Partial<TurfConditions>;
  onChange: (data: Partial<TurfConditions>) => void;
  autoDetected?: boolean;
}

export default function TurfConditionsForm({ data, onChange, autoDetected }: TurfConditionsFormProps) {
  const handleChange = (field: keyof TurfConditions, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Turf Conditions
        </h3>
        {autoDetected && (
          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Auto-detected from image
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface Type
          </label>
          <select
            value={data.surfaceType || ''}
            onChange={(e) => handleChange('surfaceType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="Natural grass">Natural grass</option>
            <option value="Artificial turf">Artificial turf</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moisture Level
          </label>
          <select
            value={data.moistureLevel || ''}
            onChange={(e) => handleChange('moistureLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select level</option>
            <option value="Dry">Dry</option>
            <option value="Normal">Normal</option>
            <option value="Wet">Wet</option>
            <option value="Waterlogged">Waterlogged</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grass Height
          </label>
          <select
            value={data.grassHeight || ''}
            onChange={(e) => handleChange('grassHeight', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select height</option>
            <option value="Short">Short (Ideal)</option>
            <option value="Medium">Medium</option>
            <option value="Long">Long</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface Quality
          </label>
          <select
            value={data.surfaceQuality || ''}
            onChange={(e) => handleChange('surfaceQuality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surface Evenness
          </label>
          <select
            value={data.evenness || ''}
            onChange={(e) => handleChange('evenness', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select evenness</option>
            <option value="Level">Level</option>
            <option value="Slightly uneven">Slightly uneven</option>
            <option value="Very uneven">Very uneven</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ball Speed Rating (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={data.ballSpeedRating || ''}
            onChange={(e) => handleChange('ballSpeedRating', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1 = Slow, 10 = Fast"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Traction Rating (1-10)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={data.tractionRating || ''}
            onChange={(e) => handleChange('tractionRating', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1 = Poor, 10 = Excellent"
          />
        </div>
      </div>
    </div>
  );
}
