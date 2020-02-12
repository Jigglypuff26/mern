//подключаем методы {Schema, model, Types} из модуля mongoose
const {Schema, model, Types} = require('mongoose')

//Создаем схему
const schema = new Schema({
    //создание полей для заполнения
    //поле email, тип данных (type: String), обязательно (required: true) уникальность тоесть один с таким email (required: true)
    email: {type: String, required: true, unique: true},
    //поле password тип данных (type: String), обязательно (required: true)
    password: {type: String, required: true},

    //массив ссылок уаждый пользователь будет видеть свой массив
    //тип данных (type: Types.ObjectID) это связка модели пользователя с записями в БД
    // к какой коллекции привязываемся (ref: 'Link')
    links: [{ type: Types.ObjectId, ref: 'Link'}]
})

//экспортируем рузультат работы функции model где даем название модели 'User' и схемы (schema) по которой он работает
module.exports = model('User', schema)