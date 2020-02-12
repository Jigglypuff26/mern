import React from 'react'
//нужен для использования Router
import {BrowserRouter as Router} from 'react-router-dom'
import { useRoutes } from './routes'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Loader} from './components/Loader'
import { Navbar } from './components/Navbar'
import 'materialize-css'

function App() {
  //аутентификация
  const {login, logout, token, userID, ready} = useAuth()
  const isAuthenticated = !!token
  //импортируем routes (значение отвечает за авторизацию пользователя)
  const routes = useRoutes(isAuthenticated)

  //при обнавелние страницы не вылетало с DitailPage
  if(!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userID, isAuthenticated
    }}>
      <Router>
      {isAuthenticated && <Navbar />} 
        <div className="container">
          { routes }
        </div>
      </Router>
    </AuthContext.Provider>   
  );
}

export default App;
