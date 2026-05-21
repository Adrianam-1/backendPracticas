import providersModel from "../models/providers.js"

import { v2 as cloudinary } from "cloudinary";

//Creo array de funciones

 const providerController = {};

providerController.getAllProviders = async (req, res) => {
    try {
             const providers = await providersModel.find()
             return res.status(200).json(providers)
    } catch (error) {
            console.log("error" +error)
            return res.status(500).json({message: "Internal server error"})

    }
}


providerController.insertProvider = async (req, res) =>{
    try {
            const {name, phone } = req.body;

            const newProvider = new providersModel({
                name,
                phone,
                image: req.file.path,
                public_id: req.file.filename
            });

            await newProvider.save();

            return res.status(200).json({message: "Provider saved"})
    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({ message: "Internal server error"})
    }
};

providerController.deleteProvider = async ( req, res) => {
    try {
         const providerFound = await providersModel.findById(req.params.id)

         await cloudinary.uploader.destroy(providerFound.public_id);

         await providersModel.findByIdAndDelete(req.params.id);

         return res.status(200).json({message: "Provider delete"})

    } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

providerController.updateProvider = async (req, res) =>{
    try {
    

        const { name, phone } = req.body

        const providerFound = await providersModel.findById(req.params.id);

        const updatedData = {
            name,
            phone
        }
        if(req.file){
            await cloudinary.uploader.destroy(providerFound.public_id)

            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename
        }

        await providersModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}


        )

        return res.status(200).json({message: "Provider updated"})
     } catch (error) {
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
     }
};

export default providerController
