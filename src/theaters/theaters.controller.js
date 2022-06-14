const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");


//------------CRUD FUNCTIONS------------------

//lists all theaters with movies currently showing
async function list(req,res){
    const response = await service.list();
    res.json({data: response});
}

module.exports = {
    list: [asyncErrorBoundary(list)]
}