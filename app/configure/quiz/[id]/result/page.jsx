// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useSearchParams } from 'next/navigation'
// import Result from '@/app/configure/quiz/page'

// export default function QuizResultPage() {
//     const [result, setResult] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const params = useParams()
//     const searchParams = useSearchParams()
//     const attemptId = searchParams.get('attemptId')

//     useEffect(() => {
//         fetchResult()
//     }, [])

//     const fetchResult = async () => {
//         try {
//             const response = await fetch(`/api/quiz/attempt/${attemptId}`)
//             if (!response.ok) throw new Error('Result not found')
//             const data = await response.json()
//             setResult(data)
//         } catch (error) {
//             console.error('Error fetching result:', error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     if (loading || !result) return <div>Loading...</div>

//     return <Result result={result} />
// }