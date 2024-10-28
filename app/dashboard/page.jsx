"use client";

import React, { useState, useEffect } from 'react';
import { PlusCircle, Timer, Book, AlignLeft } from 'lucide-react';
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

const QuizApp = () => {
  const [page, setPage] = useState('quizList');
  const [quizzes, setQuizzes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedGrade, setSelectedGrade] = useState('4');

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

  const handleDeleteQuiz = (quizId) => {
    setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
  };

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
    ],
    '5': [
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
        id: 'ips-6-1',
        subject: 'IPS',
        title: 'Negara ASEAN',
        duration: '30 menit',
        questions: 20,
        difficulty: 'Sedang',
      },
    ],
  };

  // Create Quiz Page State
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
    correctAnswer: ""
  });

  // Timer logic for TakeQuiz
  useEffect(() => {
    let timer;
    if (page === 'takeQuiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [page, timeLeft]);

  // Helper function to format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Quiz List Page Component
  const QuizList = () => (
    <div className="p-6">
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={() => setPage('createQuiz')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Quiz
        </Button>
      </div>

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

              {/* Action Button */}
              <button
                className="block w-full text-center bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                onClick={() => {
                  setCurrentQuiz(quiz);
                  setTimeLeft(quiz.duration * 60);
                  setCurrentQuestion(0);
                  setPage('takeQuiz');
                }}
              >
                Mulai Kuis
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4'>
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

  // Create Quiz Page Component
  const CreateQuiz = () => {
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
      correctAnswer: ""
    });

    const addQuestion = () => {
      setNewQuiz(prev => ({
        ...prev,
        questions: [...prev.questions, { ...currentNewQuestion, id: prev.questions.length + 1 }]
      }));
      setCurrentNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      });
    };

    const removeQuestion = (index) => {
      setNewQuiz((prev) => ({
        ...prev,
        questions: prev.questions.filter((_, questionIdx) => questionIdx !== index)
      }));
    };

    const saveQuiz = () => {
      setQuizzes(prev => [
        ...prev,
        { ...newQuiz, id: prev.length + 1, questionCount: newQuiz.questions.length }
      ]);
      setPage('quizList');
    };

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Quiz Management System</h1>
          <Button onClick={() => setPage('quizList')}>Back to List</Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Quiz Title</Label>
              <Input
                value={newQuiz.title}
                onChange={(e) =>
                  setNewQuiz((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                value={newQuiz.description}
                onChange={(e) =>
                  setNewQuiz((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Enter quiz Subject"
              />
            </div>
            <div>
              <Label>Difficulty</Label>
              <Input
                value={newQuiz.difficulty}
                onChange={(e) =>
                  setNewQuiz((prev) => ({ ...prev, difficulty: e.target.value }))
                }
                placeholder="Enter quiz difficulty"
              />
            </div>
            <div>
              <Label>Duration (minutes)</Label>
              <Input
                type="number"
                value={newQuiz.duration}
                onChange={(e) =>
                  setNewQuiz((prev) => ({ ...prev, duration: e.target.value }))
                }
                placeholder="Enter duration in minutes"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Question</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Question</Label>
              <Input
                value={currentNewQuestion.question}
                onChange={(e) => setCurrentNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Enter question"
              />
            </div>
            {currentNewQuestion.options.map((option, idx) => (
              <div key={idx}>
                <Label>Option {idx + 1}</Label>
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentNewQuestion.options];
                    newOptions[idx] = e.target.value;
                    setCurrentNewQuestion(prev => ({ ...prev, options: newOptions }));
                  }}
                  placeholder={`Enter option ${idx + 1}`}
                />
              </div>
            ))}
            <div>
              <Label>Correct Answer</Label>
              <RadioGroup
                value={currentNewQuestion.correctAnswer}
                onValueChange={(value) => setCurrentNewQuestion(prev => ({ ...prev, correctAnswer: value }))}
              >
                {currentNewQuestion.options.map((option, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`option${idx}`} />
                    <Label htmlFor={`option${idx}`}>{option || `Option ${idx + 1}`}</Label>
                  </div>
                ))}
              </RadioGroup>
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
          <Button onClick={saveQuiz} className="w-full mt-6">
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
          <h1 className="text-3xl font-bold">{currentQuiz.title}</h1>
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
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentQuestion < currentQuiz.questions.length - 1) {
                  setCurrentQuestion(prev => prev + 1);
                } else {
                  // Handle quiz submission
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


  const Results = () => {
    const correctAnswersCount = currentQuiz.questions.reduce((acc, question, idx) => {
      return acc + (question.correctAnswer === userAnswers[idx] ? 1 : 0);
    }, 0);

    const score = (correctAnswersCount / currentQuiz.questions.length) * 100;
    const scoreMessage = score === 100
      ? "Perfect Score! Amazing job! 🎉"
      : score >= 80
        ? "Great job! Very well done! 🌟"
        : score >= 60
          ? "Good effort! Keep practicing! 💪"
          : "Keep learning! You'll do better next time! 📚";

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Results</h1>
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
                className="bg-blue-600 hover:bg-blue-700"
              >
                Back to Quiz List
              </Button>
              <Button
                onClick={() => setPage('review')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Review Answers
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {page === 'quizList' && <QuizList />}
      {page === 'createQuiz' && <CreateQuiz />}
      {page === 'takeQuiz' && <TakeQuiz />}
      {page === 'results' && <Results />}
    </div>
  );
};

export default QuizApp;