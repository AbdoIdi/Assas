import { ColumnDef } from '@tanstack/react-table'

import { api } from '@/adapters/api'
import { AlertDialogComponent } from '@/components/alert-dialog'
import { Provider } from '../data/schema'
import { CustomDialogEdit } from './custom-dialog-edit'
import { DataTableColumnHeader } from './data-table-column-header'
import React from 'react'
import { CustomDialog } from './custom-dialog'



type CustomColumnDef = ColumnDef<Provider> & {
  visible?: boolean;
}
const deleteRow = async (id: number, table: any) => {
  await api.delete(`providers/${id}`)
}
export const columns: CustomColumnDef[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <div className={`${row.getValue('active') ? 'text-green-600' : 'text-red-600'}`}>
        {row.getValue('active') ? 'Active' : 'Inactive'}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'validFrom',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Valid From' />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('validFrom')).toLocaleDateString()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'validTo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Valid To' />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('validTo')).toLocaleDateString()}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'companyName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nom de la société' />
    ),
    cell: ({ row }) => <div>{row.getValue('companyName')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'adsPages',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ads Pages' />
    ),
    cell: ({ row }) => {
      const adsPages = row.getValue('adsPages');
      return <div>{adsPages.substring(0, 20)}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row }) => <CustomDialog selectedRow={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'delete',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='' className='max-w-12' />
    ),
    cell: ({ row, table }) => (
      <AlertDialogComponent handleConfirmed={() => deleteRow(row.original.id, table)}>
        <button className="text-red-600 hover:text-red-400 font-semibold py-2 px-4">
          Delete
        </button>
      </AlertDialogComponent>
    ),
    enableSorting: false,
    enableHiding: false,
  }
]

