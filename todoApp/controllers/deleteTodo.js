const Todo = require("../models/Todo");

exports.deleteTodo = async(req,res) => {
    try{
        const {id} = req.params;

        const deleteTodo = await Todo.findByIdAndDelete(id);

        res.status(200).json({
        success:true,
        message: "entry deleted successfully",
    });
    }
    catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data:"server error",
            message:err.message,
        });
    }
}