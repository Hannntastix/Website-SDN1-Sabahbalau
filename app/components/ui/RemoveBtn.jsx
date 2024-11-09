"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../../components/ui/dialog';
import { Button, buttonVariants } from '../../../components/ui/button';

export default function RemoveBtn({ id }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isModalOpen]);

    const handleDeleteQuiz = async () => {
        const res = await fetch(`http://localhost:3000/api/quiz?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            window.location.reload();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* Tombol untuk membuka modal konfirmasi */}
            <button onClick={openModal} className="text-red-400">
                <HiOutlineTrash size={30} />
            </button>

            {/* Modal untuk konfirmasi penghapusan */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
                            Apakah Anda yakin ingin menghapus?
                        </DialogTitle>
                        <DialogDescription className='text-base text-center py-2'>
                            <span className='font-medium text-zinc-900'>
                                Paket Soal yang sudah dihapus tidak bisa dipulihkan!
                            </span>{' '}
                            Silahkan Konfirmasi
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-center gap-4 mt-4">
                        <Button
                            onClick={() => {
                                handleDeleteQuiz();
                                closeModal();
                            }}
                            className={buttonVariants()}
                        >
                            Ya
                        </Button>
                        <Button
                            onClick={closeModal}
                            className="bg-gray-300 text-blue-800 px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Tidak
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
