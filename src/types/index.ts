export type Axis = 'P' | 'M' | 'S';

export type SeverityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface Question {
    id: string;
    text: string;
    axis: Axis;
}

export interface AssessmentAnswers {
    [questionId: string]: number; // 1-5
}

export interface AxisScore {
    raw: number;
    max: number; // usually 55 (11 * 5)
    severity: SeverityLevel;
}

export interface AssessmentResult {
    timestamp: string;
    axisScores: Record<Axis, AxisScore>;
    globalSeverityIndex: number;
    isCrisis: boolean; // S-axis >= 45
}

export interface UserState {
    hasCompletedAssessment: boolean;
    lastResult: AssessmentResult | null;
    // Privacy: we might not store this persistently unless user opts in, 
    // but for the session we need it.
}
