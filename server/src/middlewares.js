const isActiveUser = function(req, res, next) {
    if (req.isAuthenticated()) next()
    else next({ status: 403, message: 'Unauthorized or inactive' })
}

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
}

module.exports = { isActiveUser, addSocketIdtoSession }
