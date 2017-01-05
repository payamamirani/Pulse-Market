
var mongoose = require('mongoose');

var requiredMsg = '{PATH} is required.';
var CategorySchema = new mongoose.Schema();
CategorySchema.add({
    Title:{ type: String, required: requiredMsg },
    CreatedBy: { type: String, required: requiredMsg },
    Child: [CategorySchema]
});

var Category = mongoose.model('Category', CategorySchema);

function createDefaultCategories() {
    Category.findOne({}).exec(function(err, category) {
        if(err) console.log(err);
        if(!category) {
            Category.create({Title: "Test 1", CreatedBy: "payam", Child:
                [
                    {
                        Title: "Test 1.1", CreatedBy: "payam", Child:
                        [
                            {
                                Title: "Test 1.1.1", CreatedBy: "payam", Child:
                                [
                                    {
                                        Title: "Test 1.1.1.1", CreatedBy: "payam"
                                    },
                                    {
                                        Title: "Test 1.1.1.2", CreatedBy: "payam"
                                    },
                                    {
                                        Title: "Test 1.1.1.3", CreatedBy: "payam"
                                    }
                                ]
                            },
                            {
                                Title: "Test 1.1.2", CreatedBy: "payam", Child:
                                [
                                    {
                                        Title: "Test 1.1.2.1", CreatedBy: "payam"
                                    },
                                    {
                                        Title: "Test 1.1.2.2", CreatedBy: "payam"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        Title: "Test 1.2", CreatedBy: "payam", Child:
                        [
                            {
                                Title: "Test 1.2.1", CreatedBy: "payam", Child:
                                [
                                    {
                                        Title: "Test 1.2.1.1", CreatedBy: "payam"
                                    },
                                    {
                                        Title: "Test 1.2.1.2", CreatedBy: "payam"
                                    }
                                ]
                            },
                            {
                                Title: "Test 1.2.2", CreatedBy: "payam", Child:
                                [
                                    {
                                        Title: "Test 1.2.2.1", CreatedBy: "payam"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        }
    });
}

exports.createDefaultCategories = createDefaultCategories;