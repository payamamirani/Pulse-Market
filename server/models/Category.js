
var mongoose = require('mongoose');

var requiredMsg = '{PATH} is required.';
var CategorySchema = new mongoose.Schema();
CategorySchema.add({
    Title:{ type: String, required: requiredMsg },
    CreatedBy: { type: String, required: requiredMsg },
    IsRoot: { type: Boolean, default: false },
    Child: [CategorySchema]
});

var Category = mongoose.model('Category', CategorySchema);

function createDefaultCategories() {
    Category.findOne({}).exec(function(err, category) {
        if(err) console.log(err);
        if(!category) {
            Category.create(
                {Title: "لاستیک", IsRoot: true, CreatedBy: "payam", Child:
                    [
                        {
                            Title: "نمیدونم", CreatedBy: "payam"
                        },
                        {
                            Title: "چی چی", CreatedBy: "payam"
                        }
                    ]
                },
                {
                    Title:"موتور", IsRoot: true, CreatedBy: "payam", Child:
                    [
                        {
                            Title: "ها", CreatedBy: "payam"
                        },
                        {
                            Title: "نمنه", CreatedBy: "payam"
                        },
                        {
                            Title: "یوخ بابا", CreatedBy: "payam"
                        }
                    ]
                },
                {
                    Title:"بدنه", IsRoot: true, CreatedBy: "payam", Child:
                    [
                        {
                            Title: "سبز", CreatedBy: "payam"
                        }
                    ]
                });
        }
    });
}

exports.createDefaultCategories = createDefaultCategories;