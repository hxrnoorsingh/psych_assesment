export type Axis = 'PA' | 'MA' | 'SA';

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
    max: number;
    severity: SeverityLevel;
}

export interface AssessmentResult {
    timestamp: string;
    axisScores: Record<Axis, AxisScore>;
    globalSeverityIndex: number;
    isCrisis: boolean;
}

export interface UserState {
    hasCompletedAssessment: boolean;
    lastResult: AssessmentResult | null;
}
