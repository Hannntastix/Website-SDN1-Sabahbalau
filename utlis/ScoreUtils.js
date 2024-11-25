export const saveQuizScore = (quizId, score) => {
    try {
        const scores = JSON.parse(localStorage.getItem('quizScores') || '{}');
        scores[quizId] = Number(score);
        localStorage.setItem('quizScores', JSON.stringify(scores));
    } catch (error) {
        console.error('Error saving score:', error);
    }
};

export const getQuizScores = () => {
    try {
        return JSON.parse(localStorage.getItem('quizScores') || '{}');
    } catch (error) {
        console.error('Error getting scores:', error);
        return {};
    }
};