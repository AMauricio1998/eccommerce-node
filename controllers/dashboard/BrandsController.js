import Brands from "../../models/Brands.js";
import bcrypt from 'bcryptjs';
import storage from '../../utils/cloud_storage.js';
import Sequelize from "../../config/db.js";

export const getBrands = async (req, res) => {
    try {        
        const brands = await Brands.findAll();
    
        res.json({
            brands
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error al obtener las marcas'
        });
    }
}

export const getBrand = async (req, res) => {
    try {        
        const { id } = req.params;
        const brand = await Brands.findByPk(id);

        if(!brand) {
            return res.status(404).json({
                msg: 'La marca no existe'
            });
        }
    
        res.json({
            brand
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error al obtener la marca'
        });   
    }
}

export const createBrand = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const { name, slug, website } = req.body;
        const files = req.files;
        let img = null;

        if(files.length > 0) {
            const pathImage = `image_brand_${Date.now()}`;
            const url = await storage(files[0], pathImage);
            if(url != undefined && url != null) {
                img = url;
            }
        }
        const brand = await Brands.create({ 
            name, slug, img, website 
        }, {
            fields: ['name', 'slug', 'img', 'website'],
            transaction
        });

        await transaction.commit();
        res.json({
            msg: 'Marca creada correctamente',
            data: brand
        });
    } catch (error) {
        await transaction.rollback();
        res.status(501).json({
            msg: error.errors[0].message
        });
    }
}

export const updateBrand = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, slug, website } = req.body;
        const files = req.files;
        let img = null;
        
        const brand = await Brands.findByPk(id);
        
        if(!brand) {
            return res.status(404).json({
                msg: 'La marca no existe'
            });
        }

        const deletePathImage = brand.img;
        if(files.length > 0) {
            const pathImage = `image_brand_${Date.now()}`;
            const url = await storage(files[0], pathImage, deletePathImage);
            if(url != undefined && url != null) {
                img = url;
            }
        }
        await brand.update({ 
            name, slug, img, website 
        }, {
            fields: ['name', 'slug', 'img', 'website'],
            transaction
        });

        await transaction.commit();
        res.json({
            msg: 'Marca actualizada correctamente',
            data: brand
        });
    } catch (error) {
        await transaction.rollback();
        res.status(501).json({
            msg: 'Ocurrio un error al actualizar la marca'
        });
    }
}