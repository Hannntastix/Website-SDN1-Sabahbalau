import connectMongoDB from "@/lib/mongodb";
import Quiz from "@/models/quiz";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;

    const {
        newTitle: title,
        newDescription: description,
        newGrade: grade,
        newDifficulty: difficulty,
        newDuration: duration,
        newQuestions: questions
    } = await request.json()
    await connectMongoDB();
    await Quiz.findByIdAndUpdate(
        id,
        {
            title,
            description,
            grade,
            difficulty,
            duration,
            questions
        }
    );
    return NextResponse.json({ message: "Quiz Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const quiz = await Quiz.findOne({ _id: id });
    return NextResponse.json({ quiz }, { status: 200 });
}