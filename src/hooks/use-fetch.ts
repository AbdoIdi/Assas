import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "@/adapters/api"


export function useFetch(endpoint: string){
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

   useEffect(()=>{
      (
         async function(){

            try{

                setLoading(true)

                const response = await api.get(endpoint);

                if(response.status===401){
                    navigate("/login")
                    return;
                }
                const reponseData = await response.json();
                setData(reponseData)
                


            }catch(err){
                setError(err);
            }finally{
                setLoading(false);
            }
        
   
         }
      )()
   },[endpoint])

   return { data, error, loading }

}