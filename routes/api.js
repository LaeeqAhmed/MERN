const express = require('express');
//we need express router
const router = express.Router();
//importing ninja in api.js
const NinjaModel = require('../model/ninja');// NinjaModel uses below to create a post request
// getting the list of the ninja's from the database
router.get('/ninja', (req, res, next) => {
    const { lng, lat } = req.query;
    NinjaModel.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                maxDistance: 100000,
                distanceField: "dist.calculated",
                includeLocs: "dist.location", // Returns distance
                spherical: true
            }
        }
    ]).then(ninja => res.send(ninja));
});
  //upper walee code ki info niche comments me hain
  //pop all the ninjas details in json format..
  /*NinjaModel.find({}).then(function(ninja){
    res.send(ninja);
  });*/
  //hamee ninjas ki details chahiee jo hum distance agar input karee to wo humee us distance k along ninjas ki location wagara ki details de de ga
  /*NinjaModel.geoNear(
    //some parameters are defined in that so that to follow that it will send a responce to the client..
    {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},//because response get in string we convert into integer..lng(X-coordinate),lat(Y-coordinate)
    {maxDistance: 100000, spherical: true}//maxdistance= is distance k andar andar lat or lng ko madenazar rakhtee hue ninja pop kro
  ).then(function(ninja){
    res.send(ninja);
  });*/
  //res.send({type: 'GET... huanin ali son of imran bhatti'});

//add a new ninja adding a post request
router.post('/ninja',function(req,res,next){
// var ninja=new Ninja(req.body);
// ninja.save();
// alternative and short of above and 'create' is mongoose method and returns promise
NinjaModel.create(req.body).then(function(ninja){
  res.send(ninja);
  // next function here says to move on to ['next' middleware] when error occurs i.e implemented in index.js
  }).catch(next);
//console.log('hello once again');
});
  /*
  console.log(req.body);
  var ninja = new ninja(req.body);//first of all take that collection and save into the db
  ninja.save();*/

  //res.send({type: 'POST.. iam a post request adding a new ninja'});

//update a ninja IN THE DATABASE ('id' is a parameter)
//same as delete request.. req.body(jo update karna ha)..
router.put('/ninja/:id',function(req, res){
  NinjaModel.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
    //findOne is a method jis me ap ko updated response mile ga jo update hua ha recently..
    NinjaModel.findOne({_id: req.params.id}).then(function(ninja){
      res.send(ninja);
    });
  });
  //res.send({type: 'PUT.. iam handle the update query'});
});

//delete a ninja from the database
router.delete('/ninja/:id',function(req, res){
  //console.log(req.params.id);  //ye upar wali id ha jo k return ho gi..
  NinjaModel.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
    res.send(ninja);
  }); //ye NinjaModel wohi model wala ha is wajah se use kar rhee ha bcz waha se id find karee ga match karee ga or remove kar de ga
  //res.send({type: 'DELETE.. iam handle the delete query'});
});

//ATTACHING THIS FILE TO THE INDEX.JS this file handles routers. such as router.get() request
module.exports = router;//(this one is the router object..) we want to export these routes in index.js file..
