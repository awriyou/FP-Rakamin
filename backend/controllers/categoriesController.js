const { Category } = require('../models/category');


exports.getCategories = async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
};

exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res
      .status(404)
      .json({
        message: 'The category with the id input from you is not found',
      });
  }
  res.status(200).send(category);
};

exports.createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    return res.status(404).send('The Category cannot be created');
  }

  res.send(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  },
  {
    new: true, //?Kalo mau yang direturn datab aru
  });
  if (!category) {
    return res.status(404).send('The Category cannot be updated');
  }

  res.send(category);
};

exports.deleteCategory = ((req, res) => {
   Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'The category was deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Category not found' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

