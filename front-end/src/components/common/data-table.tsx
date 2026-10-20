'use client';

import {
  flexRender,
  tableFeatures,
  useTable,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';

export const appTableFeatures = tableFeatures({});

export interface DataTableProps<TData extends RowData> {
  data: TData[];
  columns: ReadonlyArray<ColumnDef<typeof appTableFeatures, TData, unknown>>;
  className?: string;
}

export function DataTable<TData extends RowData>({
  data,
  columns,
  className = '',
}: DataTableProps<TData>) {
  const table = useTable({
    features: appTableFeatures,
    data,
    columns: columns as ColumnDef<typeof appTableFeatures, TData, unknown>[],
  });

  return (
    <div className={`min-h-0 flex-1 overflow-auto pb-4 ${className}`.trim()}>
      <table className="w-full min-w-max border-separate border-spacing-y-2.5">
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="group bg-white transition-shadow hover:shadow-md"
            >
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-y border-line px-4 py-3 align-middle first:rounded-l-[4px] first:border-l first:pl-6 last:rounded-r-[4px] last:border-r last:pr-6"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
