import { EnvironmentalConditions, TurfConditions, StrategyPrediction } from '../types/analysis';

export function generateStrategyPrediction(
  environmental: Partial<EnvironmentalConditions>,
  turf: Partial<TurfConditions>
): StrategyPrediction {
  const temp = environmental.temperature || 20;
  const humidity = environmental.humidity || 50;
  const windSpeed = environmental.windSpeed || 0;
  const precipitation = environmental.precipitation || 'None';
  const moistureLevel = turf.moistureLevel || 'Normal';
  const surfaceQuality = turf.surfaceQuality || 'Good';
  const ballSpeed = turf.ballSpeedRating || 5;
  const traction = turf.tractionRating || 5;

  let confidenceScore = 75;
  let playStyle = '';
  let passingStrategy = '';
  let speedOfPlay = '';
  let defensiveApproach = '';
  let ballControl = 5;
  let aerialPlay = 5;
  let dribbling = 5;
  let insights: string[] = [];
  let risks: string[] = [];

  if (moistureLevel === 'Wet' || moistureLevel === 'Waterlogged' || precipitation !== 'None') {
    playStyle = 'Controlled possession with emphasis on ground passes';
    passingStrategy = 'Short passes';
    speedOfPlay = 'Medium';
    ballControl = 8;
    aerialPlay = 3;
    dribbling = 4;
    insights.push('Wet conditions favor short, controlled passing to minimize ball skidding');
    insights.push('Keep the ball on the ground - aerial play is unpredictable in wet weather');
    risks.push('Ball may skip or slow unexpectedly on wet surfaces');
    risks.push('Players may lose footing during quick directional changes');
    confidenceScore += 5;
  } else if (moistureLevel === 'Dry' && ballSpeed >= 7) {
    playStyle = 'Fast-paced attacking with quick transitions';
    passingStrategy = 'Mixed - exploit fast surface';
    speedOfPlay = 'Fast';
    ballControl = 6;
    aerialPlay = 6;
    dribbling = 7;
    insights.push('Fast surface enables quick counter-attacks and long passes');
    insights.push('Excellent conditions for skillful dribbling and one-on-one situations');
    risks.push('High-speed play may lead to turnovers if ball control is poor');
    confidenceScore += 10;
  } else {
    playStyle = 'Balanced approach with tactical flexibility';
    passingStrategy = 'Mixed';
    speedOfPlay = 'Medium';
    ballControl = 6;
    aerialPlay = 5;
    dribbling = 6;
    insights.push('Normal conditions allow for varied tactical approaches');
  }

  if (windSpeed > 20) {
    aerialPlay = Math.max(1, aerialPlay - 3);
    insights.push('Strong winds will significantly affect aerial passes and lifted shots');
    risks.push('High wind speeds may disrupt passing accuracy and ball trajectory');
    confidenceScore -= 5;
  } else if (windSpeed > 10) {
    aerialPlay = Math.max(2, aerialPlay - 1);
    insights.push('Moderate winds require adjustment for aerial plays');
  }

  if (traction < 5) {
    dribbling = Math.max(2, dribbling - 2);
    risks.push('Poor traction increases injury risk during quick movements');
    confidenceScore -= 10;
  } else if (traction >= 8) {
    dribbling = Math.min(10, dribbling + 1);
    insights.push('Excellent traction supports aggressive pressing and quick movements');
  }

  if (surfaceQuality === 'Poor' || surfaceQuality === 'Fair') {
    ballControl += 2;
    speedOfPlay = 'Slow';
    passingStrategy = 'Short passes';
    insights.push('Poor surface quality demands careful ball control and shorter passes');
    risks.push('Uneven surface may cause unpredictable ball bounces');
    confidenceScore -= 15;
  } else if (surfaceQuality === 'Excellent') {
    confidenceScore += 5;
    insights.push('Excellent surface quality enables precise technical play');
  }

  if (temp < 5) {
    insights.push('Cold conditions may affect player stamina and ball behavior');
    risks.push('Cold weather increases muscle injury risk - ensure proper warm-up');
    confidenceScore -= 5;
  } else if (temp > 30) {
    insights.push('High temperature requires focus on hydration and rotation');
    risks.push('Heat may cause faster fatigue - plan for more substitutions');
    speedOfPlay = speedOfPlay === 'Fast' ? 'Medium' : speedOfPlay;
    confidenceScore -= 5;
  }

  if (humidity > 80) {
    insights.push('High humidity will affect player endurance');
    risks.push('Humid conditions may cause grip issues with stick handling');
  }

  defensiveApproach = speedOfPlay === 'Fast' ? 'High press' :
                      speedOfPlay === 'Slow' ? 'Deep defense' : 'Mid-field';

  if (turf.evenness === 'Very uneven') {
    risks.push('Uneven surface significantly increases injury risk');
    confidenceScore -= 10;
  }

  ballControl = Math.min(10, Math.max(1, ballControl));
  aerialPlay = Math.min(10, Math.max(1, aerialPlay));
  dribbling = Math.min(10, Math.max(1, dribbling));
  confidenceScore = Math.min(100, Math.max(0, confidenceScore));

  return {
    playStyleRecommendation: playStyle,
    passingStrategy,
    speedOfPlay,
    defensiveApproach,
    ballControlImportance: ballControl,
    aerialPlayViability: aerialPlay,
    dribblingEffectiveness: dribbling,
    keyInsights: insights.join('\n\n'),
    riskFactors: risks.length > 0 ? risks.join('\n\n') : 'No significant risk factors identified',
    confidenceScore
  };
}

export function analyzeTurfFromImage(imageUrl: string): Partial<TurfConditions> {
  const random = Math.random();

  return {
    surfaceType: random > 0.7 ? 'Natural grass' : 'Artificial turf',
    moistureLevel: random > 0.7 ? 'Wet' : random > 0.4 ? 'Normal' : 'Dry',
    grassHeight: random > 0.6 ? 'Medium' : 'Short',
    surfaceQuality: random > 0.8 ? 'Excellent' : random > 0.5 ? 'Good' : 'Fair',
    evenness: random > 0.8 ? 'Level' : 'Slightly uneven',
    ballSpeedRating: Math.floor(5 + random * 4),
    tractionRating: Math.floor(5 + random * 4)
  };
}
