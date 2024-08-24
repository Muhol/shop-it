import jwt from "jsonwebtoken"


const authToken = async(req, res, next) =>{
     try {
        const token = req.cookies?.token

        if(!token){
            throw new Error("You're not logged in....")
            // res.status(401).json({
            //     message: "You're not logged in....",
            //     success: false,
            //     error: true
            // }) 
        }

        jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {

            if (err){
                console.log("error auth", err)
            }

            res.userId = decoded?.data._id

            next();
          });


     } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            data: [],
            success: false
        })
        
     }
}

export default authToken