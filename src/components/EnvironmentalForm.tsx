import { EnvironmentalConditions } from '../types/analysis';

interface EnvironmentalFormProps {
  data: Partial<EnvironmentalConditions>;
  onChange: (data: Partial<EnvironmentalConditions>) => void;
}

export default function EnvironmentalForm({ data, onChange }: EnvironmentalFormProps) {
  const handleChange = (field: keyof EnvironmentalConditions, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Environmental Conditions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature (°C)
          </label>
          <input
            type="number"
            value={data.temperature || ''}
            onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 22"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Humidity (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={data.humidity || ''}
            onChange={(e) => handleChange('humidity', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 65"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wind Speed (km/h)
          </label>
          <input
            type="number"
            min="0"
            value={data.windSpeed || ''}
            onChange={(e) => handleChange('windSpeed', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wind Direction
          </label>
          <select
            value={data.windDirection || ''}
            onChange={(e) => handleChange('windDirection', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select direction</option>
            <option value="N">North (N)</option>
            <option value="NE">Northeast (NE)</option>
            <option value="E">East (E)</option>
            <option value="SE">Southeast (SE)</option>
            <option value="S">South (S)</option>
            <option value="SW">Southwest (SW)</option>
            <option value="W">West (W)</option>
            <option value="NW">Northwest (NW)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Precipitation
          </label>
          <select
            value={data.precipitation || 'None'}
            onChange={(e) => handleChange('precipitation', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="None">None</option>
            <option value="Light rain">Light rain</option>
            <option value="Moderate rain">Moderate rain</option>
            <option value="Heavy rain">Heavy rain</option>
            <option value="Drizzle">Drizzle</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time of Day
          </label>
          <select
            value={data.timeOfDay || ''}
            onChange={(e) => handleChange('timeOfDay', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select time</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>
      </div>
    </div>
  );
}
