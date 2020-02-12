import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback (text => {
        //если объект window.M существует и текст ошибки то
        if(window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}