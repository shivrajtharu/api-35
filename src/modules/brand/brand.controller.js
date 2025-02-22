const brandSvc = require("./brand.service");

class BrandController {
    // for CRUD CMS
    create = async(req, res, next) => {
        try{
            const payload = await brandSvc.brandStoreTransform(req)
            const brand = await brandSvc.storeBrand(payload)
            res.json({
                data: brand,
                message: "Brand created successfully",
                status: "OK",
                options: null
            })
        }catch(exception){
            next(exception);
        }
    };

    listAll = async(req, res, next) => {
        try{
            // list all
            const result = await brandSvc.listAllBrand(req.query)
            res.json({
                data: result.data,
                message: "List all brands",
                status: "BRAND_LIST_SUCCESS",
                options: {
                    ...result.pagination
                }
            })
        }catch(exception){
            next(exception);
        }
    };

    detailById = async(req, res, next) => {
        try{

        }catch(exception){
            next(exception);
        }
    };

    updateById = async(req, res, next) => {
        try{

        }catch(exception){
            next(exception);
        }
    };

    deleteById = async(req, res, next) => {
        try{

        }catch(exception){
            next(exception);
        }
    };

    // public
    frontList = async(req, res, next) => {
        try{

        }catch(exception){
            next(exception);
        }
    };
    
    frontListProductByBrandSlug = async(req, res, next) => {
        try{

        }catch(exception){
            next(exception);
        }
    };
}

const brandCtrl = new BrandController();
module.exports = brandCtrl; 