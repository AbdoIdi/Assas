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
import { useState } from "react"
import { api } from "@/adapters/api"


const formSchema = z.object({
    name: z.string(),
    chief: z.string(),
    phone: z.string(),
    image: z.string(),
    email: z.string(),
    matricule: z.string()
})

interface DialogProps<> {
    submitEndPoint: string
}
export function CustomDialog({ submitEndPoint }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState();
    const [fileObj, setFileObj] = useState();

    const [error, setError] = useState(false);
    async function handleChange(e,field) {
        field.onChange(`annuary/${e.target.files[0].name}`);

        setFile(e.target.files[0]);
        setFileObj(URL.createObjectURL(e.target.files[0]));

    }
 
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    });

    function _arrayBufferToBase64( buffer ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
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
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // const pages: number[] = values.pages
        //     .split(",")
        //     .map(s=>range(parseInt(s.split("-")[0]),parseInt(s.split("-")[1])))
        //     .flatMap(s=>s);

        //     await api.put(submitEndPoint, pages);

        // await fetch(`http://localhost:3000/api/chequebooks/reactivate/`+id, {
        //     method:"PUT",
        //     headers: {
        //         "Content-Type":"application/json",
        //         "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdXBlcmFkbWluIiwiaWF0IjoxNzI0NjY4OTQ0LCJleHAiOjE3MjUyNzM3NDR9.8xhln8Z2ZSSIsdwGq14Moc44_nMcsZ8Nnq3mOSujpYw2i21spyCvpuw9ZgWkXneY"
        //     },
        //     body: JSON.stringify(pages),
        //     cache: 'no-store'
        // });   

        await uploadImage(file,"annuary");
        await api.post("offices", values);

        setOpen(false);
        form.reset();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary rounded-3xl w-48 flex justify-between">
                    <span>Nouvel Bureaux</span>
                    <span className="font-bold text-xl">+</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajout d'un bureau</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid gap-4 py-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom du bureau</FormLabel>
                                    <FormControl>
                                        <>
                                        <Input  className="col-span-3" placeholder="" {...field} />
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
                                        <Input type="file" className="col-span-3" placeholder="" onChange={($event)=>handleChange($event,field)}/>
                                        <img src={fileObj} style={{height:100,aspectRatio:1/1}}/>
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
