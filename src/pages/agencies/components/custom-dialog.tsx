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
import { useFetch } from "@/hooks/use-fetch"


const formSchema = z.object({
    username: z
        .string()
        .regex(new RegExp(/^[a-zA-Z_]$/), {
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
        .regex(new RegExp(/^[a-zA-Z ]$/), {
            message: "Regex error",
        })
        .min(1, {
            message: "Erreur",
        })
        .max(30, {
            message: "Erreur",
        }),
    active: z.boolean(),    
})

interface DialogProps<> {
    submitEndPoint: string;
    row:any
}
export function CustomDialog({ row,submitEndPoint }: DialogProps) {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username:row.getValue("username")
        },
    });

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
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifer un utilisateur</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 grid gap-4 py-4">

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel className="text-right">Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input className="col-span-3" placeholder="Par exemple 1-5, 8, 11-13" {...field} />
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
