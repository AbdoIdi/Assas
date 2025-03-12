import { api } from '@/adapters/api'
import { Layout } from '@/components/custom/layout'
import { Card } from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { useFetch } from '@/hooks/use-fetch'
import { IconX } from '@tabler/icons-react'
import { CustomDialog } from './components/custom-dialog'

export default function Chequebooks() {

  const { data } = useFetch(`services`);

  const onDelete = async (id)=>{
      await api.delete(`services/${id}`)
  }

  return (
    data &&
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        {/* <Search /> */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-12 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>L'administration du système</h2>
          </div>
        </div>
        <div className='mb-12 flex items-center justify-between space-y-10'>
          <div>
            <h3 className='text-l font-bold tracking-tight'>Services</h3>
          </div>
                <CustomDialog btnTxt='Ajouter' />
          
        </div>
        <div className='flex flex-row flex-wrap'>
          {data.map((e) =>
            <div className='basis-1/5 px-14 py-8 max-w-64 sm:basis-full'>
 <div className=' absolute ' onClick={()=>onDelete(e.id)}>         
                         <IconX />
                </div>  
              <Card className="aspect-square items-center justify-center flex flex-col  ">
             
              <img src={`${import.meta.env.VITE_API_URL}/public/${e.icon}`} ></img>
                <span className='text-center'>{e.name}</span>
               
              </Card>
            </div>)
          }


        </div>
      </Layout.Body>
    </Layout>
  )
}
