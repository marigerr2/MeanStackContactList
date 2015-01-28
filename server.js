var express = require('express');
var myApp = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist'])
var bodyParser = require('body-parser');

myApp.use(express.static(__dirname + "/public"));
myApp.use(bodyParser.json());

myApp.get('/contactlist', function(req, res){
    console.log("I received a GET request")

    db.contactlist.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    })
});

myApp.post('/contactlist', function(req, res){
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc){
        res.json(doc);
    })
})

myApp.delete('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id:mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    });
})

myApp.get('/contactlist/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    })
})

myApp.put('/contactlist/:id', function(req, res){
   var id = req.params.id;
    console.log(req.body.name);
    
    db.contactlist.findAndModify({query :{_id: mongojs.ObjectId(id)}, 
        update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
        new: true}, function (err, doc) {
            res.json(doc);
        });
});


myApp.listen(3000);
console.log("Server running on port 3000");