import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useFetch } from '@/hooks/use-fetch';
import { IconPrinter } from '@tabler/icons-react';
import { api } from '@/adapters/api';


interface PrintButtonProps extends React.HTMLAttributes<HTMLElement> {
    fileEndPoint:string;
}; 
export function PrintButton({fileEndPoint}:PrintButtonProps) {

    async function printCheckbook() {

        const response = await api.get(fileEndPoint);
        const blob = await response.blob();
        
        const iframe = document.createElement('iframe');  
        iframe.style.visibility = "hidden"; 
        iframe.src = URL.createObjectURL(blob);        
        document.body.appendChild(iframe);  
        iframe.contentWindow.focus();       
        iframe.contentWindow.print();
        window.location.reload();
        
      }
  return (
    <Button onClick={printCheckbook} variant="outline" size="icon"><IconPrinter size={25}  /></Button>
  )
}
