const Tour = require('../../model/Tour');
const date = require('date-and-time');

let a = new Date();
let weekdays = new Array(7);
weekdays[0] = "Sunday";
weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
let timeArr = ["11AM","12PM","1PM","2PM","3PM","4PM"]


module.exports.getWeekDate = function(req,res,next){
    let curr = new Date  
    let week = []
    
    for (let i = 1; i <= 7; i++) {
        let first = curr.getDate() - curr.getDay() + i 
        let day = new Date(curr.setDate(first))//.toISOString().slice(0, 10)
        week.push({day,i: day.getDay(),date: day.toISOString().slice(0, 10)})
    }
    let finalDates = week.filter((i)=>{ 
        if(i.i>=1 && i.i<6){
            return true
        }else{ return false}
    })
    let datesArray = finalDates.map(element => {
        return element.date
    });

    
    req.datesArray = datesArray;
    next()
}

module.exports.getWeeklyTours =  function(req,res,next){
    console.log(req.datesArray,timeArr)
    let prmsArr= []
    timeArr.forEach((el)=>{
        req.datesArray.forEach((d)=>{
            let prms = new Promise((rs,rj)=>{
                Tour
                .findOne({ isActive : true, date : d, time: el })
                .exec(function(err, data){
                    if(err){rj({"message" : `error in getting tour data for date ${d} and time ${el}`})}
                    else{
                        let isodate = new Date(d)
						//console.log(isodate,weekdays[isodate.getDay()+1])
                        rs({ time: el,day: weekdays[isodate.getDay()+1],date:d ,tourData : data })
                    }
                })
            })
            prmsArr.push(prms)
        })
    })
    Promise.all(prmsArr).then((values) => {
        
        res.status(200).json({
            success: true,
            message: 'Request Completed Successfully',
            data: values
        })
    });
}

   
module.exports.post = function(req, res){
    const { date, time, comment, day,title } = req.body;
    const tour = new Tour({ date, time, comment, day,title });
    tour.save(function(err, data){
        if(err){
            return res.status(200).json({
                success : false,
                message : "Getting Error Whiile Creating Tour",
                error : err
            });
        }else{
            return res.status(200).json({
                success : true,
                message : "New Tour Created",
                data : data
            });
        }
    });
}

module.exports.delete = function(req,res){
    let condition = { _id : mongoose.Types.ObjectId(req.query.id)};
    console.log(condition)
    Tour.deleteOne(condition).exec(function(err, data){
        console.log(err,data)
        if(err){
            return res.status(200).json({
                success : false,
                message : "Get Error While Deleting",
                error : err
            });
        }else{
            return res.status(200).json({
                success : true,
                message : " Tour Deleted Successfully ",
                data : data
            });
        }
    });
}


