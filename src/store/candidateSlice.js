import { createSlice } from '@reduxjs/toolkit';

export const QUESTIONS_CONFIG = [
  { level: 'Easy', duration: 20 },
  { level: 'Easy', duration: 20 },
  { level: 'Medium', duration: 60 },
  { level: 'Medium', duration: 60 },
  { level: 'Hard', duration: 120 },
  { level: 'Hard', duration: 120 },
];

const generateInitialQuestions = () => {
  return QUESTIONS_CONFIG.map((conf, index) => ({
    id: index + 1,
    ...conf,
    text: '', // To be filled by AI service
    answer: '',
    score: null,
    aiFeedback: null,
    submittedTime: null,
    timeLeft: conf.duration,
  }));
};

const initialState = {
  candidates: [],
  currentCandidateId: null,
};

const candidateSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    // --- Candidate Management ---
    addCandidate: (state, action) => {
      const newCandidate = {
        id: Date.now().toString(),
        status: 'PENDING_INFO',
        score: null,
        summary: null,
        interviewProgress: {
          currentQuestionIndex: 0,
          questionData: generateInitialQuestions(),
          startTime: null,
        },
        ...action.payload, // name, email, phone, resumeUrl (extracted/provided data)
      };
      state.candidates.push(newCandidate);
      state.currentCandidateId = newCandidate.id;
    },
    setCurrentCandidateId: (state, action) => {
      state.currentCandidateId = action.payload;
    },
    updateCandidateProfile: (state, action) => {
      const { id, updates } = action.payload;
      const candidate = state.candidates.find(c => c.id === id);
      if (candidate) {
        Object.assign(candidate, updates);
        // If all essential fields are now present, update status
        if (candidate.name && candidate.email && candidate.phone && candidate.status === 'PENDING_INFO') {
          candidate.status = 'IN_PROGRESS';
        }
      }
    },
    // --- Interview Flow ---
    startInterview: (state, action) => {
        const id = action.payload;
        const candidate = state.candidates.find(c => c.id === id);
        if (candidate) {
            candidate.status = 'IN_PROGRESS';
            candidate.interviewProgress.startTime = Date.now();
        }
    },
    pauseInterview: (state, action) => {
        const id = action.payload;
        const candidate = state.candidates.find(c => c.id === id);
        if (candidate) {
            candidate.status = 'PAUSED';
        }
    },
    tickTimer: (state) => {
      const candidate = state.candidates.find(c => c.id === state.currentCandidateId);
      if (!candidate || candidate.status !== 'IN_PROGRESS') return;

      const progress = candidate.interviewProgress;
      const qIndex = progress.currentQuestionIndex;
      const question = progress.questionData[qIndex];

      if (question && question.timeLeft > 0) {
        question.timeLeft -= 1;
      }
    },
    submitAnswer: (state, action) => {
      const candidate = state.candidates.find(c => c.id === state.currentCandidateId);
      if (!candidate || candidate.status !== 'IN_PROGRESS') return;

      const progress = candidate.interviewProgress;
      const qIndex = progress.currentQuestionIndex;
      const question = progress.questionData[qIndex];

      if (question) {
        question.answer = action.payload.answer;
        question.submittedTime = Date.now();
        question.score = action.payload.score; // From AI mock service
        question.aiFeedback = action.payload.feedback; // From AI mock service
        
        // Move to the next question
        if (qIndex < progress.questionData.length - 1) {
          progress.currentQuestionIndex += 1;
        } else {
          // Interview completed
          candidate.status = 'COMPLETED';
          candidate.score = action.payload.finalScore; // From AI mock service
          candidate.summary = action.payload.finalSummary; // From AI mock service
          state.currentCandidateId = null; // Clear active session
        }
      }
    },
    setQuestionText: (state, action) => {
        const { index, text } = action.payload;
        const candidate = state.candidates.find(c => c.id === state.currentCandidateId);
        if (candidate) {
            candidate.interviewProgress.questionData[index].text = text;
        }
    },
  },
});

export const { 
    addCandidate, 
    setCurrentCandidateId, 
    updateCandidateProfile, 
    startInterview, 
    pauseInterview, 
    tickTimer, 
    submitAnswer, 
    setQuestionText 
} = candidateSlice.actions;
export default candidateSlice.reducer;