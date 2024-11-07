// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import CreateQuestion from '@/app/configure/quiz/page'
// import { toast } from '@/components/ui/toast'

// export default function QuizManagementPage() {
//     const [saving, setSaving] = useState(false)
//     const router = useRouter()

//     const handleSaveQuiz = async (quizData) => {
//         try {
//             setSaving(true)
//             const response = await fetch('/api/quiz', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(quizData),
//             })

//             if (!response.ok) {
//                 throw new Error('Failed to save quiz')
//             }

//             toast({
//                 title: 'Success',
//                 description: 'Quiz berhasil disimpan',
//             })

//             router.push('/quiz')
//         } catch (error) {
//             console.error('Error saving quiz:', error)
//             toast({
//                 variant: 'destructive',
//                 title: 'Error',
//                 description: 'Gagal menyimpan quiz. Silakan coba lagi.',
//             })
//         } finally {
//             setSaving(false)
//         }
//     }

//     return (
//         <CreateQuestion onSave={handleSaveQuiz} disabled={saving} />
//     )
// }