"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QuizApp from "../quiz/page";


// Create Quiz Page Component
const CreateQuiz = ({ addQuiz }) => {
    const router = useRouter()

    const [selectedGrade, setSelectedGrade] = useState('4');
    const [quizzes, setQuizzes] = useState([]);
    const [page, setPage] = useState('createQuiz');

    console.log("masih", typeof addQuiz);

    const handleSaveQuiz = () => {
        const newQuiz = {
            id: Date.now(),
            title,
            description,
            difficulty,
            duration,
            questions,
        };
        addQuiz(newQuiz);
        router.push('/configure/quiz');
    };

    const [newQuiz, setNewQuiz] = useState({
        title: "",
        description: "",
        duration: "",
        difficulty: "",
        questions: []
    });

    const [currentNewQuestion, setCurrentNewQuestion] = useState({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        pembahasan: "",
    });

    const isFormValid = () => {
        const isQuizDetailValid =
            newQuiz.title.trim() !== "" &&
            newQuiz.description.trim() !== "" &&
            newQuiz.duration.trim() !== "" &&
            newQuiz.difficulty.trim() !== "" &&
            selectedGrade !== "";

        const areQuestionsValid = newQuiz.questions.length > 0 &&
            newQuiz.questions.every(question =>
                question.question.trim() !== "" &&
                question.options.every(option => option.trim() !== "") &&
                question.correctAnswer.trim() !== "" &&
                question.pembahasan.trim() !== ""
            );

        return isQuizDetailValid && areQuestionsValid;
    };

    const addQuestion = () => {
        const isQuestionValid =
            currentNewQuestion.question.trim() !== "" &&
            currentNewQuestion.options.every(option => option.trim() !== "") &&
            currentNewQuestion.correctAnswer.trim() !== "" &&
            currentNewQuestion.pembahasan.trim() !== "";

        if (isQuestionValid) {
            setNewQuiz(prev => ({
                ...prev,
                questions: [...prev.questions, { ...currentNewQuestion, id: prev.questions.length + 1 }]
            }));
            setCurrentNewQuestion({
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
                pembahasan: "",
            });
        } else {
            alert("Harap lengkapi semua field pertanyaan sebelum menambahkan!");
        }
    };

    const saveQuiz = () => {
        if (isFormValid()) {
            setQuizzes(prev => [
                ...prev,
                { ...newQuiz, id: prev.length + 1, questionCount: newQuiz.questions.length }
            ]);
            router.push('/configure/quiz')
        } else {
            alert("Harap lengkapi semua field sebelum menyimpan quiz!");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex md:flex-row flex-col justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Sistem Manajemen Soal</h1>
                <Button onClick={() => setPage('quizList')} className="my-5">Kembali ke daftar soal</Button>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Detail Soal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Grade Selection */}
                    <div className="flex flex-col mb-8 gap-3">
                        <Label>Kelas</Label>
                        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                            {['4', '5', '6'].map((grade) => (
                                <button
                                    key={grade}
                                    className={`sm:px-8 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${selectedGrade === grade
                                            ? 'bg-black text-white'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setSelectedGrade(grade)}
                                >
                                    Kelas {grade}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label>Materi Soal</Label>
                        <Input
                            value={newQuiz.title}
                            onChange={(e) =>
                                setNewQuiz((prev) => ({ ...prev, title: e.target.value }))
                            }
                            placeholder="Masukkan Materi Soal"
                            required
                        />
                    </div>
                    <div>
                        <Label>Mata Pelajaran</Label>
                        <Input
                            value={newQuiz.description}
                            onChange={(e) =>
                                setNewQuiz((prev) => ({ ...prev, description: e.target.value }))
                            }
                            placeholder="Masukkan Mata Pelajaran"
                            required
                        />
                    </div>
                    <div>
                        <Label>Tingkat Kesulitan (Sulit, Sedang, Mudah)</Label>
                        <Input
                            value={newQuiz.difficulty}
                            onChange={(e) =>
                                setNewQuiz((prev) => ({ ...prev, difficulty: e.target.value }))
                            }
                            placeholder="Masukkan Tingkat Kesulitan Soal"
                            required
                        />
                    </div>
                    <div>
                        <Label>Durasi Pengerjaan Soal (menit)</Label>
                        <Input
                            type="number"
                            value={newQuiz.duration}
                            onChange={(e) =>
                                setNewQuiz((prev) => ({ ...prev, duration: e.target.value }))
                            }
                            placeholder="Masukkan Durasi dalam Menit"
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Tambah Pertanyaan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label>Pertanyaan</Label>
                        <Input
                            value={currentNewQuestion.question}
                            onChange={(e) => setCurrentNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                            placeholder="Masukkan Pertanyaan"
                            required
                        />
                    </div>
                    {currentNewQuestion.options.map((option, idx) => (
                        <div key={idx}>
                            <Label>Pilihan {idx + 1}</Label>
                            <Input
                                value={option}
                                onChange={(e) => {
                                    const newOptions = [...currentNewQuestion.options];
                                    newOptions[idx] = e.target.value;
                                    setCurrentNewQuestion(prev => ({ ...prev, options: newOptions }));
                                }}
                                placeholder={`Masukkan Pilihan ${idx + 1}`}
                                required
                            />
                        </div>
                    ))}
                    <div>
                        <Label>Jawaban Benar</Label>
                        <RadioGroup
                            value={currentNewQuestion.correctAnswer}
                            onValueChange={(value) => setCurrentNewQuestion(prev => ({ ...prev, correctAnswer: value }))}
                            required
                        >
                            {currentNewQuestion.options.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option${idx}`} />
                                    <Label htmlFor={`option${idx}`}>{option || `Option ${idx + 1}`}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div>
                        <Label>Pembahasan</Label>
                        <Textarea
                            value={currentNewQuestion.pembahasan}
                            onChange={(e) => setCurrentNewQuestion(prev => ({ ...prev, pembahasan: e.target.value }))}
                            placeholder="Masukkan Penjelasan Jawaban"
                            className="w-full"
                            rows={4}
                        />
                    </div>
                    <Button onClick={addQuestion} className="w-full">Add Question</Button>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Added Questions ({newQuiz.questions.length})</h2>
                {newQuiz.questions.map((q, idx) => (
                    <Card key={idx}>
                        <CardContent className="pt-4">
                            <div className="flex justify-between items-center">
                                <p className="font-medium">{idx + 1}. {q.question}</p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setNewQuiz((prev) => ({
                                            ...prev,
                                            questions: prev.questions.filter((_, questionIdx) => questionIdx !== idx)
                                        }));
                                    }}
                                >
                                    Hapus
                                </Button>
                            </div>
                            <div className="ml-4 mt-2">
                                {q.options.map((option, optIdx) => (
                                    <p key={optIdx} className={option === q.correctAnswer ? "text-green-600" : ""}>
                                        {String.fromCharCode(65 + optIdx)}. {option}
                                    </p>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>


            {newQuiz.questions.length > 0 && (
                <Button
                    onClick={saveQuiz}
                    className="w-full mt-6"
                >
                    Save Quiz
                </Button>
            )}
        </div>
    );
};

export default CreateQuiz;