import { formatToRupiah } from '@/helper';
import { ColumnDef } from '@tanstack/react-table';

export type ListItemType = {
  no: number;
  uraian: string;
  quantity: number;
  unit_price: number;
  total: number;
  unit_type?: string;
};

export function RenderHeader({ text }: { text: string }) {
  return <p className="text-center p-2" children={text} />;
}

function RenderCell({ text }: { text: string | number }) {
  return <p className="text-center h-[100px]" children={text} />;
}

export const columns: ColumnDef<ListItemType>[] = [
  {
    accessorKey: 'no',
    header: () => <RenderHeader text="No" />,
    cell: ({ row }) => <RenderCell text={row?.original?.no} />
  },
  {
    accessorKey: 'uraian',
    header: () => <RenderHeader text="U R A I A N" />,
    cell: ({ row }) => {
      const formattedData = row?.original?.uraian.replace(/\n/g, '<br />');

      return (
        <p
          className="max-w-[300px]"
          dangerouslySetInnerHTML={{ __html: formattedData }}
        />
      );
    }
  },
  {
    accessorKey: 'quantity',
    header: () => <RenderHeader text="Quantity" />,
    cell: ({ row }) => {
      const text = `${row?.original?.quantity} ${row?.original?.unit_type}`;
      return <RenderCell text={text} />;
    }
  },
  {
    accessorKey: 'unit_price',
    header: () => <RenderHeader text="Harga Satuan" />,
    cell: ({ row }) => (
      <RenderCell text={formatToRupiah(row?.original?.unit_price)} />
    )
  },
  {
    accessorKey: 'total',
    header: () => <RenderHeader text="Jumlah Harga / Total" />,
    cell: ({ row }) => {
      const quantity = row?.original?.quantity;
      const unitPrice = row?.original?.unit_price;
      const total = unitPrice * quantity;

      return <RenderCell text={formatToRupiah(total)} />;
    }
  }
];
