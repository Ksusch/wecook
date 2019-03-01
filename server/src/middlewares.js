function isActiveUser(req, res, next) {
    if (req.isAuthenticated() && req.user.status.active) next()
    else next({ status: 403, message: 'Unauthorized or inactive' })
}

module.exports = { isActiveUser }
