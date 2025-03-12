import { jwtDecode } from 'jwt-decode' 

export const useAuth = () => {
    const signIn = async (username:string,password:string) => {
        const basePath = import.meta.env.VITE_API_URL;

        const dynamicData =  await fetch(`${basePath}/login`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ email:username,password:password }),
            cache: 'no-store'
        });  
        try{
            if(dynamicData.status===200)
            await dynamicData.json().then(json=>{
                if(json){
                    localStorage.setItem("token", json.accessToken);
                    localStorage.setItem("role",jwtDecode(json.accessToken).authorities[0].authority);
                }
            })
        }catch(e)
        {
            console.log(e);
        }

      return Promise.resolve(isLogged());
    };
  
    const signOut = () => {

      localStorage.removeItem("token");
      return true;
    };
  
    const isLogged = () => !!localStorage.getItem("token");
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");



    return { signIn, signOut, isLogged, token, role };
  };
  
  export type AuthContext = ReturnType<typeof useAuth>;