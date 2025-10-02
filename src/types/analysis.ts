export interface FieldAnalysis {
  id: string;
  fieldName: string;
  imageUrl: string;
  analysisDate: Date;
  environmental: EnvironmentalConditions;
  turf: TurfConditions;
  strategy: StrategyPrediction;
}

export interface EnvironmentalConditions {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  precipitation: string;
  timeOfDay: string;
}

export interface TurfConditions {
  surfaceType: string;
  moistureLevel: string;
  grassHeight: string;
  surfaceQuality: string;
  evenness: string;
  ballSpeedRating: number;
  tractionRating: number;
}

export interface StrategyPrediction {
  playStyleRecommendation: string;
  passingStrategy: string;
  speedOfPlay: string;
  defensiveApproach: string;
  ballControlImportance: number;
  aerialPlayViability: number;
  dribblingEffectiveness: number;
  keyInsights: string;
  riskFactors: string;
  confidenceScore: number;
}

export interface AnalysisFormData {
  fieldName: string;
  image: File | null;
  imagePreview: string;
  environmental: Partial<EnvironmentalConditions>;
  turf: Partial<TurfConditions>;
}
