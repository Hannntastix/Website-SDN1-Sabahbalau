import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../../components/ui/dialog';
import Image from 'next/image';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { buttonVariants } from '../../../components/ui/button';
import { useEffect } from 'react';

const LoginModal = ({ isOpen, setIsOpen }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-[99999999]">
                <DialogContent className="z-[9999999] bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center font-bold tracking-tight text-gray-900">
                            Sign in untuk melihat daftar soal
                        </DialogTitle>
                        <DialogDescription className="text-base text-center py-2">
                            <span className="font-medium text-zinc-900">
                                Data kamu aman tidak akan disalah gunakan :)
                            </span>{' '}
                            Silahkan Sign In terlebih dahulu yaa!
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                        <LoginLink className={buttonVariants({ variant: 'outline' })}>
                            Sign In
                        </LoginLink>
                        <RegisterLink className={buttonVariants({ variant: 'default' })}>
                            Sign up
                        </RegisterLink>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default LoginModal;
