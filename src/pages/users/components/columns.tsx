import { ColumnDef } from '@tanstack/react-table'

import { Chequebook } from '../data/schema'
import { CustomDialog } from './custom-dialog'
import { DataTableColumnHeader } from './data-table-column-header'



type CustomColumnDef = ColumnDef<Chequebook> & {
      visible?:boolean;
}
export const columns: CustomColumnDef[] = [


  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nom' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom d'utilisateur" className='max-w-22' />
    ),
    cell: ({ row }) => <div>{row.getValue('username')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'enabled',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Active" className='max-w-12' />
    ),
    cell: ({ row }) => <div>{row.getValue('enabled')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modifier' />
    ),
    cell: ({ row }) => <CustomDialog row={row} btnTxt='Modifier' />,
    enableSorting: false,
    enableHiding: false,
    visible: localStorage.getItem("role")==="ROLE_ADMIN",
  }
]

