export const saveSchoolInfo = (data) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('schoolInfo', JSON.stringify(data));
    }
};

export const getSchoolInfo = () => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem('schoolInfo');
        return data ? JSON.parse(data) : null;
    }
    return null;
};