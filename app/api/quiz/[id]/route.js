// import prisma from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET(request, { params }) {
//     try {
//         const quiz = await prisma.quiz.findUnique({
//             where: {
//                 id: params.id,
//             },
//             include: {
//                 questions: true,
//             },
//         })

//         if (!quiz) {
//             return NextResponse.json(
//                 { error: 'Quiz not found' },
//                 { status: 404 }
//             )
//         }

//         return NextResponse.json(quiz)
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Error fetching quiz' },
//             { status: 500 }
//         )
//     }
// }