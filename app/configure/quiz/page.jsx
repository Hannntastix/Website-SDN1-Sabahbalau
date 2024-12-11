"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Timer, CheckCircle2, XCircle, Book, ArrowLeft, ListOrdered, AlignLeft, ArrowRight, Clock, PlusCircle } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
import { Progress } from '../../components/ui/progress';
import { Trophy, Target, Frown, BookOpen, Info, HelpCircle, Plus, Trash2, Save } from 'lucide-react';
import Link from 'next/link';
import { Textarea } from '../../../components/ui/textarea';
import LoadingModal from '../../components/ui/LoadingModal';
import RemoveBtn from '../../components/ui/RemoveBtn';
import { useRouter } from "next/navigation";
import { FaInfoCircle } from 'react-icons/fa';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import NotFound from '../../components/NotFound';

const QuizApp = () => {
    const [page, setPage] = useState('quizList');
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [selectedGrade, setSelectedGrade] = useState('4');
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quizScores, setQuizScores] = useState({});

    const { user } = useKindeBrowserClient();

    const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    const addQuiz = (newQuiz) => {
        setQuizzes(prevQuizzes => [...prevQuizzes, newQuiz]);
        setPage('quizList');
    };

    console.log({ user }, `dia adalah admin: ${isAdmin}`);

    if (user) {
        console.log("ini adalah user")
    } else {
        console.log("ini bukan user")
    }

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

    useEffect(() => {
        const savedScores = localStorage.getItem('quizScores');
        if (savedScores) {
            setQuizScores(JSON.parse(savedScores));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quizScores', JSON.stringify(quizScores));
    }, [quizScores]);



    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch('/api/quiz', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch quizzes");
                }

                const data = await res.json();
                setQuizzes(data.quizzes);
            } catch (error) {
                console.error("Error Loading Quizzes: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    const saveQuizScore = (quizId, score) => {
        setQuizScores(prev => ({
            ...prev,
            [quizId]: score
        }));
    };

    if (loading) {
        return <LoadingModal />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    function capitalizeFirstLetter(name) {
        if (!name) return '';
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }



    const QuizList = () => {

        const filteredQuizzes = useMemo(() => {
            return quizzes.filter(quiz => quiz.grade === selectedGrade);
        }, [quizzes, selectedGrade]);

        const savedScore = localStorage.getItem('quizScore');
        const score = savedScore ? parseFloat(savedScore) : 0;

        return (
            <div className="p-6">
                <div className="md:justify-end flex justify-center  items-center mb-6">
                    {user ? (
                        <>
                            {isAdmin ? (
                                <Button
                                    onClick={() => setPage('createQuestion')}
                                    className="bg-blue-950 flex items-center gap-2"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Tambah Paket Soal
                                </Button>
                            ) : null}
                        </>
                    ) : null}
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-600 mb-4">Daftar Paket Soal</h1>
                        {user ? (
                            <h1 className="text-3xl font-bold text-blue-800 mb-4">
                                Halo, {capitalizeFirstLetter(user.given_name)} 👋
                            </h1>

                        ) : null}
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
                    {Array.isArray(filteredQuizzes) && filteredQuizzes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredQuizzes.map((quiz) => {

                                return (
                                    <div
                                        key={quiz._id}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 relative"
                                    >
                                        {/* Subject Badge */}
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {quiz.description || 'No Description'}
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                                {quiz.difficulty || 'Default'}
                                            </span>
                                        </div>

                                        {/* Quiz Info */}
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            {quiz.title || 'Untitled Quiz'}
                                        </h3>

                                        {quizScores[quiz._id] !== undefined ? (
                                            <>
                                                {score < 65 ? (
                                                    <>
                                                        <p className=' font-semibold text-red-800'>Nilai terakhir: {score.toFixed(2)}</p>
                                                        <p className='mb-2 font-normal text-red-800'>Ayo tingkatkan lagi nilaimu!</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className=' font-semibold text-blue-800'>Nilai terakhir: {score.toFixed(2)}</p>
                                                        <p className='mb-2 font-normal text-blue-800'>Good Job!</p>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <p className='my-3 font-semibold text-slate-500'>Nilai terakhir: -</p>
                                        )}

                                        <span className="inline-flex mb-4 items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                            Kelas {quiz.grade || 'No Description'}
                                        </span>

                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{quiz.duration || 0} Menit</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{quiz.questions?.length || 0} Pertanyaan</span>
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
                                            {/* button dibawah ini harusnya dihapus ketika bukan admin akses */}
                                            {user ? (
                                                <>
                                                    {isAdmin ? (
                                                        <RemoveBtn id={quiz._id} />
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 w-full max-w-xl mx-auto p-6 rounded-lg shadow-lg">
                                <div className="flex flex-col items-center">
                                    <FaInfoCircle className="text-5xl text-blue-500 mb-4 animate-bounce" />
                                    <h1 className="text-2xl text-gray-800 font-semibold text-center mb-2">
                                        {!Array.isArray(quizzes) || quizzes.length === 0
                                            ? "Anda Belum Menambahkan Paket Soal"
                                            : `Belum ada paket soal untuk kelas ${selectedGrade}`}
                                    </h1>
                                    {user ? (
                                        <>
                                            {!isAdmin ? (
                                                <p className="text-lg text-gray-600 text-center mb-4">
                                                    {!Array.isArray(quizzes) || quizzes.length === 0
                                                        ? "Silahkan tambahkan paket soal untuk memulai."
                                                        : `Silahkan hubungi guru anda untuk informasi lebih lanjut 🙌`}
                                                </p>
                                            ) : null}
                                        </>
                                    ) : null}
                                    {/* Button ini harusnya dihapus ketika bukan admin yang akses */}
                                    {user ? (
                                        <>
                                            {isAdmin ? (
                                                <>
                                                    <p className="text-lg text-gray-600 text-center mb-4">
                                                        {!Array.isArray(quizzes) || quizzes.length === 0
                                                            ? "Silahkan tambahkan paket soal untuk memulai."
                                                            : `Silahkan tambahkan paket soal.`}
                                                    </p>
                                                    <button
                                                        onClick={() => setPage('createQuestion')}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                                                    >
                                                        Tambah Paket Soal
                                                    </button>
                                                </>
                                            ) : null}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
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

    {/* 
               <>
            {user ? (
                <>
                    
                </>
            ) : (
                <NotFound />
            )}
        </> 
                */}
    // Create Quiz Page Component
    const CreateQuestion = () => {

        const router = useRouter();
        const [formData, setFormData] = useState({
            title: "",
            description: "",
            grade: "4",
            difficulty: "",
            duration: "",
            questions: [{
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
                pembahasan: ""
            }]
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleQuestionChange = (index, field, value) => {
            setFormData(prev => {
                const newQuestions = [...prev.questions];
                if (field === "options") {
                    const optionIndex = parseInt(value.target.dataset.optionindex);
                    newQuestions[index].options[optionIndex] = value.target.value;
                } else {
                    newQuestions[index][field] = value.target.value;
                }
                return {
                    ...prev,
                    questions: newQuestions
                };
            });
        };

        const addQuestion = () => {
            setFormData(prev => ({
                ...prev,
                questions: [...prev.questions, {
                    question: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                    pembahasan: ""
                }]
            }));
        };

        const removeQuestion = (index) => {
            setFormData(prev => ({
                ...prev,
                questions: prev.questions.filter((_, i) => i !== index)
            }));
        };

        const isFormValid = useMemo(() => {
            const isQuizDetailsValid =
                formData.title.trim() !== "" &&
                formData.description.trim() !== "" &&
                formData.difficulty.trim() !== "" &&
                formData.duration.trim() !== "";

            const areQuestionsValid = formData.questions.every(question => {
                const isQuestionTextValid = question.question.trim() !== "";
                const areOptionsValid = question.options.every(opt => opt.trim() !== "");
                const isCorrectAnswerValid = question.correctAnswer.trim() !== "";
                const isPembahasanValid = question.pembahasan.trim() !== "";

                return isQuestionTextValid &&
                    areOptionsValid &&
                    isCorrectAnswerValid &&
                    isPembahasanValid;
            });
            return isQuizDetailsValid && areQuestionsValid;
        }, [formData]);

        const getValidationMessage = () => {
            if (!formData.title.trim()) return "Silahkan Isi Materi Soal terlebih dahulu";
            if (!formData.description.trim()) return "Silahkan Isi Mata Pelajaran terlebih dahulu";
            if (!formData.difficulty.trim()) return "Silahkan Isi Tingkat Kesulitan terlebih dahulu";
            if (!formData.duration.trim()) return "Silahkan Isi Durasi Pengerjaan Soal terlebih dahulu";

            for (let i = 0; i < formData.questions.length; i++) {
                const q = formData.questions[i];
                if (!q.question.trim()) return `Question ${i + 1}: Silahkan Isi Pertanyaan Soal terlebih dahulu`;
                if (q.options.some(opt => !opt.trim())) return `Question ${i + 1}: Silahkan Isi Pilihan Jawaban Soal terlebih dahulu`;
                if (!q.correctAnswer.trim()) return `Question ${i + 1}: Silahkan Isi Jawaban Benar terlebih dahulu`;
                if (!q.pembahasan.trim()) return `Question ${i + 1}: Silahkan Isi Pembahasan terlebih dahulu`;
            }

            return "";
        };

        const handleSubmit = async (e) => {
            e.preventDefault();

            if (!formData.title || !formData.description || !formData.grade ||
                !formData.difficulty || !formData.duration) {
                alert("Please fill in all quiz details");
                return;
            }

            const isQuestionsValid = formData.questions.every(q =>
                q.question &&
                q.options.every(opt => opt.trim() !== "") &&
                q.correctAnswer &&
                q.pembahasan
            );

            if (!isQuestionsValid) {
                alert("Please complete all question fields");
                return;
            }

            try {
                const res = await fetch("https://website-sdn-1-sabahbalau.vercel.app/api/quiz", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    setPage("quizList");
                    window.location.reload();
                } else {
                    throw new Error("Failed to create quiz");
                }
            } catch (error) {
                console.error("Error creating quiz:", error);
                alert("Failed to create quiz");
            }
        };

        return (
            <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex md:flex-row flex-col justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-600">Sistem Manajemen Soal</h1>
                    <Button onClick={() => setPage('quizList')} className="my-5 bg-blue-950">Kembali ke daftar soal</Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Quiz Details Card */}
                    <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                                Detail Soal
                            </h2>
                            <div className="bg-blue-50 text-blue-600 text-sm py-1 px-3 rounded-full">
                                Step 1 of 2
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    Nama Materi
                                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help"
                                        title="Enter a clear, descriptive title for your quiz" />
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Nama Materi"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Mata Pelajaran</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan Mata Pelajaran"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Kelas</label>
                                <select
                                    name="grade"
                                    value={formData.grade}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                >
                                    <option value="4">Kelas 4</option>
                                    <option value="5">Kelas 5</option>
                                    <option value="6">Kelas 6</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Tingkat Kesulitan</label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                >
                                    <option value="">Pilih Tingkat Kesulitan</option>
                                    <option value="Mudah">Mudah</option>
                                    <option value="Sedang">Sedang</option>
                                    <option value="Sulit">Sulit</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Durasi Pengerjaan (menit)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="Masukkan durasi (dalam menit)"
                                    min="1"
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-500" />
                                Soal
                            </h2>
                            <div className="bg-blue-50 text-blue-600 text-sm py-1 px-3 rounded-full">
                                Step 2 of 2
                            </div>
                        </div>

                        {formData.questions.map((question, questionIndex) => (
                            <div key={questionIndex}
                                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-blue-200 transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        Soal No. {questionIndex + 1}
                                        {questionIndex === 0 && (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs py-1 px-2 rounded-full">
                                                Diperlukan Minimal 1 Soal
                                            </span>
                                        )}
                                    </h3>
                                    {formData.questions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(questionIndex)}
                                            className="text-red-500 hover:text-red-700 flex items-center gap-2 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Hapus
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Pertanyaan</label>
                                        <textarea
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(questionIndex, "question", e)}
                                            placeholder="Masukkan Pertanyaan..."
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            rows="2"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-gray-700">Pilihan Jawaban</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="relative">
                                                    <div className="absolute left-3 top-3 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                                                        {String.fromCharCode(65 + optionIndex)}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        data-optionindex={optionIndex}
                                                        onChange={(e) => handleQuestionChange(questionIndex, "options", e)}
                                                        placeholder={`Opsi ${optionIndex + 1}`}
                                                        className="border border-gray-300 rounded-lg p-3 pl-12 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            Jawaban Benar
                                            <HelpCircle className="w-4 h-4 text-gray-400 cursor-help"
                                                title="Select the correct answer from your options" />
                                        </label>
                                        <select
                                            value={question.correctAnswer}
                                            onChange={(e) => handleQuestionChange(questionIndex, "correctAnswer", e)}
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                        >
                                            <option value="">Pilih Jawaban Benar</option>
                                            {question.options.map((option, optIndex) => (
                                                option.trim() && (
                                                    <option key={optIndex} value={option}>
                                                        {String.fromCharCode(65 + optIndex)} - {option}
                                                    </option>
                                                )
                                            ))}
                                        </select>
                                        {question.correctAnswer && (
                                            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                                                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-xs font-medium">
                                                    {String.fromCharCode(65 + question.options.findIndex(opt => opt === question.correctAnswer))}
                                                </span>
                                                Merupakan jawaban yang benar
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Pembahasan</label>
                                        <textarea
                                            value={question.pembahasan}
                                            onChange={(e) => handleQuestionChange(questionIndex, "pembahasan", e)}
                                            placeholder="Silahkan berikan penjelasan untuk jawaban benar..."
                                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            rows="3"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addQuestion}
                            className="bg-white border-2 border-dashed border-blue-300 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 w-full flex items-center justify-center gap-2 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Pertanyaan
                        </button>
                    </div>

                    <div className="space-y-2">
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${isFormValid
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            <Save className="w-5 h-5" />
                            {isFormValid ? "Simpan Soal" : "Isi semua informasi telebih dahulu"}
                        </button>

                        {/* Validation message */}
                        {!isFormValid && (
                            <div className="text-center">
                                <p className="text-orange-500 text-sm mt-2">
                                    {getValidationMessage()}
                                </p>
                            </div>
                        )}

                        {/* Form completion status */}
                        <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mt-2">
                            <div className="flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                <span>Status Formulir:</span>
                            </div>
                            <span className={`font-medium ${isFormValid ? "text-green-600" : "text-orange-500"}`}>
                                {isFormValid ? "Ready to Submit" : "Belum Lengkap"}
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    // Take Quiz Page Component
    const TakeQuiz = (score) => {
        useEffect(() => {
            if (timeLeft === 0) {
                saveQuizScore(currentQuiz._id, score);
                setPage('results');
            }
        }, [timeLeft]);

        const handleAnswer = (answer) => {
            setUserAnswers(prev => ({
                ...prev,
                [currentQuestion]: answer
            }));
        };

        // Add function to check if all questions are answered
        const areAllQuestionsAnswered = () => {
            return currentQuiz.questions.every((_, index) => userAnswers[index] !== undefined);
        };

        const progress = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;

        const isTimeWarning = timeLeft < 300;
        const isTimeCritical = timeLeft < 60;

        const currentQuestionData = currentQuiz.questions[currentQuestion];

        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                {/* Top Navigation Bar */}
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <Button onClick={() => setPage('quizList')} className="my-5 bg-blue-950 mx-2"><ArrowLeft /></Button>
                        <h1 className="text-2xl font-bold text-blue-950 truncate">
                            {currentQuiz.title}
                        </h1>
                        {/* Timer with dynamic styling */}
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isTimeCritical ? 'bg-red-100 text-red-700 animate-pulse' :
                            isTimeWarning ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                            }`}>
                            <Clock className="w-5 h-5" />
                            <span className="font-semibold">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar and Question Counter */}
                <div className="max-w-4xl mx-auto mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">
                            Pertanyaan {currentQuestion + 1} dari {currentQuiz.questions.length}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                            {progress.toFixed(0)}% selesai
                        </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Main Question Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Question Header */}
                        <div className="p-6 bg-blue-50 border-b border-blue-100">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <HelpCircle className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-lg font-medium text-gray-800 leading-relaxed">
                                    {currentQuestionData.question}
                                </p>
                            </div>
                        </div>

                        {/* Answer Options */}
                        <div className="p-6">
                            <RadioGroup
                                value={userAnswers[currentQuestion] || ""}
                                onValueChange={handleAnswer}
                                className="space-y-4"
                            >
                                {currentQuestionData.options.map((option, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative flex items-center p-4 rounded-lg transition-all ${userAnswers[currentQuestion] === option
                                            ? 'bg-blue-50 border-2 border-blue-500'
                                            : 'border-2 border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        <RadioGroupItem
                                            value={option}
                                            id={`answer${idx}`}
                                            className="absolute left-4"
                                        />
                                        <Label
                                            htmlFor={`answer${idx}`}
                                            className="flex-grow ml-8 cursor-pointer font-medium text-gray-700"
                                        >
                                            {option}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Navigation Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <Button
                                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                    disabled={currentQuestion === 0}
                                    variant="outline"
                                    className="flex items-center gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </Button>

                                <div className="flex items-center gap-2">
                                    {currentQuestion === currentQuiz.questions.length - 1 ? (
                                        <Button
                                            onClick={() => {
                                                saveQuizScore(currentQuiz._id, score);
                                                setPage('results');
                                            }}
                                            disabled={!areAllQuestionsAnswered()}
                                            className={`flex items-center gap-2 ${areAllQuestionsAnswered()
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-green-600 cursor-not-allowed text-white'
                                                }`}
                                            title={!areAllQuestionsAnswered() ? "Harap jawab semua pertanyaan terlebih dahulu" : ""}
                                        >
                                            Submit
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                        >
                                            Next
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Question Navigation Pills */}
                    <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {currentQuiz.questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestion(idx)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                    ${idx === currentQuestion
                                            ? 'bg-blue-600 text-white'
                                            : userAnswers[idx]
                                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };



    const Results = ({ setScore }) => {
        const correctAnswersCount = currentQuiz.questions.reduce((acc, question, idx) => {
            return acc + (question.correctAnswer === userAnswers[idx] ? 1 : 0);
        }, 0);

        const score = (correctAnswersCount / currentQuiz.questions.length) * 100;

        localStorage.setItem('quizScore', score.toFixed(2));

        useEffect(() => {
            setScore(Math.round(score));
        }, [score, setScore]);

        const scoreMessage = score === 100
            ? "Wow, kamu dapat nilai 100! Kamu hebat sekali! 🎉"
            : score >= 80
                ? "Wah, hebat banget! Nilaimu luar biasa! Terus rajin belajar, ya, biar makin pintar! 🌟"
                : score >= 60
                    ? "Bagus! Nilaimu sudah keren! Terus semangat belajar supaya bisa lebih tinggi lagi! 💪"
                    : "Jangan sedih, ya! Kamu sudah berusaha dengan baik. Yuk, belajar lagi biar nanti hasilnya makin bagus! 📚";

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
                                <span>Indikator Progres Pengerjaan Soal</span>
                                <span>Benar {correctAnswersCount} dari {currentQuiz.questions.length} soal</span>
                            </div>
                            <Progress value={score} className="h-3" />
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Akurasi</p>
                                <p className="text-xl font-bold text-gray-800">{Math.round(score)}%</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <BookOpen className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Benar</p>
                                <p className="text-xl font-bold text-gray-800">{correctAnswersCount}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg text-center">
                                <Frown className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                <p className="text-sm text-gray-600">Salah</p>
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