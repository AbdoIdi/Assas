import { Card } from '@/components/ui/card'
import { UserAuthForm } from './components/user-auth-form'
import { useAuth } from '@/hooks/use-auth';

export default function Login() {
  
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[750px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
          <img src="/images/login-logo.png"></img>
          </div>
          <Card className='p-6'>
            <UserAuthForm />
            {/* <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p> */}
          </Card>
        </div>
      </div>
    </>
  )
}
