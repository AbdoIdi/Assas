import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { useFetch } from '@/hooks/use-fetch'
import { Card } from '@/components/ui/card'

export default function Chequebooks() {

  const { data, loading, error } = useFetch(`services`);


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
        </div>
        <div className='flex flex-row flex-wrap'>
          {data.map((e) =>
            <div className='basis-1/5 px-20 py-8 max-w-64 sm:basis-full'>

              <Card className="aspect-square">
                {e.name}
              </Card>
            </div>)
          }


        </div>
      </Layout.Body>
    </Layout>
  )
}
