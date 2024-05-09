const removeInstructor = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const instructor = await Instructor.find({ _id: id });
    if (!instructor) {
      return res.send("Instructor is not exist");
    }
    const remove = await Instructor.deleteOne({ _id: id });
  
    if (!remove) {
      return res.send("failed to remove");
    }
  
    return res.send("removed sucessfully");
  };

  export default removeInstructor;

