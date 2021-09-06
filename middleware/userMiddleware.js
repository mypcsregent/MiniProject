require('dotenv').config();
const jwt=require('jsonwebtoken');


const userMiddleware=(schema,property)=>{
    return (req,res,next)=> {
        console.log(req[property]);
        const { error } = schema.validate(req[property]);

        const valid= (error==null);
        if(valid){
            console.log('Schema validated');
            next();
        }

        else{
            const { details } =error;
            const message=details.map(i => i.message).join(', ');
            console.log("error",message);

            res.status(400).json({
                error:message
            })

        }
    }
}

const authenticateToken=(req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

module.exports={userMiddleware,authenticateToken};