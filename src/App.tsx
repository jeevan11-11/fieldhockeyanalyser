import { useState } from 'react';
import { Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import EnvironmentalForm from './components/EnvironmentalForm';
import TurfConditionsForm from './components/TurfConditionsForm';
import StrategyDisplay from './components/StrategyDisplay';
import { AnalysisFormData, StrategyPrediction } from './types/analysis';
import { generateStrategyPrediction, analyzeTurfFromImage } from './utils/strategyEngine';

function App() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<StrategyPrediction | null>(null);

  const [formData, setFormData] = useState<AnalysisFormData>({
    fieldName: '',
    image: null,
    imagePreview: '',
    environmental: {},
    turf: {}
  });

  const handleImageSelect = (file: File, preview: string) => {
    setFormData(prev => ({ ...prev, image: file, imagePreview: preview }));

    const detectedConditions = analyzeTurfFromImage(preview);
    setFormData(prev => ({ ...prev, turf: detectedConditions }));
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const strategyPrediction = generateStrategyPrediction(
        formData.environmental,
        formData.turf
      );
      setPrediction(strategyPrediction);
      setIsAnalyzing(false);
      setStep(4);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setPrediction(null);
    setFormData({
      fieldName: '',
      image: null,
      imagePreview: '',
      environmental: {},
      turf: {}
    });
  };

  const canProceedToStep2 = formData.imagePreview && formData.fieldName;
  const canProceedToStep3 = Object.keys(formData.environmental).length > 0;
  const canAnalyze = Object.keys(formData.turf).length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Field Hockey Strategy Analyzer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your field hockey strategy with predictive modeling based on surface and environmental conditions
          </p>
        </header>

        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((s, idx) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {idx < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all ${
                      step > s ? 'bg-green-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 gap-16">
            <span className={`text-sm font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-500'}`}>
              Upload
            </span>
            <span className={`text-sm font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-500'}`}>
              Environment
            </span>
            <span className={`text-sm font-medium ${step >= 3 ? 'text-green-600' : 'text-gray-500'}`}>
              Turf
            </span>
            <span className={`text-sm font-medium ${step >= 4 ? 'text-green-600' : 'text-gray-500'}`}>
              Strategy
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Field Information</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field Name
                </label>
                <input
                  type="text"
                  value={formData.fieldName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fieldName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Olympic Stadium Field #1"
                />
              </div>

              <ImageUpload
                imagePreview={formData.imagePreview}
                onImageSelect={handleImageSelect}
              />

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Environmental Conditions
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Environmental Conditions</h2>

              <EnvironmentalForm
                data={formData.environmental}
                onChange={(data) => setFormData(prev => ({ ...prev, environmental: data }))}
              />

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedToStep3}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Next: Turf Conditions
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Turf Conditions</h2>

              <TurfConditionsForm
                data={formData.turf}
                onChange={(data) => setFormData(prev => ({ ...prev, turf: data }))}
                autoDetected={formData.imagePreview !== ''}
              />

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze || isAnalyzing}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Generate Strategy
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 4 && prediction && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <StrategyDisplay prediction={prediction} />

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Analyze Another Field
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
