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

module.exports={userMiddleware};