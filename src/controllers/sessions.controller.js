const createCB = (req, res, next)=>{
    try {
        req.session.role = "ADMIN"
        req.session.mode = "dark"
        const message = "Session vence en 7 dias";
        return res.status(201).json({message})
    } catch (error) {
        next(error)
    }
}

const readCB = (req, res, next) =>{
    try {
        const session = req.session 
        return res.status(200).json({session});
    } catch (error) {
        next(error)
    }
}

const destroyCB = (req, res, next)=> {
    try {
        req.session.destroy()
        const message = "Session eliminada"
        return res.status(200).json({message})
    } catch (error) {
        next(error)
    }
}

export { createCB,readCB,destroyCB }