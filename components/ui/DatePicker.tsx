'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface DatePickerProps {
    value: string        // YYYY-MM-DD
    onChange: (val: string) => void
    placeholder?: string
    required?: boolean
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

export function DatePicker({ value, onChange, placeholder = 'Pick a date', required }: DatePickerProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const today = new Date()
    const parsed = value ? new Date(value + 'T00:00:00') : null

    const [view, setView] = useState({
        month: parsed ? parsed.getMonth() : today.getMonth(),
        year: parsed ? parsed.getFullYear() : today.getFullYear(),
    })

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    function prevMonth() {
        setView(v => {
            const d = new Date(v.year, v.month - 1)
            return { month: d.getMonth(), year: d.getFullYear() }
        })
    }
    function nextMonth() {
        setView(v => {
            const d = new Date(v.year, v.month + 1)
            return { month: d.getMonth(), year: d.getFullYear() }
        })
    }

    function getDays() {
        const first = new Date(view.year, view.month, 1).getDay()
        const total = new Date(view.year, view.month + 1, 0).getDate()
        const prevTotal = new Date(view.year, view.month, 0).getDate()
        const cells: { day: number; cur: boolean }[] = []

        for (let i = first - 1; i >= 0; i--)
            cells.push({ day: prevTotal - i, cur: false })
        for (let i = 1; i <= total; i++)
            cells.push({ day: i, cur: true })
        while (cells.length % 7 !== 0)
            cells.push({ day: cells.length - total - first + 1, cur: false })

        return cells
    }

    function select(day: number) {
        const d = new Date(view.year, view.month, day)
        const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        onChange(iso)
        setOpen(false)
    }

    function isSelected(day: number) {
        if (!parsed) return false
        return parsed.getFullYear() === view.year &&
            parsed.getMonth() === view.month &&
            parsed.getDate() === day
    }

    function isToday(day: number) {
        return today.getFullYear() === view.year &&
            today.getMonth() === view.month &&
            today.getDate() === day
    }

    const display = parsed
        ? parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : ''

    return (
        <div ref={ref} className="relative">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="input flex items-center gap-2 w-full text-left cursor-pointer"
            >
                <Calendar className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <span className={display ? 'text-slate-100' : 'text-slate-500'}>
                    {display || placeholder}
                </span>
            </button>

            {/* Hidden native input for form required validation */}
            <input
                type="hidden"
                value={value}
                required={required}
            />

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-1.5 w-72 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50 p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={prevMonth}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold text-slate-100">
                            {MONTHS[view.month]} {view.year}
                        </span>
                        <button
                            type="button"
                            onClick={nextMonth}
                            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Day headers */}
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-xs font-medium text-slate-500 py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Day cells */}
                    <div className="grid grid-cols-7 gap-0.5">
                        {getDays().map((cell, i) => (
                            <button
                                key={i}
                                type="button"
                                disabled={!cell.cur}
                                onClick={() => cell.cur && select(cell.day)}
                                className={[
                                    'flex h-8 w-full items-center justify-center rounded-lg text-xs font-medium transition-colors',
                                    !cell.cur
                                        ? 'text-slate-700 cursor-default'
                                        : isSelected(cell.day)
                                            ? 'bg-brand-500 text-white'
                                            : isToday(cell.day)
                                                ? 'border border-brand-500/50 text-brand-400 hover:bg-brand-500/10'
                                                : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100',
                                ].join(' ')}
                            >
                                {cell.day}
                            </button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3">
                        <button
                            type="button"
                            onClick={() => { onChange(''); setOpen(false) }}
                            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                const t = today
                                const iso = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
                                onChange(iso)
                                setView({ month: t.getMonth(), year: t.getFullYear() })
                                setOpen(false)
                            }}
                            className="text-xs text-brand-400 hover:text-brand-300 transition-colors"
                        >
                            Today
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}