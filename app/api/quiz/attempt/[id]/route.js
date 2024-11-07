// import prisma from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET(request, { params }) {
//     try {
//         const attempt = await prisma.quizAttempt.findUnique({
//             where: {
//                 id: params.id,
//             },
//             include: {
//                 quiz: {
//                     include: {
//                         questions: true,
//                     },
//                 },
//             },
//         })

//         if (!attempt) {
//             return NextResponse.json(
//                 { error: 'Attempt not found' },
//                 { status: 404 }
//             )
//         }

//         return NextResponse.json(attempt)
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Error fetching attempt' },
//             { status: 500 }
//         )
//     }
// }