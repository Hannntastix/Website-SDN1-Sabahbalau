// import prisma from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function POST(request) {
//     try {
//         const body = await request.json()
//         const { quizId, answers } = body

//         const quiz = await prisma.quiz.findUnique({
//             where: { id: quizId },
//             include: { questions: true },
//         })

//         if (!quiz) {
//             return NextResponse.json(
//                 { error: 'Quiz not found' },
//                 { status: 404 }
//             )
//         }

//         // Calculate score
//         let correctAnswers = 0
//         answers.forEach(answer => {
//             const question = quiz.questions.find(q => q.id === answer.questionId)
//             if (question && question.correctAnswer === answer.selectedAnswer) {
//                 correctAnswers++
//             }
//         })

//         const score = (correctAnswers / quiz.questions.length) * 100

//         const attempt = await prisma.quizAttempt.create({
//             data: {
//                 quizId,
//                 answers,
//                 score,
//             },
//         })

//         return NextResponse.json(attempt)
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Error saving quiz attempt' },
//             { status: 500 }
//         )
//     }
// }