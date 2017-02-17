
var mongoose = require('mongoose'),
    jDate = require('jdate').JDate();

var requiredMsg = '{PATH} is required.';
var ProductSchema = mongoose.Schema({
    Name: { type: String, required: requiredMsg },
    Description: { type: String, required: requiredMsg },
    Categories: { type:[String] },
    CreatedBy : { type: String, required: requiredMsg },
    CreatedOn: { type: Date, required: requiredMsg }
});

var Product = mongoose.model('Product', ProductSchema);
function createDefaultProducts() {
    Product.findOne({}).exec(function (err, product) {
        if (err) console.error(err);
        if (!product) {
            Product.create({
                Name: 'Test 1',
                Description: 'This is a Test 1 Description',
                Categories: ['5893a5245b812621c098a21c'],
                CreatedBy: 'payam',
                CreatedOn: jDate.toString('yyyy/MM/dd HH:mm:ss')
            });
            Product.create({
                Name: 'Test 2',
                Description: 'This is a Test 2 Description',
                Categories: ['5893a5245b812621c098a220'],
                CreatedBy: 'payam',
                CreatedOn: jDate.toString('yyyy/MM/dd HH:mm:ss')
            });
            Product.create({
                Name: 'Test 3',
                Description: 'This is a Test 3 Description',
                Categories: ['58a59804b3e41d2cb8c109a9'],
                CreatedBy: 'payam',
                CreatedOn: jDate.toString('yyyy/MM/dd HH:mm:ss')
            });
        }
    });
}

exports.createDefaultProducts = createDefaultProducts;