import { useState, useEffect } from 'react'
import en from '@/messages/en.json'
import pt from '@/messages/pt.json'

const messages = { en, pt }

type Locale = 'en' | 'pt'

export function useLocale() {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale | undefined

    if (cookie && ['en', 'pt'].includes(cookie)) {
      setLocale(cookie)
    }
  }, [])

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = messages[locale]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  return { t, locale }
}