const mockQuestionPool = {
    Easy: ['Explain state vs props in React.', 'What is the Virtual DOM?', 'How do you handle forms in React?'],
    Medium: ['Describe an async operation in Node.js and error handling.', 'Explain the useEffect dependencies array.', 'What are closures in JavaScript?'],
    Hard: ['Design a real-time chat architecture.', 'Optimize a slow-rendering React list.', 'Explain load balancing techniques for a Node.js API.'],
};

// --- CORE AI FUNCTIONS ---

export const generateQuestion = (level, index) => {
    // Dynamically generate a question based on the level and current index
    const pool = mockQuestionPool[level];
    const text = pool[index % pool.length]; // Cycle through the mock pool
    return `Q${index + 1} (${level}): ${text}`;
};

export const judgeAnswerAndSummarize = async (candidateData, currentAnswer, questionLevel) => {
    // Simulate AI API call delay (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500)); 

    // 1. Judge the current answer
    let score = 0;
    let feedback = 'Good technical overview.';
    if (currentAnswer.length < 10) {
        score = Math.floor(Math.random() * 3) + 1; // 1 to 3
        feedback = 'Answer was too brief. Needs more technical detail.';
    } else if (currentAnswer.length < 50) {
        score = Math.floor(Math.random() * 3) + 3; // 3 to 6
        feedback = 'Solid explanation, but lacks depth and specific examples.';
    } else {
        score = Math.floor(Math.random() * 4) + 6; // 6 to 10
        feedback = `Excellent response for a ${questionLevel} question. Demonstrated strong conceptual understanding.`;
    }

    // 2. Check if this is the final question
    const isFinalQuestion = candidateData.interviewProgress.currentQuestionIndex === 5; // 6th question

    if (isFinalQuestion) {
        const totalScore = candidateData.interviewProgress.questionData.reduce((sum, q) => sum + (q.score || 0), score);
        const avgScore = totalScore / 6;

        let finalSummary = `The candidate demonstrated a good understanding of core concepts. Key strengths were: [Mock Strength]. Needs improvement in: [Mock Weakness]. Final score is based on the average performance across all difficulty levels.`;

        return {
            score,
            feedback,
            isFinal: true,
            finalScore: Math.round(avgScore * 10), // Scale to 100
            finalSummary,
        };
    }

    return { score, feedback, isFinal: false };
};
