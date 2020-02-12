//подключам метод Router из модля express
const {Router} = require('express')
//Подключаем библиотеку bcryptjs (для хеширования(шифрования) паролей и их сравнения)
const bcrypt = require('bcryptjs')
//модуль для папи config и работы config
const config = require('config')
//подключаем jsonwebtoken для авторизации
const jwt = require('jsonwebtoken')
//экспортируем check, validationResult из модуля express-validator 
const {check, validationResult} = require('express-validator')
//подключаме модель User
const User = require('../models/User')
//создаем ротер
const router = Router()

//обработка POST запросов

// к данному роутеру есть префикс /api/auth ( /api/auth/register), потом идет фнкция
//2ой параметр проверка данных из фронтенда
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов')
            .isLength({min:6})
    ],
    async (req, res) => {
    try {

        // console.log('Body: ', req.body)
        //проверка на ошибку валидации
        const errors = validationResult(req)
        //если есть ошибки то
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некорректные данные при регистрации'
            })
        }

        //полчаем данные email, password с фронт енда
        const {email, password} = req.body

        // лоика для регистрации пользователя
        //проверить естиль ли email в БД
        const candidat = await User.findOne({email: email})

        if (candidat) {
            return res.status(400).json({ message: 'Пользователь с таким email существует'})
        }
       
        //хешируем пароль
        //создаем переменную которая шифрует пароль (пароль из фронтенда, солд(ключ шифрования))
        const hashedPassword = await bcrypt.hash(password, 12)
        //создаем пользователя 1 емайл 2 захешированный пароль
        const user = new User({email, password: hashedPassword})
        //ждем когда пользователь сохранится
        await user.save()

        res.status(201).json({message: 'Пользователь создан'})
        
    } catch (error) {
        // console.log('server reg: ', error.message)
        res.status(500).json({message: 'Чтото пошло не так поробуйте снова(серверу бобо)', error})
    }
})

// к данному роутеру есть префикс /api/auth ( /api/auth/login), потом идет фнкция
//normalizeEmail нормализует email, exists пароль должен существовать
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
        //проверка на ошибку валидации
        const errors = validationResult(req)
        //если есть ошибки то
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некорректные данные при входе в систему'
            })
        }
        //получаем поля email, password из фронтенда
        const {email, password} = req.body
        //ищем пользователя по email
        const user = await User.findOne({ email })

        //проверяем если пользователь есть, если нет то выдаем ошибку
        if(!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        //сравниваем пароль
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль попробуйте снова' })
        }

        //__авторизация__
        //создаем токен 1) объект данные которые будут зашифрованы в данном токене
        //2)передаем секретный ключ для шифрования
        //3)объект expiresIn внем указывается время жизни токена
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}
        )

        //передам на фронтенд токен и user id
        res.json({token, userId: user.id})
        
    } catch (error) {
        res.status(500).json({message: 'Чтото пошло не так поробуйте снова(серверу бобо)'})
    }    
})


//експортирем router
module.exports = router