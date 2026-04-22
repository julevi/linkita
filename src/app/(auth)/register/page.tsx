import { getTranslations } from 'next-intl/server'
import RegisterForm from '@/components/auth/RegisterForm'

export default async function RegisterPage() {
  const t = await getTranslations('register')

  return (
    <RegisterForm
      t={{
        title: t('title'),
        subtitle: t('subtitle'),
        name: t('name'),
        email: t('email'),
        username: t('username'),
        usernameHint: t('usernameHint'),
        password: t('password'),
        passwordHint: t('passwordHint'),
        submit: t('submit'),
        loading: t('loading'),
        hasAccount: t('hasAccount'),
        login: t('login'),
      }}
    />
  )
}