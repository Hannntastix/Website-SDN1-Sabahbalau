export async function GET() {
    try {
        // Implementation of your API route
        const quizzes = [
            {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                grade: {
                    type: String,
                    required: true,
                    enum: ['4', '5', '6']
                },
                difficulty: {
                    type: String,
                    required: true
                },
                duration: {
                    type: Number,
                    required: true
                },
                questions: [{
                    question: {
                        type: String,
                        required: true
                    },
                    options: {
                        type: [String],
                        required: true,
                        validate: [
                            function (val) {
                                return val.length === 4;
                            },
                            'Options array must contain exactly 4 items'
                        ]
                    },
                    correctAnswer: {
                        type: String,
                        required: true
                    },
                    pembahasan: {
                        type: String,
                        required: true
                    }
                }]
            }
        ];
        return Response.json({ quizzes });
    } catch (error) {
        return Response.json({ error: "Failed to fetch quizzes" }, { status: 500 });
    }
}