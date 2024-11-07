"use client";

import React, { useState, useEffect } from 'react';
import { PlusCircle, Timer, CheckCircle2, XCircle, Book, ArrowLeft, ListOrdered, AlignLeft } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from '@/app/components/ui/progress';
import { Trophy, Target, Frown, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import CreateQuiz from '../createQuiz/page';

const QuizApp = () => {
    const [page, setPage] = useState('quizList');
    const [quizzes, setQuizzes] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [selectedGrade, setSelectedGrade] = useState('4');
    const [score, setScore] = useState(null);

    const addQuiz = (newQuiz) => {
        setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz]);
        setPage('quizList');
    };

    console.log("masih", typeof addQuiz);
    console.log("QuizApp rendered", quizzes);


    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'text-green-600 bg-green-100';
            case 'medium':
                return 'text-yellow-600 bg-yellow-100';
            case 'hard':
                return 'text-red-600 bg-red-100';
            case 'mudah':
                return 'text-green-600 bg-green-100';
            case 'sedang':
                return 'text-yellow-600 bg-yellow-100';
            case 'sulit':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };


    useEffect(() => {
        let timer;
        if (page === 'takeQuiz' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [page, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const QuizList = ({ score }) => {
        return (
            <div className="p-6">
                <div className="md:justify-end flex justify-center  items-center mb-6">
                    <Button
                        onClick={() => setPage('createQuestion')}
                        className="bg-blue-950 flex items-center gap-2"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Tambah Paket Soal
                    </Button>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-600 mb-4">Daftar Paket Soal</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Pilih paket soal sesuai dengan tingkat kelas dan mata pelajaran yang ingin anda pelajari
                        </p>
                    </div>

                    {/* Grade Selection */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
                            {['4', '5', '6'].map((grade) => (
                                <button
                                    key={grade}
                                    className={`px-8 py-2 rounded-md text-sm font-medium transition-colors
                  ${selectedGrade === grade
                                            ? 'bg-blue-800 text-white'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setSelectedGrade(grade)}
                                >
                                    Kelas {grade}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quiz Grid */}
                    {quizzes.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 relative"
                                    >
                                        {/* Subject Badge */}
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {quiz.description}
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                                {quiz.difficulty}
                                            </span>
                                        </div>

                                        {/* Quiz Info */}
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{quiz.title}</h3>

                                        {showResults ? (
                                            <>
                                                {score < 65 ? (
                                                    <>
                                                        <p className=' font-semibold text-red-800'>Nilai terakhir: {score}</p>
                                                        <p className='mb-2 font-normal text-red-800'>Ayo tingkatkan lagi nilaimu!</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className=' font-semibold text-blue-800'>Nilai terakhir: {score}</p>
                                                        <p className='mb-2 font-normal text-blue-800'>Good Job!</p>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <p className='my-3 font-semibold text-slate-500'>Nilai terakhir: -</p>
                                        )}

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{quiz.duration} Menit</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{quiz.questions.length} Pertanyaan</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex space-x-4">
                                            <button
                                                className="flex-1 text-center bg-blue-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                                                onClick={() => {
                                                    setCurrentQuiz(quiz);
                                                    setTimeLeft(quiz.duration * 60);
                                                    setCurrentQuestion(0);
                                                    setPage('takeQuiz');
                                                }}
                                            >
                                                Mulai Latihan
                                            </button>
                                            <button
                                                className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Apakah Anda yakin ingin menghapus soal ini?");
                                                    if (confirmed) {
                                                        setQuizzes(prevQuizzes => prevQuizzes.filter(q => q.id !== quiz.id));
                                                    }
                                                }}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-3">
                                <h1 className='text-2xl text-black text-center mx-auto font-semibold mt-5 mb-5'>Anda Belum Menambahkan Paket Soal</h1>
                                <Button
                                    onClick={() => setPage('createQuestion')}
                                    className="bg-blue-950 flex items-center justify-center mx-auto h-15 w-20"
                                >
                                    <p className='text-5xl text-center mb-3'>+</p>
                                </Button>
                                <p className='text-center font-semibold text-xl text-slate-500'>Tambah Paket Soal</p>
                            </div>
                        </>
                    )}
                </div>

                <div className='max-w-7xl mx-auto px-4'>
                    {/* Info Section */}
                    <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Quiz</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Nilai Langsung</h3>
                                    <p className="text-gray-600 text-sm">Dapatkan hasil dan pembahasan segera setelah selesai</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Bisa Diulang</h3>
                                    <p className="text-gray-600 text-sm">Ulangi kuis untuk meningkatkan pemahaman</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Pembahasan Lengkap</h3>
                                    <p className="text-gray-600 text-sm">Pelajari dari pembahasan detail setiap soal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    // Create Quiz Page Component
    const CreateQuestion = () => {

        // const [selectedGrade, setSelectedGrade] = useState('4');
        // const [quizzes, setQuizzes] = useState([]);
        // const [page, setPage] = useState('createQuiz');

        // console.log("masih", typeof addQuiz);

        // const handleSaveQuiz = () => {
        //     const newQuiz = {
        //         id: Date.now(),
        //         title,
        //         description,
        //         difficulty,
        //         duration,
        //         questions,
        //     };
        //     addQuiz(newQuiz);
        //     router.push('/configure/quiz');
        // };

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
                setPage('quizList');
            } else {
                alert("Harap lengkapi semua field sebelum menyimpan quiz!");
            }
        };

        return (
            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex md:flex-row flex-col justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-600">Sistem Manajemen Soal</h1>
                    <Button onClick={() => setPage('quizList')} className="my-5 bg-blue-950">Kembali ke daftar soal</Button>
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
                                                ? 'bg-blue-800 text-white'
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
                        <Button onClick={addQuestion} className="bg-blue-950 w-full">Add Question</Button>
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
                        className="w-full mt-6 bg-blue-950"
                    >
                        Save Quiz
                    </Button>
                )}
            </div>
        );
    };

    // Take Quiz Page Component
    const TakeQuiz = () => {
        const handleAnswer = (answer) => {
            setUserAnswers(prev => ({
                ...prev,
                [currentQuestion]: answer
            }));
        };

        const currentQuestionData = currentQuiz.questions[currentQuestion];

        return (
            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-950">{currentQuiz.title}</h1>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2">
                            <Timer className="w-4 h-4" />
                            {formatTime(timeLeft)}
                        </span>
                        <span className="flex items-center gap-2">
                            <AlignLeft className="w-4 h-4" />
                            {currentQuestion + 1}/{currentQuiz.questions.length}
                        </span>
                    </div>
                </div>

                <Card>
                    <CardContent className="pt-6 space-y-4">
                        <p className="text-lg font-medium">{currentQuestionData.question}</p>

                        <RadioGroup
                            value={userAnswers[currentQuestion] || ""}
                            onValueChange={handleAnswer}
                        >
                            {currentQuestionData.options.map((option, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`answer${idx}`} />
                                    <Label htmlFor={`answer${idx}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-4">
                        <Button
                            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="bg-blue-950"
                        >
                            Previous
                        </Button>
                        <Button
                            className="bg-blue-950"
                            onClick={() => {
                                if (currentQuestion < currentQuiz.questions.length - 1) {
                                    setCurrentQuestion(prev => prev + 1);
                                } else {
                                    setShowResults(true);
                                    setPage('results');
                                }
                            }}
                        >
                            {currentQuestion === currentQuiz.questions.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    };


    const Results = ({ setScore }) => {
        const correctAnswersCount = currentQuiz.questions.reduce((acc, question, idx) => {
            return acc + (question.correctAnswer === userAnswers[idx] ? 1 : 0);
        }, 0);

        const score = (correctAnswersCount / currentQuiz.questions.length) * 100;

        useEffect(() => {
            setScore(Math.round(score));
        }, [score, setScore]);

        const scoreMessage = score === 100
            ? "Perfect Score! Amazing job! 🎉"
            : score >= 80
                ? "Great job! Very well done! 🌟"
                : score >= 60
                    ? "Good effort! Keep practicing! 💪"
                    : "Keep learning! You'll do better next time! 📚";

        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
                <Card className="max-w-3xl mx-auto shadow-lg py-5">
                    <CardContent className="p-8">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">Hasil Pengerjaan Soal</h1>
                            <p className="text-lg text-gray-600">{scoreMessage}</p>
                        </div>

                        {/* Score Circle */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-8 border-blue-100">
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-blue-600">{Math.round(score)}%</span>
                                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Progress</span>
                                <span>{correctAnswersCount} of {currentQuiz.questions.length} correct</span>
                            </div>
                            <Progress value={score} className="h-3" />
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Accuracy</p>
                                <p className="text-xl font-bold text-gray-800">{Math.round(score)}%</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Correct</p>
                                <p className="text-xl font-bold text-gray-800">{correctAnswersCount}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <Frown className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Incorrect</p>
                                <p className="text-xl font-bold text-gray-800">{currentQuiz.questions.length - correctAnswersCount}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => setPage('quizList')}
                                className="bg-blue-950 hover:bg-blue-700"
                            >
                                Kembali ke Halaman Daftar Soal
                            </Button>
                            <Button
                                onClick={() => setPage('review')}
                                variant="outline"
                                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                            >
                                Review Jawaban
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    // ReviewPage Component
    const ReviewPage = () => {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-blue-900 mb-3">Review Soal</h1>
                        <p className="text-gray-600">Pelajari kembali jawaban dan pembahasan dari setiap soal</p>
                    </div>

                    <div className="space-y-8">
                        {currentQuiz.questions.map((question, index) => {
                            const isCorrect = userAnswers[index] === question.correctAnswer;

                            return (
                                <Card key={index} className="transform transition-all duration-300 hover:shadow-xl">
                                    <div className="p-6">
                                        {/* Question Header */}
                                        <div className="flex items-center gap-3 mb-6">
                                            {isCorrect ? (
                                                <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                                    {index + 1}
                                                </div>
                                            ) : (
                                                <div className="bg-red-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                                    {index + 1}
                                                </div>
                                            )}
                                            <h2 className="text-xl font-semibold text-blue-900 flex-grow">
                                                {question.question}
                                            </h2>
                                        </div>

                                        {/* Answer Section */}
                                        <div className="space-y-4">
                                            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                                                <div className="flex items-start gap-3">
                                                    {isCorrect ? (
                                                        <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                                                    ) : (
                                                        <XCircle className="w-6 h-6 text-red-500 mt-1" />
                                                    )}
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Jawaban Anda</p>
                                                        <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                            {userAnswers[index] || "Tidak dijawab"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Correct Answer */}
                                            <div className="p-4 bg-blue-50 rounded-lg">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-6 h-6 text-blue-500 mt-1" />
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Jawaban Benar</p>
                                                        <p className="font-medium text-blue-700">{question.correctAnswer}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Explanation */}
                                            {question.pembahasan && (
                                                <div className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex items-start gap-3">
                                                        <Book className="w-6 h-6 text-gray-500 mt-1" />
                                                        <div>
                                                            <p className="text-sm text-gray-600 mb-1">Pembahasan</p>
                                                            <p className="text-gray-700">{question.pembahasan}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-12 flex justify-center gap-4 flex-col sm:flex-row">
                        <Button
                            onClick={() => setPage('results')}
                            className="group bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Halaman Hasil
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setPage('quizList')}
                            className="group border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
                        >
                            <ListOrdered className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Kembali ke Daftar Soal
                        </Button>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {page === 'quizList' && <QuizList score={score} />}
            {page === 'createQuestion' && <CreateQuestion />}
            {page === 'takeQuiz' && <TakeQuiz />}
            {page === 'results' && <Results setScore={setScore} />}
            {page === 'review' && <ReviewPage />}
        </div>
    );
};

export default QuizApp;