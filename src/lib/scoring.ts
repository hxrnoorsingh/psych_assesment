import { AssessmentResult, Question, Axis } from '@/types';

// Scoring ranges based on 20-item research questionnaire
// PA: 7 items, MA: 7 items, SA: 6 items
export const SCORING_RANGES = {
    PA: { min: 7, max: 35 }, // 7 * 5
    MA: { min: 7, max: 35 }, // 7 * 5
    SA: { min: 6, max: 30 }, // 6 * 5
};

export function calculateAxisScore(answers: Record<string, number>, axis: Axis, questions: Question[]) {
    const axisQuestions = questions.filter(q => q.axis === axis);
    let rawScore = 0;

    axisQuestions.forEach(q => {
        let value = answers[q.id] || 0;

        // MA Axis questions measure mental functioning capacities
        // For MA: High capacity (5) = Low Severity (good functioning)
        // So we invert: high answers mean good mental functioning = lower distress score
        if (axis === 'MA' && value > 0) {
            value = 6 - value;
        }

        rawScore += value;
    });

    const range = SCORING_RANGES[axis];
    // Calculate percentage (0-100)
    // (Raw - Min) / (Max - Min) * 100
    const percentage = Math.round(((rawScore - range.min) / (range.max - range.min)) * 100);

    return {
        raw: rawScore,
        max: range.max,
        percentage: Math.max(0, Math.min(100, percentage))
    };
}

export function calculateGlobalSeverity(axisScores: Record<Axis, { percentage: number }>) {
    const { PA, MA, SA } = axisScores;
    // Simple average of percentages
    return Math.round((PA.percentage + MA.percentage + SA.percentage) / 3);
}
