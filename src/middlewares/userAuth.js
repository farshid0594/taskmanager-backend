const jwt = require("jsonwebtoken")
const User = require("../models/User")
const moment = require("moment-jalaali")

exports.UserAuth = function name(req, res, next) {
    // گرفتن توکن
    try {
        const token = req.headers.authorization
        const data = jwt.verify(token, "123456")
        User.findById(data.id, (err, result) => {
            if (err) {
                res.status(500).json({ error: "token Error" })
                return
            }

            const findedToken = result.tokens.find(item => {
                item.text === token
            })
            if (!findedToken || moment().diff(moment(findedToken.expired, "YYYYMMDDThhmmss"), "s") > 0) {
                res.status(401).json({ error: "unUthorized Error" })
                return
            }

            req.user = result
            next()
        })
    }
    catch {
        res.status(500).json({ error: "server Error" })


    }


}