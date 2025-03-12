import { Layout } from '@/components/custom/layout'
import { UserNav } from '@/components/user-nav'
import { useFetch } from '@/hooks/use-fetch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'

export default function Users() {
  
  const {data} = useFetch(`users`);


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
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Gestion des utilisateurs</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
