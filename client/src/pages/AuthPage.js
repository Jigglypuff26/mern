import React, {useContext ,useState, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import{AuthContext} from '../context/AuthContext'



export const AuthPage = () => {
    const auth = useContext(AuthContext)
    //хук useMessage для вывода ошибкок
    const message = useMessage()  
    //наш хук
    const {loading, requset, error, clearError} = useHttp()    
    //работа с формой
    const[form, setForm] = useState({
        email: '',
        password: ''
    })

    //работа с ошибкаим
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    //Делает активными импуты при переходе
    useEffect( () => {
        window.M.updateTextFields()
    }, [])

    //обработчик данных с формы
    const changeHandler = event => {
        //указываем место для изятия данных это name в input
        setForm({ ...form, [event.target.name]:event.target.value })
    }

    //функция для регистрации пользователя
    const registerHandler = async () => {
        try {
            const data = await requset('/api/auth/register', 'POST', {...form})
            //вывод сообщения
            message(data.message)         
        } catch (error) {}
    }

    const loginHandler = async () => {
        try {
            const data = await requset('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)        
        } catch (error) {}
    }


    return (
        <div className="row">
            <div className="col s6 offst-s3">
                <h1>Название проекта</h1>

                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                        <div className="input-field ">
                            <input 
                                placeholder="Введите Email" 
                                id="email" 
                                type="text"
                                name="email"
                                value={form.email}
                                className="yellow-input"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field ">
                            <input 
                                placeholder="Введите пароль" 
                                id="password" 
                                type="password"
                                name="password"
                                value={form.password}
                                className="yellow-input"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">пароль</label>
                        </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn yellow darken-4" 
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                            >
                            Войти
                        </button>
                        <button 
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                            >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}