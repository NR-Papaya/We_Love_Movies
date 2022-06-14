const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

//------------MIDDLEWARE FUNCTIONS------------------

//------------CRUD FUNCTIONS------------------
async function list(req,res){
    const response = await service.list();
    res.json({data: response});
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}