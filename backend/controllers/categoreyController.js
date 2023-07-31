const Categorey = require("../models/categoryModel");

module.exports.categoreyCreation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const CategoreyData = new Categorey({
      name: name,
      description: description,
      image: req.file.filename,
    }).save();

    if (CategoreyData) {
      res.json({ status: true, message: "successfully Created" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.categoreyManagement = async (req, res) => {
  try {
    console.log("categorey");

    const categoreyData = await Categorey.find({ is_delete: false });
    // console.log(categoreyData);
    res.json({
      status: true,
      Categorys: categoreyData,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    console.log(req.body.id, "idss");
    const categoryData = await Categorey.findByIdAndUpdate(req.body.id, {
      is_delete: true,
    });
    if (categoryData) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      status: false,
      message: "Can't find the data",
    });
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    const categoreyData = await Categorey.findOne({ name: req.params.id });
    if (categoreyData) {
      res.json({
        status: true,
        banner: categoreyData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    console.log("ethiuuuuu");
    console.log(req.body, "bodyyyy");
    if (req.file) {
      const categoryData = await Categorey.updateOne(
        { name: req.body.id },
        {
          $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
          },
        }
      );
      if (categoryData) {
        console.log("done");
        res.json({
            status: true,
            banner: categoryData,
        });
      }
    } else {
      const categoryData = await Categorey.updateOne(
        { name: req.body.id },
        {
            $set: {
            name: req.body.name,
            description: req.body.description,
        },
    }
    );
    if (categoryData) {
        console.log("done");
        res.json({
          status: true,
          banner: categoryData,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
