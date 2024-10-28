"use client"

import Link from "next/link";
import { useState } from "react";

const Page = () => {
    const [selectedGrade, setSelectedGrade] = useState('4');

    const quizData = {
        '4': [
            {
                id: 'matematika-4-1',
                subject: 'Matematika',
                title: 'Pecahan dan Desimal',
                duration: '30 menit',
                questions: 20,
                difficulty: 'Mudah',
            },
            {
                id: 'ipa-4-1',
                subject: 'IPA',
                title: 'Struktur Tumbuhan',
                duration: '25 menit',
                questions: 15,
                difficulty: 'Sedang',
            },
            {
                id: 'ips-4-1',
                subject: 'IPS',
                title: 'Sumber Daya Alam',
                duration: '20 menit',
                questions: 15,
                difficulty: 'Mudah',
            },
        ],
        '5': [
            {
                id: 'matematika-5-1',
                subject: 'Matematika',
                title: 'Bangun Ruang',
                duration: '35 menit',
                questions: 25,
                difficulty: 'Sedang',
            },
            {
                id: 'ipa-5-1',
                subject: 'IPA',
                title: 'Sistem Pencernaan',
                duration: '30 menit',
                questions: 20,
                difficulty: 'Sedang',
            },
            {
                id: 'bahasa-5-1',
                subject: 'Bahasa Indonesia',
                title: 'Teks Narasi',
                duration: '25 menit',
                questions: 15,
                difficulty: 'Mudah',
            },
        ],
        '6': [
            {
                id: 'matematika-6-1',
                subject: 'Matematika',
                title: 'Statistika Dasar',
                duration: '40 menit',
                questions: 30,
                difficulty: 'Sulit',
            },
            {
                id: 'ipa-6-1',
                subject: 'IPA',
                title: 'Listrik dan Magnet',
                duration: '35 menit',
                questions: 25,
                difficulty: 'Sedang',
            },
            {
                id: 'ips-6-1',
                subject: 'IPS',
                title: 'Negara ASEAN',
                duration: '30 menit',
                questions: 20,
                difficulty: 'Sedang',
            },
        ],
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
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

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Daftar Kuis</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pilih kuis sesuai dengan tingkat kelas dan mata pelajaran yang ingin Anda pelajari
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
                                        ? 'bg-green-500 text-white'
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizData[selectedGrade].map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                        >
                            {/* Subject Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    {quiz.subject}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                    {quiz.difficulty}
                                </span>
                            </div>

                            {/* Quiz Info */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">{quiz.title}</h3>

                            <div className="space-y-2 mb-6">
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{quiz.duration}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{quiz.questions} Pertanyaan</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link
                                href={`/configure/quiz/${quiz.id}`}
                                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                            >
                                Mulai Kuis
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informasi Quiz</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    );
};

export default Page;