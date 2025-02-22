const slugify = require("slugify");
const fileUploadSvc = require("../../services/cloudinary.service");
const BrandModel = require("./brand.model");

class BrandService {
    brandStoreTransform = async(req) => {
        try {
            let data = req.body;
            // url AlphaNumeric => _-
            // Apple Brand => apple-brand, apple_brand
            data.slug = slugify(data.title, {
                lower: true,
                trim: true,
            });
            data.image = await fileUploadSvc.fileUpload(req.file.path, '/brands')
            data.created_by = req.authUser._id;
            return data;
        }catch(exception){
            throw exception
        }
    }

    storeBrand = async(payload) => {
        try{
            const brandObj = new BrandModel(payload)
           return await brandObj.save()
        }catch(exception){
            throw exception; 
        }
    }

    listAllBrand = async(query= null) => {
        try{
            let filter = {}
            if (query && query.keyword){
                filter = {
                    $or: [
                        {title: new RegExp(query.keyword, "i")},
                        {slug: new RegExp(query.keyword, "i")},
                        {status: new RegExp(query.keyword, "i")},
                    ]
                }
            }

            // 1 - 100 data
            // per page 10 data
            // 1st page => id 1 to id 10
            // 2nd page => id 11 to id 20
            // 3rd page => id 21 to id 30

            let limit = +query.limit || 15
            let currentPage = +query.page || 1

            let skip = (currentPage-1)*limit

            const allData = await BrandModel.find(filter)
            .populate("created_by", ["_id", "name", "email", "role", "status", "image"])
            .populate("updated_by", ["_id", "name", "email", "role", "status", "image"])
            .sort({title: "asc"})
            .skip(skip)
            .limit(limit)

            const allRows = await BrandModel.countDocuments(filter);

            const pagination = {
                limit: limit,
                currentPage: currentPage,
                total: allRows
            }
            return {
                data: allData,
                pagination: pagination
            };
        }catch(exception){
            throw exception
        }
    }
}

const brandSvc = new BrandService();

module.exports = brandSvc;