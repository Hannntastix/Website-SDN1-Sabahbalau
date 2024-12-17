export async function GET() {
    try {
        const dashboards = [
            {
                name: {
                    type: String,
                    required: true,
                    default: "SD Negeri 1 SabahBalau"
                },
                description: {
                    type: String,
                    default: "Mendidik generasi masa depan dengan nilai-nilai unggul, kreativitas, dan inovasi. Kami berkomitmen untuk memberikan pendidikan berkualitas yang membentuk karakter siswa."
                },
                stats: [{
                    label: String,
                    value: String
                }],
                facilities: [
                    {
                        type: String,
                        required: true,
                        trim: true
                    }
                ],
                contact: {
                    address: String,
                    city: String,
                    phone: String,
                    email: String
                },
                operationalHours: {
                    weekdays: String,
                    saturday: String,
                    sunday: String
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                },
                updatedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
        return Response.json({ dashboards });
    } catch (error) {
        return Response.json({ error: "Failed to fetch schoolInfo" }, { status: 500 });
    }
}