import React, { useState, useContext, useEffect, useCallback } from 'react'
import {useParams} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {Loader} from '../components/Loader'
import { LinkCard } from '../components/LinkCard'


export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {loading, requset} = useHttp()
    const [link, setLink] = useState(null)
    //берет id из из routws.js
    const linkId = useParams().id

    //загружаем ссылку
    const getLink = useCallback( async () => {
        try {
            const fetched = await requset(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (error) {}
     }, [token, linkId, requset])

     useEffect( () => {
         getLink()
     }, [getLink])

     if(loading) {
         return <Loader />
     }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}