function ensureJson(req, res, next) {
    const contentJson = req.header("content-type")
    if (!contentJson || contentJson !== 'application/json')
        return res.status(403).json({ 
            error: "Request should have 'Content-Type' header with value 'application/json'" 
        })

    next()
}

module.exports = { ensureJson }