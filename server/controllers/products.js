
var ProductsModel = require('mongoose').model('Product'),
    axios = require('axios'),
    token = "348250619:AAF5YuCpO1KQACUunCn6TL0x1ebP0e0yuww";

function TelegramBot(token, method, data, res) {
    axios.post('https://api.telegram.org/bot' + token + '/' + method , data)
        .then(function (response) {
            console.log("OK" + response);
            res.end();
        })
        .catch(function(err) {
            console.error(err);
            res.end(err);
        });
}

exports.test = function (req, res) {
    console.log(req.body);
    var data = req.body;
    if(data.ok) {
        TelegramBot(token, 'sendMessage',
            {chat_id: data.message.chat.id, text: 'This is a test', reply_to_message_id: data.message.message_id}, res)
    } else {
        return res.send({ok: false});
    }
};

exports.getAllProducts = function (req, res) {
    ProductsModel.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createProduct = function(req, res) {
    debugger;
    var data = req.body;
    data.CreatedBy = req.user[0].Username.toLowerCase();
    data.CreatedOn = Date.now();

    if(data.Id && data.Id != null) {
        // Todo: Update Product
    } else {
        ProductsModel.create(data, function (err, product) {
            if(err) {
                res.status(400);
                return res.send({reason: err.toString()});
            } else {
                return res.send({product: product});
            }
        });
    }
};

exports.updateProduct = function (req, res) {
    return res.send({success: true});
};