import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { Linkslist } from '../components/Linkslist';



export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, requset} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async () => {
        try {
            const fetched = await requset(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (error) {}
    }, [token, requset])

    useEffect( () => {
        fetchLinks()
    }, [fetchLinks])

    if(loading) {
        return <Loader />
    }
    return (
        <>
            {!loading && <Linkslist links={links} />}
        </>
    )
}