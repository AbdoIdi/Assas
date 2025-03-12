import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { Chequebook } from '../data/schema'
import { formatDatetime } from "@/lib/utils"
import { CustomDialog } from './custom-dialog'
import { PrintButton } from '@/components/print-button'
import { AlertDialogComponent } from '@/components/alert-dialog'
import { api } from '@/adapters/api'



type CustomColumnDef = ColumnDef<Chequebook> & {
  visible?: boolean;
}

const deleteRow = async (id:number,table:any)=>{
    await api.delete(`offices/${id}`)
}
export const columns: CustomColumnDef[] = [

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bureau' />
    ),
    cell: ({ row }) => <div className='w-60'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'chief',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Chef du bureau' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('chief')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Numéro de téléphone' className='max-w-36' />
    ),
    cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Image' className='max-w-12' />
    ),
    cell: ({ row }) => <img src={`${import.meta.env.VITE_API_URL}/public/${row.getValue('image')}`} className="h-8 rounded-full  "></img>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'place',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lieu' className='w-32' />
    ),
    cell: ({ row }) => <div>{row.getValue('place')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row }) => <CustomDialog submitEndPoint='' selectedRow={row.original}/>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row,table }) => (
      <AlertDialogComponent handleConfirmed={() => deleteRow(row.original.id,table)}>
        <button className="text-red-600 hover:text-red-400 font-semibold py-2 px-4">
          Supprimer
        </button>
      </AlertDialogComponent>
    ),
    enableSorting: false,
    enableHiding: false,
  }
]

