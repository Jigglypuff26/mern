import React, { useState } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from './pages/LinksPage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'


// путь "/links" к стринице LinksPage, exact отклик только на эту сссылку
//Redirect нужен для того если непопали ни на какой роут то Redirect отправляет на страницу CreatePage
export const useRoutes = isAuthenticated => {
    
    // для авторизированного пользователя в системе
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path = "/links" exact>
                    <LinksPage />
                </Route>
                <Route path = "/create" exact>
                    <CreatePage />
                </Route>
                <Route path = "/detail/:id" >
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    //для не авторизированного пользователя
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}