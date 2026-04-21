'use client'

interface Props {
  currentLocale?: string
}

export default function LanguageSwitcher({ currentLocale = 'en' }: Props) {
  async function handleChange(locale: string) {
    await fetch('/api/language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale })
    })
    window.location.reload()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleChange('en')}
        className={`text-xs transition-colors ${
          currentLocale === 'en'
            ? 'text-white font-semibold'
            : 'text-white/50 hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="text-white/30 text-xs">|</span>
      <button
        onClick={() => handleChange('pt')}
        className={`text-xs transition-colors ${
          currentLocale === 'pt'
            ? 'text-white font-semibold'
            : 'text-white/50 hover:text-white'
        }`}
      >
        PT
      </button>
    </div>
  )
}