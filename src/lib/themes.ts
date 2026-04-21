export const themes = {
    default: {
        name: 'Default',
        bg: 'bg-zinc-50',
        card: 'bg-white border border-zinc-200',
        text: 'text-zinc-900',
        subtext: 'text-zinc-500',
        button: 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50',
        avatar: 'bg-zinc-200',
    },
    dark: {
        name: 'Dark',
        bg: 'bg-zinc-950',
        card: 'bg-zinc-900',
        text: 'text-white',
        subtext: 'text-zinc-400',
        button: 'bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700',
        avatar: 'bg-zinc-700',
    },
    soft: {
        name: 'Soft',
        bg: 'bg-amber-50',
        card: 'bg-amber-50',
        text: 'text-amber-900',
        subtext: 'text-amber-600',
        button: 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-50',
        avatar: 'bg-amber-200',
    },
    gradient: {
        name: 'Gradient',
        bg: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400',
        card: 'bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400',
        text: 'text-white',
        subtext: 'text-white/80',
        button: 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30',
        avatar: 'bg-white/30',
    },
    bold: {
        name: 'Bold',
        bg: 'bg-violet-600',
        card: 'bg-violet-600',
        text: 'text-white',
        subtext: 'text-violet-200',
        button: 'bg-white text-violet-600 hover:bg-violet-50',
        avatar: 'bg-violet-400',
    },
}

export type ThemeKey = keyof typeof themes