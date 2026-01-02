import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AssessmentAnswers, AssessmentResult, Question } from '@/types';
import { calculateAxisScore, calculateGlobalSeverity } from './scoring';

interface AssessmentState {
    answers: AssessmentAnswers;
    currentQuestionIndex: number;
    isCompleted: boolean;
    result: AssessmentResult | null;

    // Actions
    setAnswer: (questionId: string, value: number) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    reset: () => void;
    calculateResult: (questions: Question[]) => void;
}

export const useAssessmentStore = create<AssessmentState>()(
    persist(
        (set, get) => ({
            answers: {},
            currentQuestionIndex: 0,
            isCompleted: false,
            result: null,

            setAnswer: (questionId, value) =>
                set((state) => ({
                    answers: { ...state.answers, [questionId]: value },
                })),

            nextQuestion: () =>
                set((state) => ({
                    currentQuestionIndex: state.currentQuestionIndex + 1,
                })),

            prevQuestion: () =>
                set((state) => ({
                    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
                })),

            reset: () =>
                set({
                    answers: {},
                    currentQuestionIndex: 0,
                    isCompleted: false,
                    result: null,
                }),

            calculateResult: (questions) => {
                const { answers } = get();

                const pScore = calculateAxisScore(answers, 'P', questions);
                const mScore = calculateAxisScore(answers, 'M', questions);
                const sScore = calculateAxisScore(answers, 'S', questions);

                const axisScores = { P: pScore, M: mScore, S: sScore };
                const globalSeverityIndex = calculateGlobalSeverity(axisScores);

                // Crisis if S-axis >= 45 OR if S9 (Self-harm) is >= 4
                const isCrisis = sScore.raw >= 45 || (answers['S9'] >= 4);

                const result: AssessmentResult = {
                    timestamp: new Date().toISOString(),
                    axisScores,
                    globalSeverityIndex,
                    isCrisis,
                };

                set({ result, isCompleted: true });
            },
        }),
        {
            name: 'clinical-assessment-storage',
            storage: createJSONStorage(() => ({
                getItem: async (name: string) => {
                    if (typeof window === 'undefined') return null;
                    const value = localStorage.getItem(name);
                    if (!value) return null;
                    try {
                        const { decryptData } = await import('./security');
                        return await decryptData(value);
                    } catch (e) {
                        console.error('Failed to decrypt store:', e);
                        return null;
                    }
                },
                setItem: async (name: string, value: string) => {
                    if (typeof window === 'undefined') return;
                    try {
                        const { encryptData } = await import('./security');
                        const encrypted = await encryptData(value);
                        localStorage.setItem(name, encrypted);
                    } catch (e) {
                        console.error('Failed to encrypt store:', e);
                    }
                },
                removeItem: async (name: string) => {
                    if (typeof window === 'undefined') return;
                    localStorage.removeItem(name);
                },
            })),
        }
    )
);
