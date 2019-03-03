const apiRouter = require("../routes/api")
const authRouter = require("../routes/auth")

module.exports = app => {
    app.use("/api", apiRouter);
    app.use("/auth", authRouter);
}