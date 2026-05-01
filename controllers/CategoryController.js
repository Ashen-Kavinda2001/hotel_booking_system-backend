import Category from "../models/category.js";


export function getCategories(req, res) {
    Category.find().then((categories) => {
        res.json({
            categories: categories
        });
    })

    const categoryName = req.params.name;
    Category.findOne({ name: categoryName }).then((category) => {
        if (category) {
            res.json({
                category: category
            });
        } else {
            res.status(404).json({
                message: 'Category not found'
            });
        }
    }).catch( ()=>{
        res.json({
            message : "failed to get category"
        })
    });
}

export  function createCategory(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({ 
            message: 'please login to create category' 
        })
        return
    }
    if(user.type !== 'Admin') {
        return res.status(403).json({ 
            message: 'only admin can create category' 
        })
        return
    }
    const categoryData = req.body;
    const newCategory = new Category(categoryData);
    newCategory.save().then((result) => {
        res.json({
            message: 'Category created successfully',
            result: result
        }); 
    }).catch((err) => {
        res.status(500).json({
            message: 'Error creating category',
        });
    });
}

export function deleteCategory(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({ 
            message: 'please login to delete category' 
        })
        return
    }
    if(user.type !== 'Admin') {
        return res.status(403).json({ 
            message: 'only admin can delete category' 
        })
        return
     }
    const categoryName = req.params.name;
    Category.findOneAndDelete({ name: categoryName }).then((result) => {
        if (result) {
            res.json({
                message: 'Category deleted successfully',
                result: result
            });
        } else {
            res.status(404).json({
                message: 'Category not found'
            });
        }       

    })
}