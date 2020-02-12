//подключаем методы {Schema, model, Types} из модуля mongoose
const {Schema, model, Types} = require('mongoose')

//Создаем схему
// from откуда идет ссылка, 
// to куда ведет ссылка
// code 
// date когда ссылка была создана
// clicks колличество кликов
// owner кто эти ссылки создал
const schema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true, unique: true},
    code: {type: String, required: true, unique: true},
    date: {type: Date, default: Date.now},
    clicks: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'}

})

//экспортируем рузультат работы функции model где даем название модели 'Link' и схемы (schema) по которой он работает
module.exports = model('Link', schema)