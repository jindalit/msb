const Request = require('../../model/Request');
const Status = require('../../model/Status');
const User = require('../../model/User');
const date = require('date-and-time');
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const tempDir = 'uploads/';



const { inspect } = require('util')
const transform = require('lodash.transform')
const isEqual = require('lodash.isequal')
const isArray = require('lodash.isarray')
const isObject = require('lodash.isobject')

/**@EXTENSION */
const getExtension = (filename) => {
	const ext = path.extname(filename || '').split('.');
	return ext[ext.length - 1].toLowerCase();
}

function difference(origObj, newObj) {
  function changes(newObj, origObj) {
    let arrayIndexCounter = 0
    return transform(newObj, function (result, value, key) {
      if (!isEqual(value, origObj[key])) {
        let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
        result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
      }
    })
  }
  return changes(newObj, origObj)
}

const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
   
const fileFields = []
for (let i = 0; i < 10; i++) {
    fileFields.push(
        {
            name: 'file',
            maxCount: 10
        }
    )
}
const storage = multer.diskStorage({
	 destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
const fileFilter = (req, file, cb) => {
    cb(null, true);
}
const upload = multer({ storage: storage, fileFilter: fileFilter }).fields(fileFields);
module.exports.get = function (req, res, next) {
    let condition = {}
    if (req.query.userId) {
        condition.userId = mongoose.Types.ObjectId(req.query.userId)
    }
    Request.find(condition).sort({createdAt : -1})
    .exec(function (err, data) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Getting Error While Fetching Data",
                error: err
            });
        } else {
            if (data && data.length>0) {
                let newData = data.map((data) => {
					console.log(data.description)
					let description = "";
					if(data.description==null || data.description=="null" ){
						description = "";
					}else{
						description = data.description;
					}
                    return {
                        createdAt: changeDateFormat(data.createdAt),
                        modifiedAt: changeDateFormat(data.modifiedAt),
                        _id: data._id,
                        jobName: data.jobName,
                        requestTypeId: data.requestTypeId,
                        categoryId: data.categoryId,
                        description: description,
						isImmediate:data.isImmediate,
						quantity: data.quantity,
                        timeline: data.timeline,
                        hardwareFilmware: data.hardwareFilmware,
                        contactPerson: data.contactPerson,
                        shippingAddress: data.shippingAddress,
                        files: data.files,
                        status: data.status ,
                        reqStatus: data.reqStatus,
                        userId: data.userId,
                        startDate: convertDate(data.startDate),
                        endDate: convertDate(data.endDate),
                        techContact: data.techContact,
                        projectContact: data.projectContact,
                        isActive: data.isActive,
                        history: data.history
                    };
                });
                res.status(200).json({
                    success: true,
                    message: 'Request Completed Successfully',
                    data: newData
                })

            } else {
                res.status(200).json({
                    success: false,
                    message: 'Request Completed Successfully',
                    data: []
                })
            }
        }
    });
}



module.exports.changeRequestStatus = function (req, res) {
    let condition = { _id: mongoose.Types.ObjectId(req.body._id) };
    let status = req.body.status;
    Request.update(condition, { $set: { status: status } }).exec((err, data) => {
        if (err || !data) {
            return res.status(200).json({
                success: false,
                message: "Error In Fetching Request",
                error: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Request Status Updated Successfully",
                data: data
            });
        }
    })
}

module.exports.uploadMulter = function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error While Uploading File ",
                err: err
            });
        }
        next();
    })

}

module.exports.upload = function (req, res, next) {

    const {
        file
    } = req.files
    if (!!file) {
        const files = []
        for (let i = 0; i < file.length; i++) {
            const {
                originalname,
                filename,
                mimetype,
                size
            } = file[i]
        //    const ext = getExtension(file[i].originalname);
        //     file[i]['extension']=ext;
		// 	const tName
		// 	= `${filename}_${originalname}`
		// 	 file[i].filename = tName
        //      file[i].path = file[i].path
		// 	 file[i].destination = path.resolve(tempDir, tName);
		// 	 console.log(file[i],tName)
             files.push(file[i])
        }

        req.filesData = files
        next()
    } else {
        req.filesData = []
        next()
    }
}
module.exports.post = function (req, res) {
    let finalDataFile = req.filesData;

    const {
        categoryId,
        requestTypeId,
        isImmediate,
        quantity,
        jobName,
        contactPerson,
        shippingAddress,
        status,
        reqStatus,
        userId,
        timeline,
        hardwareFilmware,
        description,
        startDate,
        endDate,
        techContact,
        projectContact
    } = req.body;



    const request = new Request(
        {
            categoryId,
            requestTypeId,
            isImmediate,
            quantity,
            jobName,
            contactPerson,
            shippingAddress,
            reqStatus,
            status,
            timeline,
            hardwareFilmware,
            description,
            userId,
            startDate,
            endDate,
            techContact,
            projectContact,
            files: finalDataFile

        }
    );
    request.save(function (err, data) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error In Creating Request",
                error: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "New Request Created",
                data: data
            });
        }
    });
}

module.exports.put = async function (req, res) {

    let condition = { _id: mongoose.Types.ObjectId(req.query._id) };
    let  prevDataRequest = await Request.findOne(condition);
	let userData = await User.findOne({_id : mongoose.Types.ObjectId(req.body.userId)})
	let changedBy = userData.firstname+"("+userData.username+")";
    let prevFiles = prevDataRequest.files;

    let curFiles = req.filesData;
    let finalFileArray = [];
    if(curFiles && curFiles.length > 0){
        finalFileArray = curFiles
    }else{
        finalFileArray = prevFiles
    }
    
    const {
        categoryId,
        requestTypeId,
        isImmediate,
        quantity,
        jobName,
        contactPerson,
        shippingAddress,
        status,
        reqStatus,
        userId,
        timeline,
        hardwareFilmware,
        description,
        startDate,
        endDate,
        techContact,
        projectContact
    } = req.body;

    let currentDataRequest = {
        categoryId,
        requestTypeId,
        isImmediate,
        quantity,
        jobName,
        contactPerson,
        shippingAddress,
        status,
        reqStatus,
        userId,
        timeline,
        hardwareFilmware,
        description,
        startDate,
        endDate,
        techContact,
        projectContact,
        finalFileArray
    }
    
    const diff = {"Changed By":changedBy}
    //compare prev object with new object
if(prevDataRequest.categoryId!= req.body.categoryId ){
	diff["CategoryId"] = prevDataRequest.categoryId
 }
if(prevDataRequest.requestTypeId!= req.body.requestTypeId ){
	diff["RequestTypeId"] = prevDataRequest.requestTypeId 
	}
if(prevDataRequest.isImmediate!= req.body.isImmediate ){
	if(prevDataRequest.isImmediate== "null" || prevDataRequest.isImmediate== null || prevDataRequest.isImmediate== undefined ){
		diff["Is Immediate"]= '';
	}else{
		diff["Is Immediate"] = prevDataRequest.isImmediate
	}
	
	}
if(prevDataRequest.quantity!= req.body.quantity ){
	diff["Quantity"] = prevDataRequest.quantity
	}
if(prevDataRequest.jobName!= req.body.jobName ){
	diff["Job Name"] = prevDataRequest.jobName
	}
if(prevDataRequest.contactPerson!= req.body.contactPerson ){
	diff["Contact Person"] = prevDataRequest.contactPerson
	}
if(prevDataRequest.shippingAddress!= req.body.shippingAddress ){
	diff["Shipping Address"] = prevDataRequest.shippingAddress 
	}
if(prevDataRequest.status!= req.body.status ){
	diff["Status"] = prevDataRequest.status 
	}
if(prevDataRequest.reqStatus!= req.body.reqStatus ){
	diff["Req Status"] = prevDataRequest.reqStatus 
	}
if(prevDataRequest.userId!= req.body.userId ){
	diff["UserId"] = prevDataRequest.userId 
	}
if(prevDataRequest.timeline!= req.body.timeline ){
	diff["Timeline"] = prevDataRequest.timeline
	}
if(prevDataRequest.hardwareFilmware!= req.body.hardwareFilmware ){
	diff["Hardware Filmware"] = prevDataRequest.hardwareFilmware
	}
if(prevDataRequest.startDate!= req.body.startDate ){
	diff["Start Date"] = convertDate(prevDataRequest.startDate)
	}
if(prevDataRequest.endDate!= req.body.endDate ){
	diff["End Date"] = convertDate(prevDataRequest.endDate) 
	}
if(prevDataRequest.techContact!= req.body.techContact ){
	diff["Tech Contact"] = prevDataRequest.techContact
	}
if(prevDataRequest.projectContact!= req.body.projectContact ){
	diff["Project Contact"] = prevDataRequest.projectContact
	}

if(prevDataRequest.modifiedAt!= req.body.modifiedAt ){
	diff["Modified At"] = changeDateFormat(prevDataRequest.modifiedAt)
	}
if(prevDataRequest.files!= finalFileArray ){
	diff["files"] = prevDataRequest.files 
	}

    Request.update(
        condition,
        {
            $set: {
                categoryId: categoryId,
                requestTypeId: requestTypeId,
                isImmediate: isImmediate,
                quantity: quantity,
                jobName: jobName,
                contactPerson: contactPerson,
                shippingAddress: shippingAddress,
                status: status,
                reqStatus: reqStatus,
                userId: userId,
                timeline: timeline,
                hardwareFilmware: hardwareFilmware,
                description: description,
                startDate: startDate,
                endDate: endDate,
                techContact: techContact,
                projectContact: projectContact,
                files: finalFileArray,
                
            },
            $push : {history: diff}

        }
    ).exec(function (err, data) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: " Error While Updating Request",
                err: err
            });
        } else {
            if(data.nModified==1){
                return res.status(200).json({
                    success: true,
                    message: " Request Updated Successfully ",
                    data: data
                });
            }else{
               return res.status(200).json({
                    success: true,
                    message: " Request Not Updated",
                    data: data
                }); 
            }
            
        }
    });
}

module.exports.delete = function (req, res) {
    let condition = { _id: mongoose.Types.ObjectId(req.params._id) };
    let updateData = { isActive: false };
    Request.update(condition, updateData).exec(function (err, data) {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Getting Error While Deleting Request",
                err: err
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Successfully Deleted Request",
                data: data
            });
        }
    });
}

module.exports.getById = function (req, res) {
    let condition = { _id: mongoose.Types.ObjectId(req.body._id) };
    Request.findOne(condition).exec((err, data) => {
        if (err) {
            return res.status(200).json({
                success: false,
                message: "Error In Fetching Request",
                error: err
            });
        } else {
			console.log(data)
			let description = "";
			if(data.description=="null"){
				description = "";
			}else{
				description = data.description;
			}
                    
			let newData  = {
						
                        createdAt: changeDateFormat(data.createdAt),
                        modifiedAt: changeDateFormat(data.modifiedAt),
                        _id: data._id,
                        jobName: data.jobName,
                        requestTypeId: data.requestTypeId,
                        categoryId: data.categoryId,
                        description: description,
                        timeline: data.timeline,
                        hardwareFilmware: data.hardwareFilmware,
                        contactPerson: data.contactPerson,
                        shippingAddress: data.shippingAddress,
                        files: data.files,
                        status: data.status ,
                        reqStatus: data.reqStatus,
                        userId: data.userId,
                        startDate: convertDate(data.startDate),
                        endDate: convertDate(data.endDate),
                        techContact: data.techContact,
                        projectContact: data.projectContact,
                        isActive: data.isActive,
                        history: data.history,
						quantity: data.quantity
                    
                };
            return res.status(200).json({
                success: true,
                message: "Request Data Fetched Successfully",
                data: newData
            });
        }
    })
}


const changeDateFormat = (date) =>{
	console.log("date",date)
	if(date && date!=null && date!=undefined){
		let month = date.getMonth();
		let day = date.getDate();
		let year = date.getFullYear();
		let output = (month+1 ) + '/'+ day  + '/' + year;
		console.log("output",output)
		return output;
	}else{
		return "";
	}
}

const  convertDate =(date)=>{
    if(date!=null && date!=undefined){
       let date1 = date.split("-")
       let newDate = date1[1]+"/"+date1[2]+"/"+date1[0]
        return newDate;
    }else{
        return ""
    }

}
