const noteModel = require("../model/note");

const createNote = async (req, res) => {

    const {title, description} = req.body;
    const newNote = noteModel({
        title: title,
        description: description,
        userId: req.userId
    });
    try {
        await newNote.save();
        res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong", error: error});
    }
}

// const updateNote = async (req , res) => {
//     const id = req.params.id;
//     const {title , description} = req.body;

//     const newNote = noteModel({
//         title: title,
//         description: description,
//         userId: req.userId
//     });

//     try {
//         await noteModel.findByIdAndUpdate(id, newNote , {new: true});
//         res.status(200).json(newNote);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong", error: error});
//     }
// }
const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const updateData = { title, description };

    try {
        const updatedNote = await noteModel.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong", error: error });
    }
};

const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        const note = await noteModel.findOneAndDelete(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong", error: error});
    }
}
const getNote = async (req, res) => {
    try {
        const newNote = await noteModel.find({userId: req.userId});
        res.status(200).json(newNote);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports = {createNote , updateNote , deleteNote , getNote};


