const Todo = require("../models/Todo");

exports.getTodo = async(req,res) => {
    try {
        const todos = await Todo.find({});

        res.status(200).json({
            success: true,
            data: todos,
            message:"Data from database is fetched",
        })
    }

    catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: err.message
        })
    }
}


exports.getTodoById = async(req,res) => {
    try{
            const Id = req.params.id;
            const todo = await Todo.findById({_id: Id});

            if(!todo) {
                return res.status(404).json({
                    success: false,
                    message:"No data is found with given ID",
                })
            }

            res.status(200).json({
                success:true,
                data: todo,
                message: `Data id found for ${Id}`,
            })
    }

    catch(err) {
            console.error(err);
            res.status(500).json({
                success:false,
                data:"error in fetching data from id",
                message: err.message,
            })
    }
}