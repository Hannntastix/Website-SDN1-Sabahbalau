// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import TakeQuiz from '@/app/configure/quiz/page'

// export default function QuizPage() {
//     const [quiz, setQuiz] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const params = useParams()
//     const router = useRouter()

//     useEffect(() => {
//         fetchQuiz()
//     }, [])

//     const fetchQuiz = async () => {
//         try {
//             const response = await fetch(`/api/quiz/${params.id}`)
//             if (!response.ok) throw new Error('Quiz not found')
//             const data = await response.json()
//             setQuiz(data)
//         } catch (error) {
//             console.error('Error fetching quiz:', error)
//             router.push('/quiz')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleSubmit = async (answers) => {
//         try {
//             const response = await fetch('/api/quiz/attempt', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     quizId: params.id,
//                     answers,
//                 }),
//             })

//             if (!response.ok) throw new Error('Failed to submit quiz')

//             const result = await response.json()
//             router.push(`/quiz/${params.id}/result?attemptId=${result.id}`)
//         } catch (error) {
//             console.error('Error submitting quiz:', error)
//         }
//     }

//     if (loading || !quiz) return <div>Loading...</div>

//     return <TakeQuiz quiz={quiz} onSubmit={handleSubmit} />
// }