import mongoose from "mongoose";
import { Schema } from "mongoose";


const quizSchema = new Schema(
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
    },
    {
        timestamps: true
    }
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

export default Quiz;