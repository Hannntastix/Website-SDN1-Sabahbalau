// import { useState, useEffect } from 'react';

// export function useAuth() {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const response = await fetch('/api/auth');
//                 const data = await response.json();
//                 setUserData(data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchUserData();
//     }, []);

//     return { userData, loading };
// }