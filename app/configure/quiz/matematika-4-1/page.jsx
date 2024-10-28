"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Progress } from '@/app/components/ui/progress';
import { AlertCircle, CheckCircle2, Timer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const QuizPage = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [quizStarted, setQuizStarted] = useState(false);

    const questions = [
        {
            id: 1,
            question: "Manakah pecahan yang sama dengan 0,5?",
            options: ["1/4", "1/2", "2/3", "3/4"],
            correctAnswer: "1/2"
        },
        {
            id: 2,
            question: "Berapa hasil dari 3/4 + 1/4?",
            options: ["1", "2/4", "4/4", "5/4"],
            correctAnswer: "1"
        },
        {
            id: 3,
            question: "0,75 dapat ditulis dalam bentuk pecahan sebagai...",
            options: ["75/10", "75/100", "3/4", "7/5"],
            correctAnswer: "3/4"
        },
        {
            id: 4,
            question: "Manakah pecahan yang terbesar?",
            options: ["2/5", "3/8", "1/2", "3/6"],
            correctAnswer: "1/2"
        },
        {
            id: 5,
            question: "1,5 sama dengan...",
            options: ["1 1/2", "1 1/4", "1 1/3", "1 2/3"],
            correctAnswer: "1 1/2"
        },
        {
            id: 6,
            question: "Berapa hasil dari 1/3 + 1/3?",
            options: ["1/3", "2/3", "3/3", "4/3"],
            correctAnswer: "2/3"
        },
        {
            id: 7,
            question: "0,25 + 0,75 = ...",
            options: ["0,100", "1,00", "0,90", "1,25"],
            correctAnswer: "1,00"
        },
        {
            id: 8,
            question: "Manakah yang sama dengan 2/4?",
            options: ["1/2", "3/4", "1/4", "4/8"],
            correctAnswer: "1/2"
        },
        {
            id: 9,
            question: "Berapa 1/2 dari 10?",
            options: ["2", "4", "5", "6"],
            correctAnswer: "5"
        },
        {
            id: 10,
            question: "0,8 dapat ditulis sebagai pecahan...",
            options: ["8/10", "8/100", "80/100", "800/1000"],
            correctAnswer: "8/10"
        },
        {
            id: 11,
            question: "2,5 - 1,75 = ...",
            options: ["0,75", "0,85", "0,95", "1,25"],
            correctAnswer: "0,75"
        },
        {
            id: 12,
            question: "3/4 dari 20 adalah...",
            options: ["12", "15", "16", "18"],
            correctAnswer: "15"
        },
        {
            id: 13,
            question: "Manakah urutan pecahan yang benar dari terkecil ke terbesar? ",
            options: ["1/4, 1/2, 3/4", "3/4, 1/2, 1/4", "1/2, 1/4, 3/4", "1/4, 3/4, 1/2"],
            correctAnswer: "1/4, 1/2, 3/4"
        },
        {
            id: 14,
            question: "0,1 + 0,2 + 0,3 = ...",
            options: ["0,5", "0,6", "0,7", "0,8"],
            correctAnswer: "0,6"
        },
        {
            id: 15,
            question: "Berapa hasil dari 5/6 - 1/6?",
            options: ["2/3", "3/4", "4/6", "5/6"],
            correctAnswer: "2/3"
        },
        {
            id: 16,
            question: "1,25 dapat ditulis sebagai...",
            options: ["1 1/4", "1 1/2", "1 2/5", "1 3/4"],
            correctAnswer: "1 1/4"
        },
        {
            id: 17,
            question: "Berapa 1/4 + 1/4 + 1/4?",
            options: ["1/4", "2/4", "3/4", "4/4"],
            correctAnswer: "3/4"
        },
        {
            id: 18,
            question: "0,50 + 0,25 = ...",
            options: ["0,65", "0,70", "0,75", "0,85"],
            correctAnswer: "0,75"
        },
        {
            id: 19,
            question: "Manakah yang lebih besar: 3/5 atau 0,6?",
            options: ["3/5", "0,6", "Sama besar", "Tidak bisa dibandingkan"],
            correctAnswer: "0,6"
        },
        {
            id: 20,
            question: "2/3 dari 30 adalah...",
            options: ["15", "18", "20", "25"],
            correctAnswer: "20"
        }
    ];

    React.useEffect(() => {
        if (quizStarted && !showResults) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowResults(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [quizStarted, showResults]);

    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [currentQuestion]: answer });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        Object.keys(answers).forEach(questionIndex => {
            if (answers[questionIndex] === questions[questionIndex].correctAnswer) {
                correct++;
            }
        });
        return (correct / questions.length) * 100;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    if (!quizStarted) {
        return (
            <div className="min-h-screen bg-slate-50 p-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-10">
                        <CardContent className="p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kuis Matematika Kelas 4</h1>
                            <p className="text-gray-600 mb-6">Pecahan dan Desimal</p>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <Timer className="w-5 h-5 mr-2" />
                                    <span>Durasi: 30 menit</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    <span>20 Soal</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setQuizStarted(true)}
                                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Mulai Kuis
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (showResults) {
        const score = calculateScore();
        return (
            <div className="min-h-screen bg-slate-50 p-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="p-10">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Hasil Kuis</h2>
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-5xl font-bold mb-2 text-green-500">{score.toFixed(1)}%</div>
                                    <p className="text-gray-600">Nilai Anda</p>
                                </div>
                                <Progress value={score} className="h-3" />
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-xl font-bold text-gray-800">
                                            {Object.values(answers).filter((answer, index) => answer === questions[index].correctAnswer).length}
                                        </div>
                                        <p className="text-gray-600">Jawaban Benar</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-xl font-bold text-gray-800">
                                            {Object.values(answers).filter((answer, index) => answer !== questions[index].correctAnswer).length}
                                        </div>
                                        <p className="text-gray-600">Jawaban Salah</p>
                                    </div>
                                </div>
                                <Link
                                    href="/configure/quiz"
                                    className="block w-full text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Kembali ke Daftar Kuis
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mt-6">
                        <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Pembahasan</h3>
                            <div className="space-y-6">
                                {questions.map((question, index) => (
                                    <div key={index} className="border-b pb-4 last:border-b-0">
                                        <div className="flex items-start">
                                            <div className="mr-3">
                                                {answers[index] === question.correctAnswer ? (
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 mb-2">
                                                    {index + 1}. {question.question}
                                                </p>
                                                <p className="text-gray-600">Jawaban Anda: {answers[index]}</p>
                                                <p className="text-green-600">Jawaban Benar: {question.correctAnswer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-2xl mx-auto">
                <Card className="p-10">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <Timer className="w-5 h-5 mr-2 text-gray-600" />
                                <span className="text-gray-600">{formatTime(timeLeft)}</span>
                            </div>
                            <div className="text-gray-600">
                                Soal {currentQuestion + 1} dari {questions.length}
                            </div>
                        </div>

                        <Progress
                            value={(currentQuestion / questions.length) * 100}
                            className="h-2 mb-6"
                        />

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                {questions[currentQuestion].question}
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        className={`p-4 text-left rounded-lg border transition-colors ${answers[currentQuestion] === option
                                            ? 'bg-green-50 border-green-500 text-green-700'
                                            : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Sebelumnya
                            </button>
                            {currentQuestion === questions.length - 1 ? (
                                <button
                                    onClick={() => setShowResults(true)}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Selesai
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Selanjutnya
                                </button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default QuizPage;