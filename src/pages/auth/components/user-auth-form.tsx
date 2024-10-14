import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Saisissez ton nom d'utilisateur" }),
  password: z
    .string()
    .min(1, {
      message: "Saisissez ton mot de passe",
    })
    .min(8, {
      message: 'mot de passe doit etre au minimum 8 caractére',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState(false)
  let navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    auth.signIn(data.username,data.password)
    .then(res=>{
      console.log(res)

      if(res){
        navigate("/chequebooks")
        return
      }
      setAuthError(true);
    })
    .finally(()=>setIsLoading(false))

  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-12'>
            <FormLabel className='pt-3 text-destructive'>
              {authError &&
                  <span>
                  Le nom d'utilisateur ou le mot de passe est incorrect
                  </span>
              }
          
              </FormLabel>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormControl className='h-14'>
                    <Input placeholder='Numéro de téléphone ou email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    {/* <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                  <FormControl className='h-14'>
                    <PasswordInput placeholder='Mot de passe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2 h-14' loading={isLoading}>
            Se connecter
            </Button>

            {/* <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGithub className='h-4 w-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
