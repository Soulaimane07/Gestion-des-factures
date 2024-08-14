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