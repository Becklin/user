function validateReq(req, res, next) {
    const isValid = (req) => {
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        const { email } = req.body;
        return validateEmail(email);
    };
    if (isValid(req)) {
        return next();
    } else {
        res.status(404).send('驗證有錯誤');
    }
}

module.exports = validateReq;