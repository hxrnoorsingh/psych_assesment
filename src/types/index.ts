export type Axis = 'PA' | 'MA' | 'SA';

export interface Question {
    id: string;
    text: string;
    axis: Axis;
    direction: 'positive' | 'negative';
}

export type AssessmentAnswers = Record<string, number>;

export interface AssessmentResult {
    timestamp: string;
    axisScores: Record<Axis, { raw: number; max: number; percentage: number }>;
    globalSeverityIndex: number;
    isCrisis: boolean;
}
