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
    avatar: z.string(),
    sector: z.enum(["etude", "execution", "fourniture"]),
    email: z.string().email(),
    phoneNumber: z.string(),
    whatsapp: z.string(),
    specialityId: z.number(),
    identityDocument: z.string(),
    verificationDocument: z.string(),
    location: z.string(),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une lettre majuscule")
        .regex(/[a-z]/, "Le mot de passe doit contenir au moins une lettre minuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
        .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial"),
    description: z.string()
})

interface DialogProps<> {
    submitEndPoint: string
}

interface Service {
    id: number;
    name: string;
    specialities: {
        id: number;
        name: string;
    }[];
}

const fieldLabels: { [key: string]: string } = {
    name: "Nom",
    avatar: "Avatar",
    sector: "Secteur",
    email: "Email",
    phoneNumber: "Numéro de téléphone",
    whatsapp: "WhatsApp",
    specialityId: "Spécialité",
    identityDocument: "Document d'identité",
    verificationDocument: "Document de vérification",
    location: "Emplacement",
    password: "Mot de passe",
    description: "Description"
};

export function CustomDialog({ submitEndPoint }: DialogProps) {
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Service[]>([])
    const [error, setError] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [identityDocumentFile, setIdentityDocumentFile] = useState<File | null>(null)
    const [verificationDocumentFile, setVerificationDocumentFile] = useState<File | null>(null)


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
        }
        fetchServices()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            avatar: "",
            sector: "",
            email: "",
            phoneNumber: "",
            whatsapp: "",
            identityDocument: "",
            verificationDocument: "",
            location: "",
            description: "",
            password: ""
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setFile: (file: File | null) => void, path: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            // Set the form field value to a temporary string (will be updated with actual path after upload)
            form.setValue(fieldName as keyof z.infer<typeof formSchema>, `${path}/${file.name}`);
        }
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {

        uploadFile(avatarFile!, "avatars")
        uploadFile(identityDocumentFile!, "verification-documents/identity-documents")
        uploadFile(verificationDocumentFile!, "verification-documents/verification-documents")
        console.log(values)
        await api.post("providers", values);
        // setOpen(false);
        // form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary rounded-3xl w-48 flex justify-between">
                    <span>Nouveaux abonnés</span>
                    <span className="font-bold text-xl">+</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] h-full">
                <DialogHeader>
                    <DialogTitle>Ajouter un nouveau fournisseur</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations du fournisseur
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
                                    <FormItem className={fieldName === 'description' ? 'col-span-2' : ''}>
                                        <FormLabel className="text-right capitalize">
                                            {fieldLabels[fieldName] || fieldName.replace(/([A-Z])/g, ' $1').trim()}
                                        </FormLabel>
                                        <FormControl>
                                            {fieldName === 'sector' ? (
                                                <select
                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2"
                                                    {...field}
                                                >
                                                    <option value="">Sélectionner un secteur</option>
                                                    <option value="etude">Etude</option>
                                                    <option value="execution">Execution</option>
                                                    <option value="fourniture">Fourniture</option>
                                                </select>
                                            ) : fieldName === 'avatar' ? (
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'avatar', setAvatarFile, "avatars")}
                                                />
                                            ) : fieldName === 'identityDocument' ? (
                                                <Input
                                                    type="file"
                                                    // accept=".pdf,.doc,.docx"
                                                    onChange={(e) => handleFileChange(e, 'identityDocument', setIdentityDocumentFile, "verification-documents/identity-documents")}
                                                />
                                            ) : fieldName === 'verificationDocument' ? (
                                                <Input
                                                    type="file"
                                                    // accept=".pdf,.doc,.docx"
                                                    onChange={(e) => handleFileChange(e, 'verificationDocument', setVerificationDocumentFile, "verification-documents/verification-documents")}
                                                />
                                            ) : fieldName === 'rating' ? (
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    max={5}
                                                    {...field}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                />
                                            ) : fieldName === 'specialityId' ? (
                                                <select
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                                                    {...field}
                                                    onChange={e => field.onChange(Number(e.target.value))}
                                                >
                                                    <option value="">Sélectionner une spécialité</option>
                                                    {services.map((service) => (
                                                        <optgroup key={service.id} >
                                                            <option value={service.id}>{service.name}</option>
                                                            {service.specialities.map((speciality) => (
                                                                <option
                                                                    key={speciality.id}
                                                                    value={speciality.id}
                                                                >
                                                                    {speciality.name}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                            ) : fieldName === 'description' ? (
                                                <Input
                                                    {...field}
                                                    className="min-h-[100px]"
                                                />
                                            ) : fieldName === 'password' ? (
                                                <Input type="password" {...field} />
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
        </Dialog>
    )
}
