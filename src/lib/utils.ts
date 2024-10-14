import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDatetime(datetimestring:string){

  return new Date(datetimestring)
            .toISOString()
            .replace(/T/, ' ')    
            .replace(/\..+/, '');
}

export function range(start:number, end:number){
    const out= Array.from({ length: end-start }, (_, i) => i + 1 + start )
    out.unshift(start);
    return out;
}
