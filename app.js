//подключаем модули
const express = require('express')
//модуль для папи config и работы config
const config = require('config')
//подключаем пакет mongoose для работы с MongoDB
const mongoose = require('mongoose')
const path = require('path')



//создаем сервер
const app = express()
//парсер для корректной передачи данных на сервер
app.use(express.json({extended: true}))
//регестирирем роут Для авторизации
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
//берем значерие  переменной port из файла config/default.json если значение переменной не определено то порт 5000
const PORT = config.get('port') || 5000

//подключаемся к БД с помощью асинхронной функции start()
async function start() {
    try {
        //подключаемся к БД с помощю функции await мы ждем когда подключится к БД через константу в config
       await mongoose.connect(config.get('mongoUrl'), {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true           
       })
        //сервер будет запущен на порте 5000
        app.listen(PORT, () => console.log(`App has been started on PORT .... ${PORT}`))     
    } catch (error) {
        //выводим ошибку в лог
        console.log('Srver Error: ', error.message)
        //завершаем соединение
        process.exit(1)      
    }
}

start()