import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import {  Company } from '../data/schema'
import { formatDatetime } from "@/lib/utils"
import { CustomDialog } from './custom-dialog'
import { PrintButton } from '@/components/print-button'



type CustomColumnDef = ColumnDef<Company> & {
      visible?:boolean;
}
export const columns: CustomColumnDef[] = [

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Entreprise' />
    ),
    cell: ({ row }) => <div className='w-60'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('email')}</div>,
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
      <DataTableColumnHeader column={column} title='Logo' className='max-w-12' />
    ),
    cell: ({ row }) => <img src={`${import.meta.env.VITE_API_URL}/public/${row.getValue('image')}`} className="h-8 rounded-full  "></img>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'adsPages',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Pages des annonces' className='w-32' />
    ),
    cell: ({ row }) => <div>{row.getValue('adsPages').replace(";",",")}</div>,
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

