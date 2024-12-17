import connectMongoDB from "../../../../lib/mongodb";
import SchoolInfo from "../../../../models/schoolInfo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;

    const {
        newName: name,
        newDescription: description,
        newStats: stats,
        newFacilities: facilities,
        newContact: contact,
        newOperationalHours: operationalHours
    } = await request.json()
    await connectMongoDB();
    await SchoolInfo.findByIdAndUpdate(
        id,
        {
            name,
            description,
            stats,
            facilities,
            contact,
            operationalHours
        }
    );
    return NextResponse.json({ message: "Information Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const schoolInfo = await SchoolInfo.findOne({ _id: id });
    return NextResponse.json({ schoolInfo }, { status: 200 });
}