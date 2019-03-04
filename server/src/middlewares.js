const isActiveUser = function(req, res, next) {
    console.log("got a request", req.user)
    if (req.isAuthenticated()) next()
    else next({ status: 403, message: 'Unauthorized or inactive' })
}

const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
}

module.exports = { isActiveUser, addSocketIdtoSession }
