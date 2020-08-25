import express from 'express';
import {getDetialChapter,UploadImages} from './ModelUpdate';
import {getData,putData} from './../../common/cache';
const router = express.Router();
router.post("/",
    async(req,res)=>{
        try {
            let {chapterId} = req.body ;
            let dataSave = getData(chapterId);
            if(dataSave){
                return res.status(200).jsonp({
                    status:"Loading"
                });
            }
            putData(chapterId,"aaa");
            let numberUpload = getData("NUMBER_UPLOAD");
            if(!numberUpload){
                numberUpload=0;
            }
            if(numberUpload>=2){
                return res.status(200).jsonp({
                    status:"Full"
                });
            }
            numberUpload+=1 ;
            putData("NUMBER_UPLOAD",numberUpload);
            let chapterInfo  = await getDetialChapter(chapterId);
            if(chapterInfo.status_update_images){
                return res.status(200).jsonp({
                    status:"success"
                })
            }
            let ListPromise = chapterInfo.images.map((item)=>{
                return UploadImages(item);
            })
            let resultPromise = await Promise.all(ListPromise);
            chapterInfo.images = resultPromise ;
            chapterInfo.status_update_images=true ;
            chapterInfo.save();
            console.log("thanh cong");
            numberUpload = getData("NUMBER_UPLOAD");
            console.log(numberUpload);
            if(!numberUpload){
                numberUpload=0;
            }
            numberUpload -= 1 ;
            putData("NUMBER_UPLOAD",numberUpload);
            return res.status(200).jsonp({
                status:"success",
                data:chapterInfo
            });
        } catch (error) {
            console.log(error);
            let numberUpload = getData("NUMBER_UPLOAD");
            if(numberUpload){
                numberUpload -= 1 ;
                putData("NUMBER_UPLOAD",numberUpload);
            }
            return res.status(200).jsonp({
                status:JSON.stringify(error)
            })
        }
       
    })
export default router ;