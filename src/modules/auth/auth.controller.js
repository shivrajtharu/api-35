class AuthController{
    registerUser = (req, res, next) => {
        // fullname, email, password
        let payload = req.body;
        // let uploadedImage = req.file; // for single file upload
        // let uploadedImages = req.files; // for multiple file upload
        payload.image = req.file.filename;
        res.json({
            data: payload,
            message: "User registered Successfully",
            status: "OK",
            options: null,
        });
    };

    activateUser = (req, res, next) => {}
}

const authCtrl = new AuthController()
module.exports = authCtrl;