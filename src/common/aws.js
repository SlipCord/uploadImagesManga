import  dotenv from 'dotenv';
import AWS from 'aws-sdk';
dotenv.config();
export const S3 = new AWS.S3({
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})