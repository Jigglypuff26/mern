import {useState, useCallback} from 'react'

export const useHttp = () => {
    //константа загрузки
    const [loading, setLoading] = useState(false)
    const [error, setEerror] = useState(null)

    const requset = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {

            //если есть данные сервера то данные переводят в JSON
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Что то пошло не так')
            }
            
            setLoading(false)
            return data

        } catch (error) {
            console.log('catch', error.message)
            setLoading(false)
            setEerror(error.message)
            throw error
        }
    }, [])

    //чистим ошибки
    const clearError = useCallback( () => setEerror(null), [])

    return { loading, requset, error, clearError }
}