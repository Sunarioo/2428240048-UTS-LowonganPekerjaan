import mongoose from "mongoose"
import { StoreLowonganKerjaSchema,UpdateLowonganKerjaSchema } from "../schemas/lowongankerja.schema.js"
import { apiResponse,apiResponseValidation } from "../utils/response.js";
import LowonganKerjaModel from "../models/lowongankerja.models.js";

class lowongankerjaController{
    static async store(req, res) {
    const result = StoreLowonganKerjaSchema.safeParse(req.body);
    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }
    const { position,company, location, is_open  } = result.data;
    
    const newLowonganKerja = await LowonganKerjaModel.create({
      position,
      company, 
      location, 
      is_open
    });
    return apiResponse({ res, status: 201, message: "Lowongan Kerja berhasil di buat", data: newLowonganKerja });
  }

   static async index(req, res) {
    const { search, sortBy = "createdAt", sort } = req.query; 
    const filter = {}; 

    if (search) { 
    filter.position= { 
      $regex: search, 
      $options: "i", 
     }; 
    } 
    const sortOption = { 
    [sortBy]: sort === "desc" ? -1 : 1, 
    }; 
  
    const ListLowonganKerja = await LowonganKerjaModel.find(filter).select({
       _id: 1, 
      position: 1, 
      company: 1, 
      location: 1, 
      is_true:1,
      createdAt: 1, 
      updatedAt: 1,
    }).sort(sortOption)

    return apiResponse({
      res,
      status: 200,
      message: "List Lowongan Kerja",
      data: ListLowonganKerja,
    });
    }

    static async show(req, res) {
    const LowonganKerjaId = req.params.id;
    const lowongankerja = await LowonganKerjaModel.findById(LowonganKerjaId);

    if (!lowongankerja) {
      return apiResponse({ res, status: 404, message: "lowongan kerja tidak ada", data: null });
    }

    return apiResponse({ res, status: 200, message: "Detail Lowongan Kerja", data : lowongankerja });
    }

    static async update(req, res) {
    const LowonganKerjaId = req.params.id;
    const result = UpdateLowonganKerjaSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({ res, errors: result.error });
    }

    const lowongankerja = await LowonganKerjaModel.findById(LowonganKerjaId);
    if (!lowongankerja) {
      return apiResponse({ res, status: 404, message: "Lowongan Kerja tidak ada", data: null });
    }

    const { position,company,location,is_open } = result.data;

    const updatedLowonganKerja = await LowonganKerjaModel.findByIdAndUpdate(
      LowonganKerjaId,
      { position,company,location,is_open},
      { new: true }
    );

    return apiResponse({ res, status: 200, message: "Lowongan Kerja berhasil diperbarui", data: updatedLowonganKerja });
  }

  static async delete(req, res) {
    const LowonganKerjaId = req.params.id;
    const lowongankerja = await LowonganKerjaModel.findById(LowonganKerjaId);

    if (!lowongankerja) {
      return apiResponse({ res, status: 404, message: "Lowongan Kerja tidak ada", data: null });
    }

    await LowonganKerjaModel.findByIdAndDelete(LowonganKerjaId);
    return apiResponse({ res, status: 200, message: "Lowongan Kerja berhasil dihapus", data: null });
  }
}

export default lowongankerjaController