    "use client"

    import * as React from "react"
    import { ChevronDownIcon } from "lucide-react"

    import { Button } from "@/components/ui/button"
    import { Calendar } from "@/components/ui/calendar"
    import { Input } from "@/components/ui/input"
    import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    } from "@/components/ui/popover"


    type DatePickerProps = {
    value?: string | null
    onChange?: (isoString: string | null) => void
    }

    export default function DatePicker({value, onChange}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [time, setTime] = React.useState(() => {
    if (value) {
        const d = new Date(value)
        return d.toTimeString().slice(0,5) // "HH:MM"
    }
    return ""
    })

    // keep internal state in sync if parent value changes
    React.useEffect(() => {
    if (value) {
        const d = new Date(value)
        setDate(d)
        setTime(d.toTimeString().slice(0,5))
    }
    }, [value])

    // combine and emit only when both date and time present
    const emit = React.useCallback((d: Date | undefined, t: string | undefined) => {
    if (!d || !t) {
        console.log("emit -> no date/time selected, sending null");
        onChange && onChange(null)
        return
    }
    const [hh, mm] = t.split(":").map(Number)
    const dt = new Date(d)
    dt.setHours(hh, mm, 0, 0)
    console.log("emit -> constructed Date:", dt, "ISO:", dt.toISOString());
    onChange && onChange(dt.toISOString()) // you can change format if you prefer
    }, [onChange])

    return (
    <div className="flex gap-4">
        <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                id="date-picker"
                className="w-40 justify-between font-normal bg-[#252A41] border-none text-white"
            >
                {date ? `${date.toLocaleDateString()} ${time ? time : ""}` : "Select date"}
                <ChevronDownIcon />
            </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(d) => {
                setDate(d)
                emit(d, time)
                setOpen(false)
                }}
                className="rounded-lg border"
            />
            </PopoverContent>
        </Popover>
        </div>

        <div className="flex flex-col gap-3">
        <Input
            type="time"
            id="time-picker"
            step="60"
            value={time}
            onChange={(e) => {
            setTime(e.target.value)
            emit(date, e.target.value)
            }}
            className="bg-[#252A41] border-none text-white font-normal"
        />
        </div>
    </div>
    )
    }

