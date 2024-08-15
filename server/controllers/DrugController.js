import Drug from "../models/Drug.js";
import {v4 as uuidv4} from 'uuid';

export const getAllUserDrugs = async (req, res) => {
    try {
        const getDrugs = await Drug.find({username: req.query.id})
        if (getDrugs.length == 0) {
          return res.status(204).send({message: "Drug not found"})
        }
        res.status(200).json(getDrugs)
    } catch (error) {
        res.status(500).json("Error");
    }
}

export const addDrug = async(req, res) => {
    try {
        const newDrug = new Drug({drug_id: uuidv4(), username: req.body.username, details: req.body.details});
        await newDrug.save();
        return res.status(201).json(newDrug);
    } catch(err) {
        res.status(500).send(err);
    }
}

export const deleteDrug = async(req, res) => {
    try {
        const deleted = await Drug.deleteOne({drug_id: req.body.drug_id})
        
        if (deleted.deletedCount == 0) {
          return res.status(404).json({message: "Drug not found"})
        }

        res.status(200).json({message: "Drug successfully deleted"})  
    } catch(err) {
        res.status(200).send({message: "Server error"})
    }
}

export const deleteDrugNDC = async(req, res) => {
    try {
        const deleted = await Drug.deleteOne({}, {details: {product_ndc: req.body.ndc}})
        
        if (deleted.deletedCount == 0) {
          return res.status(404).json({message: "Drug not found"})
        }
        res.status(200).json({message: "Drug successfully deleted"})  
    } catch(err) {
        res.status(500).send({message: "Server error"})
    }
}