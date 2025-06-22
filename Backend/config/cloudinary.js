import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'dtecybk6z',
    api_key: '751758922944886',
    api_secret: 'IDYbASGVmbuzI_x7rObmgJiPyXI'
});

export default cloudinary;
