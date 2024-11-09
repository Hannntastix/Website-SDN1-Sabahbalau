import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../../components/ui/dialog';
import Image from 'next/image';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { Button, buttonVariants } from '../../../components/ui/button';
import { useEffect, useState } from 'react';

const Modal = ({ isOpen, setIsOpen }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-[99999999]">
                <DialogContent className="z-[9999999] bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <DialogHeader>
                        <div className='relative mx-auto w-24 h-24 mb-2'>
                        </div>
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

                    <div className='grid grid-cols-1 gap-6 divide-x divide-gray-200'>
                        <Button
                            onClick={() => {
                                handleDeleteQuiz(); // Lakukan penghapusan
                                closeModal(); // Tutup modal setelah penghapusan
                            }}
                            className={buttonVariants}
                        >
                            Ya
                        </Button>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
}

export default Modal;