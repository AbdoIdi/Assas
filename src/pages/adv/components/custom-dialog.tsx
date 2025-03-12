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
import React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    name: z.string(),
    companyId: z.number(),
    validFrom: z.date(),
    validTo: z.date(),
    image: z.string(),
    adsPages: z.string().array()
})

interface DialogProps<> {
    selectedRow?: any
}

interface Service {
    id: number;
    name: string;
    specialities: {
        id: number;
        name: string;
    }[];
}

export function CustomDialog({ selectedRow }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Service[]>([])
    const [error, setError] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    function _arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    const uploadFile = async (file: File, path: string) => {
        const form = new FormData();
        const base64String = await file.arrayBuffer()
        form.append('file', _arrayBufferToBase64(base64String));
        form.append('path', path);
        form.append('fileName', file.name);
        await api.postObj("upload", form).then((res) => {
            setError(res.status !== 200)
        })
    }
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('services')
                setServices(await response.json())
            } catch (error) {
                console.error('Failed to fetch services:', error)
            }
            // setImagePreview(`${apiUrl}/public/${selectedRow?.image}`)
        }
        fetchServices()
    }, [])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: selectedRow?.name || "",
            image: selectedRow?.image || "",
            validFrom: new Date(selectedRow?.validFrom) || new Date(),
            validTo: new Date(selectedRow?.validTo) || new Date(),
            companyId: selectedRow?.companyId || 0,
            adsPages: selectedRow?.adsPages || []
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            form.setValue('image', `ads/${file.name}`);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const PAGE_OPTIONS = [
        { value: 'services', label: 'Services' },
        { value: 'annuary', label: 'Annuaire de l\'ordre' },
        { value: 'laws', label: 'Normes' },
        { value: 'terrassement', label: 'Terrassement' },
        { value: 'construction', label: 'Construction' },
        { value: 'electricity', label: 'Électricité' },
        { value: 'carpentry', label: 'Menuiserie' },
        { value: 'plumbing', label: 'Plomberie' },
        { value: 'firefighting', label: 'Lutte contre les incendies' },
        { value: 'isolation', label: 'Isolation' },
        { value: 'decoration', label: 'Décoration' },
        { value: 'airconditioning', label: 'Climatisation' }
    ];

    async function onSubmit(values: z.infer<typeof formSchema>) {

        if (imageFile) {
            await uploadFile(imageFile, "ads")
        }
        await api.post("ads", { ...values, adsPages: values.adsPages.join(";") });
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    selectedRow ? <button className="text-green-600 hover:text-green-400 font-semibold py-2 px-4">
                        Modifier
                    </button>

                        : <Button className="bg-primary rounded-3xl w-48 flex justify-between">
                            <span>Nouvelle publicité</span>
                            <span className="font-bold text-xl">+</span>
                        </Button>
                }

            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ajouter une nouvelle publicité</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations de la publicité
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0 grid grid-cols-2 gap-6 py-4">
                        {Object.keys(formSchema.shape).map((fieldName) => (
                            <FormField
                                key={fieldName}
                                control={form.control}
                                name={fieldName as keyof z.infer<typeof formSchema>}
                                render={({ field }) => (
                                    <FormItem className={fieldName === 'adsPages' ? 'col-span-2' : ''}>
                                        <FormLabel className="text-right capitalize">
                                            {fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                        </FormLabel>
                                        <FormControl>
                                            {fieldName === 'adsPages' ? (
                                                <div className="flex gap-2 flex-wrap">
                                                    {PAGE_OPTIONS.map((option) => (
                                                        <div key={option.value} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id={option.value}
                                                                checked={field.value.includes(option.value)}
                                                                onChange={(e) => {
                                                                    const updatedValue = e.target.checked
                                                                        ? [...field.value, option.value]
                                                                        : field.value.filter((val: string) => val !== option.value);
                                                                    field.onChange(updatedValue);
                                                                }}
                                                            />
                                                            <label htmlFor={option.value}>{option.label}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : fieldName === 'image' ? (
                                                <>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    {imagePreview && (
                                                        <img src={imagePreview} alt="Image Preview" className="mt-2 h-100 w-100" />
                                                    )}
                                                    <img src={`${import.meta.env.VITE_API_URL}/public/${selectedRow?.image}`} className="h-8 rounded-full  "></img>
                                                </>
                                            ) : fieldName === 'validFrom' || fieldName === 'validTo' ? (
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                                                    onChange={e => field.onChange(new Date(e.target.value))}
                                                />
                                            ) : fieldName === 'companyId' ? (
                                                <Input
                                                    type="number"
                                                    {...field}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                />
                                            ) : (
                                                <Input {...field} />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        <DialogFooter className="col-span-2">
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
