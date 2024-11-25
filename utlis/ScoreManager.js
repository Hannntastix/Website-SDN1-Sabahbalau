export const ScoreManager = {
    saveScore: (quizId, score) => {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
        scores[quizId] = score;
        localStorage.setItem('quizScores', JSON.stringify(scores));
    },

    getScore: (quizId) => {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
        return scores[quizId];
    },

    getAllScores: () => {
        return JSON.parse(localStorage.getItem('quizScores') || '{}');
    },

    clearScore: (quizId) => {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
        delete scores[quizId];
        localStorage.setItem('quizScores', JSON.stringify(scores));
    }
};