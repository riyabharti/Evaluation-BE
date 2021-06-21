var express = require('express');
var router = express.Router();
var Marksheet=require('../model/subjectMarks');

router.post('/update', (req,res)=> {
    Marksheet.findOne(req.body.subDetails,(err,data)=> {
      if(err)
      {
        console.log("Marks Update Failed! Try again..",err);
          return res.status(500).json({
              status: false,
              message: "Marks Update Failed! Server Error..",
              error: err
          });
      }
      var marksData=req.body.marks;
      if(data == null)
      {
          var newMarkData = new Marksheet({...req.body.subDetails,'marks': [marksData]});
          newMarkData.save().then(item => {
            res.status(200).json({
                'status':true,
                'message':"Marks added",
                'data':item
            })
        }).catch(err2=>{
            console.log("Mark Updation Failed! I Try again..",err2);
            res.status(200).json({
                'status':false,
                'message':"Marks updation error",
                'error':err2
            })
        })
      }
      else {
          var mI=data.marks.findIndex(d => d.roll == marksData.roll)
          if(mI!=-1)
          {
              if(data.marks[mI].name != marksData.name)
              {
                  res.status(200).json({
                    'status':false,
                    'message':"Same Roll with different name exists in data",
                    'error':'Overriding name error'
                })
              }
              else{
                data.marks[mI].score=marksData.score;
                data.save().then(item=> {
                    res.status(200).json({
                        'status':true,
                        'message':"Marks updated in the marksheet",
                        'data':item
                    })
                }).catch(err3=>{
                    console.log("Marks Updation Failed! II Try again..",err3);
                    res.status(500).json({
                        'status':false,
                        'message':"Marks updation error",
                        'error':err3
                    })
                })
              }
          }
          else {
              data.marks=[...data.marks,marksData];
              data.save().then(item=> {
                  res.status(200).json({
                      'status':true,
                      'message':"Marks added in the marksheet",
                      'data':item
                  })
              }).catch(err3=>{
                  console.log("Marks Addition Failed! II Try again..",err3);
                  res.status(500).json({
                      'status':false,
                      'message':"Marks addition error",
                      'error':err3
                  })
              })
          }
      }
    })
})

router.get('/fetch',(req,res)=> {
    Marksheet.findOne(req.body.subDetails,(err,data)=> {
      if(err)
      {
        console.log("Marksheet Fetch Failed! Try again..",err);
          return res.status(500).json({
              status: false,
              message: "Markshett Fetch Failed! Server Error..",
              error: err
          });
      }
      return res.status(200).json({
          status: true,
          message: "Marksheet Fetched!",
          data
      });
    })
})

module.exports = router;
