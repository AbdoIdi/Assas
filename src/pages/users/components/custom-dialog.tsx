import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { range } from "@/lib/utils"
import { useEffect, useState } from "react"
import { api } from "@/adapters/api"

import { Switch } from "@/components/ui/switch"
import { useFetch } from "@/hooks/use-fetch"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

const formSchema = z.object({
    username: z
        .string()
        .regex(new RegExp(/^[a-zA-Z_]+$/), {
            message: "Regex error",
        })
        .min(1, {
            message: "Erreur",
        })
        .max(30, {
            message: "Erreur",
        }),
    name: z
        .string()
        .regex(new RegExp(/^[a-zA-Z ]+$/), {
            message: "Regex error",
        })
        .min(1, {
            message: "Erreur",
        })
        .max(30, {
            message: "Erreur",
        }),
    enabled: z.boolean(),
})

interface DialogProps<> {
    submitEndPoint?: string;
    row?: any;
    btnTxt: string;
}
type Checked = DropdownMenuCheckboxItemProps["checked"]

export function CustomDialog({ row, submitEndPoint,btnTxt }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [dropdownShown, setDropdownShown] = useState(false)
    const { data, loading, error } = useFetch(`agencies`);
    const [showStatusBar, setShowStatusBar] = useState<Checked[]>([])
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)
    const [showPanel, setShowPanel] = useState<Checked>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...row?.original,
        },
    });
    useEffect(()=>{
        console.log(row?.original.controlledAgencies)
        if(row && data){
            const ids:[] = row?.original.controlledAgencies.map(r=>r.id);
            setShowStatusBar(
                data.map(d=>ids.includes(d.id))
            );
        }
    

    },[row,data])
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // // ✅ This will be type-safe and validated.
        // const pages: number[] = values.pages
        //     .split(",")
        //     .map(s => range(parseInt(s.split("-")[0]), parseInt(s.split("-")[1])))
        //     .flatMap(s => s);

        // await api.put('chequebooks/reactivate', pages);


        setOpen(false);
        form.reset();
    }
    function handleItemClicked(index:number,checked:Checked) {
        const nextShowStatusBar = showStatusBar.map((c, i) => {
          if (i === index) {
            // Increment the clicked counter
            return checked;
          } else {
            // The rest haven't changed
            return c;
          }
        });
        setShowStatusBar(nextShowStatusBar);
      }
    
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="">{btnTxt}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifer un utilisateur</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3"  {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="enabled"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Active</FormLabel>
                                    <FormControl>
                                        <Switch
                                            className="ml-3"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <DropdownMenu open={dropdownShown}>
                            <DropdownMenuTrigger asChild>
                                <Button onClick={()=>setDropdownShown(true)} variant="outline">Agences</Button>
                            </DropdownMenuTrigger>
                            {data && 
                                  <DropdownMenuContent className="w-56" onInteractOutside={()=>setDropdownShown(false)}>
                                  <DropdownMenuSeparator />
                                  {data.map((val,index) =>
                                      <DropdownMenuCheckboxItem
                                          checked={showStatusBar[index]}
                                          onCheckedChange={v=>handleItemClicked(index,v)}
                                        //   onCloseAutoFocus={false}

                                      >
                                          {val.id} - {val.name}
                                      </DropdownMenuCheckboxItem>
  
                                  )}
                              </DropdownMenuContent>
                            }
                      
                        </DropdownMenu>

                        {/* {data.map(
                            (val)=>           <FormField
                            control={form.control}
                            name="enabled"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">{val.id} - {val.name}</FormLabel>
                                    <FormControl>
                                        <Switch
                                            className="ml-3"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>

                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        )} */}

                        {/* <Label htmlFor="name" className="text-right">
              Pages
            </Label>
            <Input
              id="pages"
              placeholder="Par exemple 1-5, 8, 11-13"
              className="col-span-3"
            /> */}

                        <DialogFooter>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
