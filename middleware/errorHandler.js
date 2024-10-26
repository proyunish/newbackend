exports.errorHandler = (fn)=>{
    return (req,res)=>{
        fn(req,res).catch((err)=>{
            return res.status(500).json({
                message: "internal/server error",
                err:err.message
            })
        })
    }
}