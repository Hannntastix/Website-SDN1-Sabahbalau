import connectMongoDB from "../../../lib/mongodb.js"
import SchoolInfo from "../../../models/schoolInfo.js"
import { NextResponse } from "next/server"

export async function POST(request) {
    const {
        name,
        description,
        stats,
        facilities,
        contact,
        operationalHours
    } = await request.json()

    await connectMongoDB()

    await SchoolInfo.create({
        name,
        description,
        stats,
        facilities,
        contact,
        operationalHours
        // [{
        //   question: string,
        //   options: [string, string, string, string],
        //   correctAnswer: string,
        //   pembahasan: string
        // }]
    })

    return NextResponse.json(
        { message: "Informasi Sekolah berhasil dibuat" },
        { status: 201 }
    )

}

export async function GET() {
    await connectMongoDB();
    const dashboards = await SchoolInfo.find();
    return NextResponse.json({ dashboards })
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await SchoolInfo.findByIdAndDelete(id);
    return NextResponse.json({ message: "School Information Deleted" }, { status: 200 });
}