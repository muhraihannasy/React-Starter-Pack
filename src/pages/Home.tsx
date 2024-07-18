import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import { format } from 'date-fns';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import units from '@/data/unit';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  ListItemType,
  RenderHeader,
  columns as columnsDefault
} from '@/components/invoice-generator/columns';
import { DataTable } from '@/components/invoice-generator/datatable';
import {
  CalendarIcon,
  ClipboardPlus,
  PackageMinus,
  Settings2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { formatToRupiah } from '@/helper';
import DonwloadPDF from './Products';

const listItemSchema = z.object({
  no: z.number(),
  uraian: z.string().min(10, {
    message: 'minimal uraian 10 kata'
  }),
  quantity: z.number(),
  unit_price: z.number(),
  unit_type: z.string(),
  total: z.number()
});

const formSchema = z.object({
  from: z.string().min(5).max(50),
  to: z.string().min(5).max(50),
  no: z.string().min(5).max(50),
  from_npwp: z.string().min(5).max(50),
  to_npwp: z.string().min(5).max(50),
  date: z.date()
});

function Home() {
  const [isOpenModal, setIsOpenModal] = useState({
    status: false,
    payload: {}
  });
  const [isOpenModalPreview, setIsOpenModalPreview] = useState(false);

  const [mode, setMode] = useState('add');

  const [listItems, setListItems] = useState<ListItemType[]>([
    {
      no: 1,
      quantity: 100,
      total: 0,
      unit_price: 100,
      uraian: `Pupuk Urea. Non subsidi. EX PT Pupuk Kujang.
PO. No. 120830810283 Tgl: 0/512:2024

 > No. Faktur Pajak
1085081203810283`,
      unit_type: 'MG'
    },
    {
      no: 1,
      quantity: 100,
      total: 0,
      unit_price: 100,
      uraian: `Pupuk Urea. Non subsidi. EX PT Pupuk Kujang.
PO. No. 120830810283 Tgl: 0/512:2024

 > No. Faktur Pajak
1085081203810283`,
      unit_type: 'MG'
    },
    {
      no: 1,
      quantity: 100,
      total: 0,
      unit_price: 100,
      uraian: `Pupuk Urea. Non subsidi. EX PT Pupuk Kujang.
PO. No. 120830810283 Tgl: 0/512:2024

 > No. Faktur Pajak
1085081203810283`,
      unit_type: 'MG'
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: 'PT Hurip Utama',
      to: 'PT Puspetindo Jaya Abadi',
      no: '0581028312',
      from_npwp: '50182308124',
      to_npwp: '58012830',
      date: new Date()
    }
  });

  const handleAddItem = useCallback((item: ListItemType) => {
    setListItems((prev) => [...prev, item]);
  }, []);

  const handleOpenModalAdd = useCallback(() => {
    setMode('add');
    setIsOpenModal({ payload: {}, status: true });
  }, []);

  const handleOpenModalEdit = useCallback((payload: ListItemType) => {
    setMode('edit');
    setIsOpenModal({ payload, status: true });
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const columns = useMemo(
    () => [
      ...columnsDefault,
      {
        accessorKey: 'total',
        header: () => <RenderHeader text="Jumlah Harga / Total" />,
        cell: ({ row }) => {
          return (
            <div className="flex items-start justify-center gap-4 h-[100px]">
              <button
                type="button"
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-blue-200 text-blue-500"
                onClick={() => handleOpenModalEdit(row?.original)}
              >
                <Settings2 />
              </button>

              <button
                type="button"
                className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-red-300 text-red-500"
              >
                <PackageMinus />
              </button>
            </div>
          );
        }
      }
    ],
    []
  );

  return (
    <section className="max-w-[1200px] mx-auto mt-[1.7em]">
      <h2 className="text-[1.5em] font-semibold mb-6">Faktur Invoice</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-[1.6em]"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dari</FormLabel>
                    <FormControl>
                      <Input placeholder="......" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="from_npwp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPWP</FormLabel>
                    <FormControl>
                      <Input placeholder="......" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor</FormLabel>
                    <FormControl>
                      <Input placeholder="......" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pilih Tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kepada</FormLabel>
                    <FormControl>
                      <Input placeholder="......" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="to_npwp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPWP</FormLabel>
                    <FormControl>
                      <Input placeholder="......" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end w-full">
            <Button
              type="button"
              className="gap-2"
              onClick={handleOpenModalAdd}
            >
              Tambah Item
              <ClipboardPlus size={20} />
            </Button>
          </div>

          <DataTable columns={columns} data={listItems} />

          <ModalAdd
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
            amountItems={listItems?.length}
            onAddItem={handleAddItem}
            mode={mode}
          />

          <Button type="submit">Submit</Button>
          <Button
            type="button"
            onClick={() => setIsOpenModalPreview(true)}
            className="ml-4"
          >
            Preview
          </Button>
        </form>
      </Form>

      <ModalPreview
        isOpen={isOpenModalPreview}
        setIsOpen={setIsOpenModalPreview}
        data={{
          ...form.getValues(),
          items: listItems
        }}
      />
    </section>
  );
}

function ModalAdd({
  setIsOpenModal,
  isOpenModal,
  amountItems,
  onAddItem,
  mode
}: {
  isOpenModal: {
    status: boolean;
    payload: any;
  };
  setIsOpenModal: Dispatch<
    SetStateAction<{
      status: boolean;
      payload: any;
    }>
  >;
  amountItems: number;
  onAddItem: (item: ListItemType) => void;
  mode: string;
}) {
  const [formData, setFormData] = useState<ListItemType>({
    no: 0,
    uraian: '',
    quantity: 0,
    total: 0,
    unit_price: 0,
    unit_type: 'PCS'
  });

  function reset() {
    setFormData({
      no: 0,
      uraian: '',
      quantity: 0,
      total: 0,
      unit_price: 0,
      unit_type: 'PCS'
    });
  }

  function handleAddItem() {
    const item = {
      ...formData,
      no: amountItems + 1
    };

    onAddItem(item);
    setIsOpenModal(false);
    reset();
  }

  function handleChangeForm(field: string, value: string | number) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      handleChangeForm(field, newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'Tab' ||
      e.key === 'Enter'
    ) {
      return;
    }

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (mode == 'edit') {
      setFormData(isOpenModal?.payload);
    }
  }, [mode]);

  return (
    <Dialog
      open={isOpenModal.status}
      onOpenChange={(value) =>
        setIsOpenModal((prev: any) => ({ ...prev, status: value }))
      }
    >
      <DialogContent aria-describedby="content">
        <DialogHeader className="mb-[0.5em]">
          <DialogTitle>Tambah Item</DialogTitle>
        </DialogHeader>

        <Textarea
          name="uraian"
          label="Uraian"
          onChange={(e) => handleChangeForm('uraian', e.target.value)}
          value={formData?.uraian}
        />

        <div className="flex items-end gap-4">
          <Input
            type="number"
            name="quantity"
            label="Quantity"
            className="flex-1"
            onChange={(e) => handleChange(e, 'quantity')}
            onKeyDown={handleKeyDown}
            value={formData?.quantity}
          />

          <Select
            onValueChange={(value) => handleChangeForm('unit_type', value)}
            value={formData?.unit_type}
          >
            <SelectTrigger className="max-w-[180px]">
              <SelectValue placeholder="Pilih Satuan" />
            </SelectTrigger>

            <SelectContent>
              {units?.map((item) => (
                <SelectItem
                  key={item?.symbol}
                  value={item?.symbol}
                  className="cursor-pointer"
                >
                  {item?.name} ({item?.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-[1em]">
          <Input
            type="number"
            name="unit_price"
            label="Harga Satuan"
            onChange={(e) => handleChange(e, 'unit_price')}
            onKeyDown={handleKeyDown}
            value={formData?.unit_price}
          />

          <p className="mt-[12px] text-sm text-slate-500">
            {formatToRupiah(formData?.unit_price)}{' '}
            {formData?.quantity > 0 &&
              `per ${formData?.quantity} ${formData?.unit_type}`}
          </p>
        </div>

        <Button type="button" onClick={handleAddItem}>
          Tambahkan Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import LoaderCircle from '@/components/loader/LoaderCircle';

const options: any = {
  // default is `save`
  method: 'open',
  // default is Resolution.MEDIUM = 3, which should be enough, higher values
  // increases the image quality but also the size of the PDF, so be careful
  // using values higher than 10 when having multiple pages generated, it
  // might cause the page to crash or hang.
  resolution: Resolution.MEDIUM,
  page: {
    // margin is in MM, default is Margin.NONE = 0
    margin: Margin.MEDIUM,
    // default is 'A4'
    format: 'A4',
    // default is 'portrait'
    orientation: 'portrait'
  },
  canvas: {
    // default is 'image/jpeg' for better size performance
    mimeType: 'image/png',
    qualityRatio: 1
  },
  // Customize any value passed to the jsPDF instance and html2canvas
  // function. You probably will not need this and things can break,
  // so use with caution.
  overrides: {
    // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
    pdf: {
      compress: true
    },
    // see https://html2canvas.hertzen.com/configuration for more options
    canvas: {
      useCORS: false
    }
  }
};

const getTargetElement = () => document.getElementById('content-id');

function ModalPreview({ isOpen, setIsOpen, data = {} }) {
  const [loading, setLoading] = useState(false);

  function downloadToPDF() {
    setLoading(true);

    generatePDF(getTargetElement, options).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby="content"
        className="max-w-[800px] max-h-[900px] overflow-y-scroll"
      >
        <DialogHeader className="mb-[0.5em]">
          <DialogTitle>Tambah Item</DialogTitle>
        </DialogHeader>

        <DonwloadPDF data={data} />
      </DialogContent>
    </Dialog>
  );
}
export default Home;
