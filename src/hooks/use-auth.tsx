import { jwtDecode } from 'jwt-decode' 

export const useAuth = () => {
    const signIn = async (username:string,password:string) => {

        const dynamicData =  await fetch(`http://localhost:9999/api/auth/login`, {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({username:username,password:password}),
            cache: 'no-store'
        });  
        try{
            await dynamicData.json().then(json=>{
                if(json){
                    localStorage.setItem("isAuthenticated", "true");
                    localStorage.setItem("token", json.accessToken);
                    localStorage.setItem("role",jwtDecode(json.accessToken).authorities[0].authority);
                }
            })
        }catch(e)
        {

        }

      return Promise.resolve(isLogged());
    };
  
    const signOut = () => {

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      return true;
    };
  
    const isLogged = () => localStorage.getItem("isAuthenticated") === "true";
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");



    return { signIn, signOut, isLogged, token, role };
  };
  
  export type AuthContext = ReturnType<typeof useAuth>;