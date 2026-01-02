import { AssessmentAnswers, Axis, AxisScore, Question, SeverityLevel } from '@/types';

// Scoring ranges adjusted for 20-item questionnaire (7+7+6 questions)
// MA: 7 questions, max = 35
// PA: 7 questions, max = 35
// SA: 6 questions, max = 30
export const SCORING_RANGES = {
    LOW: { min: 0, max: 25 },
    MODERATE: { min: 26, max: 50 },
    HIGH: { min: 51, max: 75 },
    CRITICAL: { min: 76, max: 100 },
};

export function getSeverityLevel(percentageScore: number): SeverityLevel {
    if (percentageScore >= SCORING_RANGES.CRITICAL.min) return 'Critical';
    if (percentageScore >= SCORING_RANGES.HIGH.min) return 'High';
    if (percentageScore >= SCORING_RANGES.MODERATE.min) return 'Moderate';
    return 'Low';
}

export function calculateAxisScore(
    answers: AssessmentAnswers,
    axis: Axis,
    questions: Question[]
): AxisScore {
    const axisQuestions = questions.filter((q) => q.axis === axis);

    if (axisQuestions.length === 0) {
        return { raw: 0, max: 0, severity: 'Low' };
    }

    let raw = 0;
    axisQuestions.forEach((q) => {
        let value = answers[q.id] || 0;

        // MA Axis questions measure mental functioning capacities
        // For MA: High capacity (5) = Low Severity (good functioning)
        // So we invert: high answers mean good mental functioning = lower distress score
        if (axis === 'MA' && value > 0) {
            value = 6 - value;
        }

        raw += value;
    });

    const max = axisQuestions.length * 5;
    const percentage = (raw / max) * 100;

    return {
        raw,
        max,
        severity: getSeverityLevel(percentage),
    };
}

export function calculateGlobalSeverity(
    axisScores: Record<Axis, AxisScore>
): number {
    const pa = axisScores.PA.raw;
    const ma = axisScores.MA.raw;
    const sa = axisScores.SA.raw;

    const totalRaw = pa + ma + sa;
    const totalMax = axisScores.PA.max + axisScores.MA.max + axisScores.SA.max;

    // Return as percentage (0-100 scale) matching research paper format
    const gsi = (totalRaw / totalMax) * 100;
    return parseFloat(gsi.toFixed(2));
}
