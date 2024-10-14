import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { Chequebook } from '../data/schema'
import { formatDatetime } from "@/lib/utils"
import { CustomDialog } from './custom-dialog'
import { PrintButton } from '@/components/print-button'



type CustomColumnDef = ColumnDef<Chequebook> & {
      visible?:boolean;
}
export const columns: CustomColumnDef[] = [


  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Code' />
    ),
    cell: ({ row }) => <div className='w-32'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" className='max-w-22' />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'edit',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Modifier' />
    ),
    cell: ({ row }) => <CustomDialog row={row} submitEndPoint={`chequebooks/reactivate/${row.getValue('id')}`} />,
    enableSorting: false,
    enableHiding: false,
    visible: localStorage.getItem("role")==="ROLE_ADMIN",
  }
]

