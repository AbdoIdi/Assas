import { api } from "@/adapters/api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    name: z.string(),
    chief: z.string(),
    phone: z.string(),
    image: z.string(),
    email: z.string().optional(),
    matricule: z.string()
})

interface DialogProps<> {
    submitEndPoint: string;
    selectedRow?: any;
}
export function CustomDialog({ submitEndPoint, selectedRow }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState();
    const [fileObj, setFileObj] = useState();

    const [error, setError] = useState(false);
    async function handleChange(e, field) {
        field.onChange(`annuary/${e.target.files[0].name}`);

        setFile(e.target.files[0]);
        setFileObj(URL.createObjectURL(e.target.files[0]));

    }

    useEffect(() => {
        fetchData();
    }, [selectedRow])

    async function fetchData() {
        let response = await fetch(`${import.meta.env.VITE_API_URL}/public/${selectedRow.image}`);
        let data = await response.blob();
        let metadata = {
        };
        let file1 = new File([data], "test.jpg", metadata);
        setFileObj(URL.createObjectURL(file1));


    }



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { ...selectedRow },
    });

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const uploadImage = async (file: File, path: string) => {
        const form = new FormData();
        const base64String = await file.arrayBuffer()
        form.append('file', _arrayBufferToBase64(base64String));
        form.append('path', path);
        form.append('fileName', file.name);
        await api.postObj("upload", form).then((res) => {
            setError(res.status !== 200)
        })
    }
    async function onSubmit(values: z.infer<typeof formSchema>) {


        values.image !== selectedRow?.image && await uploadImage(file, "annuary");
        selectedRow
            ? await api.put(`offices/${selectedRow.id}`, values)
            : await api.post("offices", values);


        setOpen(false);
        form.reset();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    selectedRow
                        ?
                        <button className="text-green-600 hover:text-green-500 font-semibold py-2 px-4"> Modifier </button>

                        :
                        <Button className="bg-primary rounded-3xl w-48 flex justify-between">
                            <span>Nouvel Bureaux</span>
                            <span className="font-bold text-xl">+</span>
                        </Button>
                }

            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Ajout d'un bureau</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 gap-2 grid py-2 overflow-scroll">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom du bureau</FormLabel>
                                    <FormControl>
                                        <>
                                            <Input className="col-span-3" placeholder="" {...field} />
                                        </>
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="chief"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom du chef</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="matricule"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">matricule</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Telephone</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Email</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Image</FormLabel>
                                    <FormControl>
                                        <>
                                            <Input type="file" className="col-span-3" placeholder="" onChange={($event) => handleChange($event, field)} />
                                            <img src={fileObj} style={{ height: 100, aspectRatio: 1 / 1 }} />
                                        </>
                                    </FormControl>
                                    <FormMessage className="col-span-3" />
                                </FormItem>
                            )}
                        />

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
