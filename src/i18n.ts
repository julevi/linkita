import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value ?? 'en'

  const messages = locale === 'pt'
    ? (await import('./messages/pt.json')).default
    : (await import('./messages/en.json')).default

  return {
    locale,
    messages
  }
})