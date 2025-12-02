import { AssessmentAnswers, Axis, AxisScore, Question, SeverityLevel } from '@/types';

export const SCORING_RANGES = {
    LOW: { min: 11, max: 25 },
    MODERATE: { min: 26, max: 34 },
    HIGH: { min: 35, max: 44 },
    CRITICAL: { min: 45, max: 55 },
};

export function getSeverityLevel(score: number): SeverityLevel {
    if (score >= SCORING_RANGES.CRITICAL.min) return 'Critical';
    if (score >= SCORING_RANGES.HIGH.min) return 'High';
    if (score >= SCORING_RANGES.MODERATE.min) return 'Moderate';
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

        // Axis M questions are positive capacities (e.g., "I can calm myself").
        // High capacity (5) = Low Severity.
        // Low capacity (1) = High Severity.
        // We need to invert the score for Severity calculation: 5 -> 1, 1 -> 5.
        // Formula: 6 - value (assuming 1-5 scale)
        // Only invert if value is > 0 (answered)
        if (axis === 'M' && value > 0) {
            value = 6 - value;
        }

        raw += value;
    });

    return {
        raw,
        max: axisQuestions.length * 5,
        severity: getSeverityLevel(raw),
    };
}

export function calculateGlobalSeverity(
    axisScores: Record<Axis, AxisScore>
): number {
    const p = axisScores.P.raw;
    const m = axisScores.M.raw;
    const s = axisScores.S.raw;

    // Formula: (P + M + S) / 3
    const gsi = (p + m + s) / 3;
    return parseFloat(gsi.toFixed(1));
}
