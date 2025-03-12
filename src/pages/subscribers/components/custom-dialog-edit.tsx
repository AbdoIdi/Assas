import { api } from "@/adapters/api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { useState } from "react"
import { z } from "zod"
import { Provider } from "../data/schema"
import React from "react"


const formSchema = z.object({
    pages: z
        .string()
        .regex(new RegExp(/^(\d+|\d+-\d+)(,(\d+|\d+-\d+))*$/), {
            message: "Regex error",
        }),
})

interface DialogProps<> {
    provider: Provider
}
export function CustomDialogEdit({ provider }: DialogProps) {
    const [open, setOpen] = useState(false)


    async function onSubmit(isValid: boolean) {

        await api.put(`providers/validate-request/${provider.id}`, {})


        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                {provider.status === "request_sent" && <button className="text-green-600 hover:text-green-500 font-semibold py-2 px-4">
                    Ouvrir le fichier
                </button>}

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Détails du profil du demandeur</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-5">
                    <img src={`${import.meta.env.VITE_API_URL}/public/${provider.avatar}`} className="h-8 rounded-full  "></img>
                    <span>{provider.name}</span>
                </div>
                <div className="flex gap-5 items-center ">
                    <img src="/images/email.png" className="h-4"></img>

                    <span>{provider.email}</span>
                </div>
                <div className="flex gap-5 items-center">
                    <img src="/images/phone.png" className="h-5"></img>
                    <span>{provider.phoneNumber}</span>
                </div>
                <div className="flex gap-5 items-center">
                    <span>NNI</span>
                    <span></span>
                </div>
                <div className="flex gap-5 items-center">
                    <img src="/images/position.png " className="h-4"></img>
                    <span></span>
                </div>
                <div className="flex gap-5 items-center">
                    <span>Une copie de la carte d'identité</span>
                    <a href={`${import.meta.env.VITE_API_URL}/public/verification-documents/verification-documents/${provider.identityDocument}`} download target="_blank">

                        <img src="/images/download.png" className="h-4" ></img>

                    </a>

                    <span></span>
                </div>
                <div className="flex gap-5 items-center">
                    <span>Une copie du certificat d'ingénieur</span>
                    <a href={`${import.meta.env.VITE_API_URL}/public/verification-documents/identity-documents/${provider.verificationDocument}`} download target="_blank">

                        <img src="/images/download.png" className="h-4" ></img>

                    </a>                    <span></span>
                </div>
                <div className="flex gap-5 items-center justify-center">

                    <Button className="bg-slate-500 hover:bg-slate-400  rounded-3xl w-32 flex justify-between">
                        <span>rejeter</span>
                        <span className="font-bold text-xl">+</span>
                    </Button>
                    <Button className="bg-primary rounded-3xl w-32 flex justify-between" onClick={() => onSubmit(true)}>
                        <span>Acceptation</span>
                        <span className="font-bold text-xl">+</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
