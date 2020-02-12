const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    // OPTIONS специальный метод который присутствует в restAPI который проверяет доступность
    if(req.method === 'OPTIONS') {
        return next()
    }
    try {
        // выглядит "Bearer TOKEN" с помощью метода split разпарсим и заберем первый элемент тоесть токен
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
           return res.status(401).json({message: 'Нет токена для авторизации'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()
        
    } catch (error) {
        res.status(401).json({message: 'Catch: Нет токена для авторизации'})        
    }
}