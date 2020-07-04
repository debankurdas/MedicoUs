const hospitalSchema = require('../../models/hospitalModels/hospitalSchema');


exports.addHospital = (req, res, next) => {
    //(req.body);
    url = req.protocol + '://' + req.get('host');
    const hospital = new hospitalSchema({
        hospitalName: req.body.hospitalName,
        branchName: req.body.branchName,
        adminId: req.userData.uId,
        speciality: req.body.speciality,
        imageUrl: url + '/images/' + req.file.filename,
        status: req.body.status,
        description: req.body.description,
        state: req.body.state,
        city: req.body.city,
        branchArea: req.body.branchArea,
        address: req.body.address,
        pin: req.body.pin,
        email: req.body.email,
        contact: req.body.contact
    });
    hospital.save()
        .then((requestedData) => {
            res.status(200).json({
                status: 'Success',
                message: 'Hospital Data is succesfully added',
                data: requestedData
            });
        })
        .catch((error) => {
            res.status(500).json({
                status: 'Failed',
                message: 'Please Fillup the information carefully'
            });
        });
}
exports.getHospital = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    let fetchHospital;
    const adminId = req.userData.uId;
    const hospitalQuery = hospitalSchema.find({ adminId: adminId });
    if (pageSize && currentPage) {
        hospitalQuery.skip(pageSize * (currentPage - 1)).limit(pageSize)
        hospitalQuery.then(result => {
                fetchHospital = result;
                return hospitalSchema.count();
            })
            .then((finalCount) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    hospital: fetchHospital,
                    maxCount: finalCount
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data is not added yet!',
                    error: error
                });
            });
    } else {
        hospitalSchema.find()
            .then((result) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Details is fetched',
                    data: result
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Product is not fetched!',
                    error: error
                });
            });
    }
}

exports.getHospialById = (req, res, next) => {
    const hospitalId = req.params.id;
    hospitalSchema.findById(hospitalId)
        .then((hospital) => {
            if (hospital) {
                res.status(200).json(hospital);
            } else {
                res.status(401).json({ message: 'Hospital is not found' });
            }
        })
        .catch(error => {
            res.status(401).json({
                message: 'Hospital data is not fetched!',
                error: error
            });
        });
}

exports.updateHospitalDetails = (req, res, next) => {
    let imageUrl = req.body.imageUrl;
    if (req.file) {
        url = req.protocol + '://' + req.get('host');
        imageUrl = url + '/images/' + req.file.filename
    }
    const hospital = new hospitalSchema({
            _id: req.body.id,
            hospitalName: req.body.hospitalName,
            branchName: req.body.branchName,
            adminId: req.body.adminId,
            description: req.body.description,
            imageUrl: imageUrl,
            speciality: req.body.speciality,
            status: req.body.status,
            state: req.body.state,
            city: req.body.city,
            branchArea: req.body.branchArea,
            address: req.body.address,
            pin: req.body.pin,
            email: req.body.email,
            contact: req.body.contact
        })
        //(hospital);
        //(req.params.id);
    hospitalSchema.updateOne({ _id: req.params.id }, hospital)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: "Updated!",
                    hospital: {
                        ...result,
                        imageUrl: result.imageUrl
                    }
                });
            } else {
                res.status(401).json({
                    message: "Unathorized Access!"
                })
            }

        }).catch((error) => {
            res.status(500).json({
                message: 'Hospital information is not updaated yet!',
                error: error
            });
        });
}

exports.deleteHospital = (req, res, next) => {
    hospitalSchema.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'Hospital information is deleted'
                });
            } else {
                res.status(401).json({
                    message: 'Unauthorized access!'
                })
            }

        })
        .catch(error => {
            res.status(500).json({
                message: 'Post can not be deleted!'
            });
        });
}

exports.getDataFilterBybranchName = (req, res, next) => {
    branchName = req.body.branchName;
    hospitalSchema.find({ branchName: branchName })
        .then((result) => {
            res.status(200).json({
                data: result,
                status: 'Success'
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: 'Please try again after some time',
                error: error,
                status: 'Failed'
            })
        })
}

// exports.getHospitalBycity = (req, res, next) => {
//   const city = req.body.city;
//   hospitalSchema.find({ city: city }).then((finalResult) => {
//               res.status(200).json({
//                   status: 'Success',
//                   message: 'Hospital Data is Fetched Successfully',
//                   data: finalResult
//               })
//           })
//           .catch(error => {
//               res.status(401).json({
//                   message: 'Hospital data can not be fetched now',
//                   error: error
//               });
//           });
// }
exports.getHospitalByLocation = (req, res, next) => {
    //(req.body);
    const state = req.body.state;
    const city = req.body.city;
    const area = req.body.area;
    if (state === 'ALL' && city === 'ALL' && area === '') {
        hospitalSchema.find()
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });

    } else if (state !== '' && city === '' && area === '') {
        hospitalSchema.find({ state: state })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });
    } else if (state !== '' && city === 'ALL' && area === '') {
        hospitalSchema.find({ state: state })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });

    } else if (state !== '' && city !== 'ALL' && city !== '' && city !== 'undefined' && area === '') {
        hospitalSchema.find({ state: state, city: city })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });
    } else if (state !== '' && city !== '' && city !== 'undefined' && city !== 'ALL' && area === 'ALL' && area != '') {
        hospitalSchema.find({ state: state, city: city })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });
    } else if (state !== '' && city !== '' && city !== 'undefined' && city !== 'ALL' && (area != 'ALL' || area !== '' || area !== 'undefined')) {
        hospitalSchema.find({ state: state, city: city, branchArea: area })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });
    }

}

exports.getHospitalByHospitalName = (req, res, next) => {
    //(req.body);
    const hospitalName = req.body.hospitalName;
    if (hospitalName) {
        hospitalSchema.find({ hospitalName: { $regex: hospitalName, $options: 'i' } })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });
    }
}

exports.getHospitalBySpeciality = (req, res, next) => {
    //('hi');
    //(req.body);
    const state = req.body.state;
    const speciality = req.body.speciality;

    //(state);

    if (state !== 'ALL' && speciality !== '') {
        hospitalSchema.find({ state: state, speciality: speciality })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });

    } else if (state === 'ALL' && speciality !== '') {
        hospitalSchema.find({ speciality: speciality })
            .then((finalResult) => {
                res.status(200).json({
                    status: 'Success',
                    message: 'Hospital Data is Fetched Successfully',
                    data: finalResult
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Hospital data can not be fetched now',
                    error: error
                });
            });

    }


}