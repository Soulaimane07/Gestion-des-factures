import { useEffect, useState } from "react";
import { ServerUrl } from "./Variables";
import axios from "axios";

export const DocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

export const GetData = (link) => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get(`${ServerUrl}${link}`)
        .then((res)=> {
            setData(res.data)
        })
        .catch((err)=> {
            console.error(err);
        })

    }, [link])

    return data
}

export const GetDataa = (link) => {
    const [data, setData] = useState({})

    useEffect(()=> {
        axios.get(`${ServerUrl}${link}`)
        .then((res)=> {
            setData(res.data)
        })
        .catch((err)=> {
            console.error(err);
        })

    }, [link])

    return data
}



export const GetRas = (client, fournisseur) => {
    const [ras, setRas] = useState(0)

    useEffect(()=> {
        if(client.natureclient === 0 || client.natureclient === 1){
            if(fournisseur.activite === 1){
                setRas(0)
                console.log("1.1 ==>");
            }
        }
        if([2, 3, 4, 5].includes(client.natureclient)){
            if(fournisseur.activite === 1){
                if(fournisseur.reglementation){
                    console.log("1.2 ==>");
                    setRas(0)
                } else {
                    console.log("1.3 ==>");
                    if(fournisseur.fiscale){
                        setRas(0)
                    } else {
                        setRas(100)
                    }
                }
            }
        }
        if([6, 7].includes(client.natureclient)){
            if(fournisseur.activite === 1){
                console.log("1.4 ==>");
                if(fournisseur.fiscale){
                    setRas(0)
                } else {
                    setRas(100)
                }
            }
        }



        if(fournisseur.exoneration == 0){
            console.log("2.1==>",22);
            setRas(0)
            
        }
        if(fournisseur.exoneration == 1){
            if([0, 1, 2, 3, 4, 5].includes(client.natureclient)){
                console.log("2.2.1==>",22);
                setRas(75)
            } else {
                if(fournisseur.forme === 1){
                    if([6, 7].includes(client.natureclient)){
                        if(fournisseur.fiscale === true){
                            setRas(75)
                        } else {
                            setRas(100)
                        }
                    }
                }
            }

        }
    }, [client, fournisseur])
    console.log(fournisseur);
    
    return ras
}