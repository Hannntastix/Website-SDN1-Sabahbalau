import connectMongoDB from "../../../lib/mongodb.js"
import Quiz from "../../../models/quiz.js"
import { NextResponse } from "next/server"

export async function POST(request) {
    const {
        title,
        description,
        grade,
        difficulty,
        duration,
        questions
    } = await request.json()

    await connectMongoDB()

    await Quiz.create({
        title,          // materi soal
        description,    // mata pelajaran
        grade,         // kelas (4,5,6)
        difficulty,    // tingkat kesulitan
        duration,      // durasi dalam menit
        questions      // array pertanyaan dengan format:
        // [{
        //   question: string,
        //   options: [string, string, string, string],
        //   correctAnswer: string,
        //   pembahasan: string
        // }]
    })

    return NextResponse.json(
        { message: "Quiz berhasil dibuat" },
        { status: 201 }
    )

}

export async function GET() {
    await connectMongoDB();
    const quizzes = await Quiz.find();
    return NextResponse.json({ quizzes })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Quiz.findByIdAndDelete(id);
    return NextResponse.json({ message: "Quiz Deleted" }, { status: 200 });
}