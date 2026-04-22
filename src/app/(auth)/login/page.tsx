import { getTranslations } from 'next-intl/server'
import LoginForm from '@/components/auth/LoginForm'

export default async function LoginPage() {
  const t = await getTranslations('login')

  return (
    <LoginForm
      t={{
        title: t('title'),
        subtitle: t('subtitle'),
        email: t('email'),
        password: t('password'),
        submit: t('submit'),
        loading: t('loading'),
        noAccount: t('noAccount'),
        signUp: t('signUp'),
      }}
    />
  )
}