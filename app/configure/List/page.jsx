// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import QuizList from '@/app/configure/quiz/page'

// export default function QuizListPage() {
//   const [quizzes, setQuizzes] = useState([])
//   const [loading, setLoading] = useState(true)
//   const router = useRouter()

//   useEffect(() => {
//     fetchQuizzes()
//   }, [])

//   const fetchQuizzes = async () => {
//     try {
//       const response = await fetch('/api/quiz')
//       const data = await response.json()
//       setQuizzes(data)
//     } catch (error) {
//       console.error('Error fetching quizzes:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleStartQuiz = (quizId) => {
//     router.push(`/quiz/${quizId}`)
//   }

//   const handleAddQuiz = () => {
//     router.push('/quiz/management')
//   }

//   if (loading) return <div>Loading...</div>

//   return (
//     <QuizList
//       quizzes={quizzes}
//       onStartQuiz={handleStartQuiz}
//       onAddQuiz={handleAddQuiz}
//     />
//   )
// }