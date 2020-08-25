import ChapterDb from './../../database/chapter';
import  dotenv from 'dotenv';
dotenv.config();
import request from 'request';
import {S3} from './../../common/aws';
import {makeUserName} from './../../common/stringHelper';
const stream = require('stream');
export const getDetialChapter = (id)=>{
    return ChapterDb.findById(id);
}

export const UploadImages = (image)=>{
    return new Promise((resolve,eject)=>{
        const options = {
            method: 'GET',
            url:image,
            headers:{
                Referer:"https://manganelo.com"
            }
        }
        const key = makeUserName(7) + image.slice(image.lastIndexOf("/")+1,image.length);
        const { writeStream, promise } =UploadStream(key);
        const pipeline = request(options).pipe(writeStream);
        promise.then((data)=>{
            resolve(data.Location);
        }).catch((error)=>{
            eject(error);
        })

    })
}
const UploadStream =(Key)=>{
    const pass = new stream.PassThrough();
    return {
        writeStream: pass,
        promise: S3.upload({ Bucket:process.env.AWS_BUCKET, Key:Key, Body: pass, ACL: 'public-read'}).promise(),
      };

}