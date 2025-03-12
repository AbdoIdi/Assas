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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    name: z.string(),
    icon: z.string(),

})

interface DialogProps<> {
    submitEndPoint: string
}
export function CustomDialog({ submitEndPoint }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState();
    const [fileObj, setFileObj] = useState();
    const [setError] = useState(false);
    
    async function handleChange(e,field) {
        field.onChange(`services-icons/${e.target.files[0].name}`);

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
 
        await uploadImage(file,"services-icons");
        await api.post("services", values);

        setOpen(false);
        form.reset();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary rounded-3xl w-64 flex justify-between">
                    <span>Ajouter un service</span>
                    <span className="font-bold text-xl">+</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ajout d'un service</DialogTitle>
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
                                    <FormLabel className="text-right">Nom du service</FormLabel>
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
                            name="icon"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Logo</FormLabel>
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
              

                        <DialogFooter>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
