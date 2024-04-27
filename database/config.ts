import mongoose from "mongoose";

const dbConnection = async () => {


    try {
    //    await mongoose.connect(process.env.MOGODB_CNN);
       console.log('se conecto la base de datos');
     }
    catch (error) {
        console.error(error);
        throw new Error('error al iniciar la base de datos ')
    }
}

module.exports= {
    dbConnection
}