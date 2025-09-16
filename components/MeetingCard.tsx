"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

interface MeetingCardProps {
title: string;
date: string;
icon: string;
isPreviousMeeting?: boolean;
buttonIcon1?: string;
buttonText?: string;
handleClick: () => void;
link: string;
}

const MeetingCard = ({
icon,
title,
date,
isPreviousMeeting,
buttonIcon1,
handleClick,
link,
buttonText,
}: MeetingCardProps) => {
const { toast } = useToast();

return (
<section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[var(--color-sidebar-primary-bg)] px-5 py-8 xl:max-w-full">
    <article className="flex flex-col gap-5">
    <Image src={icon} alt="upcoming" width={28} height={28} />
    <div className="flex justify-between">
        <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base font-normal">{date}</p>
        </div>
    </div>
    </article>
    <article className={cn("flex justify-center relative", {})}>
    <div className="relative flex w-full max-sm:hidden">
        {avatarImages.map((img, index) => (
        <Image
            key={index}
            src={img}
            alt="attendees"
            width={40}
            height={40}
            className={cn("rounded-full", { absolute: index > 0 })}
            style={{ top: 0, left: index * 28 }}
        />
        ))}
        <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
        +5
        </div>
    </div>
    {!isPreviousMeeting && (
        <div className="flex gap-2 pr-4">
        <Button onClick={handleClick} className="justify-center rounded-lg bg-[var(--color-isActive)] hover:bg-[var(--color-isActive-hover)] p-4 cursor-pointer">
            {buttonIcon1 && (
            <Image src={buttonIcon1} alt="feature" width={20} height={20} />
            )}
            &nbsp; {buttonText}
        </Button>
        <Button
            onClick={() => {
            navigator.clipboard.writeText(link);
            toast({
                title: "Link Copied",
            });
            }}
            className="justify-center rounded-lg bg-[var(--button-background)] hover:bg-[var(--button-background-hover)] p-4 cursor-pointer"
        >
            <Image
            src="/icons/copy.svg"
            alt="feature"
            width={20}
            height={20}
            />
            &nbsp; Copy Link
        </Button>
        </div>
    )}
    </article>
</section>
);
};

export default MeetingCard;