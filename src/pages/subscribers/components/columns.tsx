import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { formatDatetime } from "@/lib/utils"
import { CustomDialog } from './custom-dialog'
import { PrintButton } from '@/components/print-button'
import { CustomDialogEdit } from './custom-dialog-edit'
import { Provider } from '../data/schema'



type CustomColumnDef = ColumnDef<Provider> & {
      visible?:boolean;
}
export const columns: CustomColumnDef[] = [

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nom et Prénom' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'specialityName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Adjectif' />
    ),
    cell: ({ row }) => <div className='w-40'>{row.getValue('specialityName')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' className='max-w-36' />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='téléphone' className='max-w-36' />
    ),
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'avatar',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Image' className='max-w-36' />
    ),
    cell: ({ row }) => <img src={`${import.meta.env.VITE_API_URL}/public/${row.getValue('avatar')}`} className="h-8 rounded-full  "></img>
    ,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'Lieu',
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
    cell: ({ row }) => <CustomDialogEdit provider={row.original}/>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row }) => <button className="text-green-600 hover:text-green-500 font-semibold py-2 px-4">
    Modifier
  </button>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row }) => <button className="text-red-600 hover:text-red-400 font-semibold py-2 px-4">
    Supprimer
  </button>,
    enableSorting: false,
    enableHiding: false,
  }
]

