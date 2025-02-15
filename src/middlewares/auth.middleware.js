const jwt = require("jsonwebtoken");
const { appConfig } = require("../config/config");
const authSvc = require("../modules/auth/auth.service");
const { UserRoles } = require("../config/constants");

const permissionCheck = (role = null) =>{
    return async(req, res, next) => {
        try{
            // token verify
            let token = req.headers["authorization"] || null;
            if(!token){
                throw{
                    code: 401,
                    message: "Token is required",
                    status: "TOKEN_EXPECTED"
                }
            }
            // "Bearer tokenString".split("") ==>["Bearer", "tokenString"].pop() ===> "tokenString"
            token = token.split(" ").pop()
            const tokenData = jwt.verify(token, appConfig.jwt_secret, {complete: true})

            // user verify
            const user = await authSvc.getSingleUserByFilter({
                _id: tokenData.payload.sub
            })

            if(!user){
                throw{
                    code: 401,
                    message: "User associated on Token doesnot exists",
                    status: "USER_NOT_FOUND"
                }
            }

            req.authUser = authSvc.singleUserResponse(user)

            // permission check
            if(role){
                if(user.role === UserRoles.ADMIN){
                    // give full access
                    next()  
                }else if(role.includes(user.role)){
                    next()
                }else{
                    throw{
                        code: 403,
                        message: "Access Denied",
                        status: "ACCESS_DENIED"
                    }
                }
            }else{
                next()
            }

        }catch(exception){
            let errObj = {
                code: exception.code || 401,
                message: exception.message,
                status: exception.status || "UNAUTHORIZED"
            }
            if(exception instanceof jwt.JsonWebTokenError) {
                errObj.status = "TOKEN ERROR"
                next(errObj)

            }else if(exception instanceof jwt.TokenExpiredError){
                errObj.status = "TOKEN_EXPIRED"
                next(errObj)

            }else{
                next(exception);
            }
        }
    }
}

module.exports = {
    permissionCheck
}