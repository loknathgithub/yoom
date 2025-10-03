import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
interface MeetingModalProps{
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    buttonText?: string;
    handleClick?: () => void;
    className?: string;
    buttonIcon?: string;
    image?: string;
    children?: ReactNode;
}


const MeetingModal = ({isOpen, onClose, title, buttonText, handleClick, className, buttonIcon, image, children}: MeetingModalProps) => {
  return (
    <section>
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className='flex w-full max-w-[520px] flex-col gap-6  bg-[var(--color-sidebar-primary-bg)] border-none px-6 py-9 text-white'>
            <div className='flex flex-col gap-6 items-center'>
                {image && (
                    <Image src={image} alt='image' width={72} height={72} className='max-sm:size-18' />
                )}
            </div>

            <DialogTitle className={cn('flex-center font-bold text-2xl', className)}>{title}</DialogTitle>
            <h1 className={cn('flex-center font-bold text-2xl leading-[42px]', className)}>{children}</h1>

            <Button className="bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] focus-visible:ring-0 focus-visible:ring-offset-0 cursor-pointer text-lg items-center" onClick={handleClick}>
                {buttonIcon && (
                    <Image src={buttonIcon} alt='image' width={20} height={20} className='max-sm:size-4' />
                )} &nbsp;
                {buttonText || 'Schedule Meeting'}</Button>
        </DialogContent>
        </Dialog>
    </section>
  )
}

export default MeetingModal