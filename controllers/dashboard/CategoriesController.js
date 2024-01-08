import Categories from "../../models/Categories.js";
import Sequelize from "../../config/db.js";
import storage from '../../utils/cloud_storage.js';

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Categories.findAll();
        
        res.json({
            categories
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error al obtener las categorias'
        });
    }
}

export const getCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id);

        if(!category) {
            return res.status(404).json({
                msg: 'La categoria no existe'
            });
        }
    
        res.json({
            category
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrio un error al obtener la categoria'
        });   
    }
}

export const createCategory = async (req, res, next) => {
    const transaction = await Sequelize.transaction();
    try {
        const { name, slug, banner, id_department } = req.body;
        const files = req.files;
        let img = null;

        //Subir imagen
        if(files.length > 0) {
            const pathImage = `image_category${Date.now()}`;
            const url = await storage(files[0], pathImage);
            if(url != undefined && url != null) {
                img = url;
            }
        }

        const category = await Categories.create({ 
            name, slug, banner, img, id_department
        }, {
            fields: ['name', 'slug', 'banner', 'img', 'id_department'],
            transaction
        });

        await transaction.commit();
        res.json({
            msg: 'Categoria creada correctamente',
            data: category
        });
    } catch (error) {
        console.log(error)
        await transaction.rollback();
        res.status(501).json({
            msg: 'Ocurrio un error al crear la categoria'
        })
    }
}

export const updateCategory = async (req, res, next) => {
    const transaction = await Sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, slug, banner, id_department } = req.body;
        const files = req.files;
        let img = null;

        const category = await Categories.findByPk(id);

        if(!category) {
            return res.status(404).json({
                msg: 'La categoria no existe'
            });
        }

        //Subir imagen
        const deletePathImage = category.img;

        if(files.length > 0) {
            const pathImage = `image_category${Date.now()}`;
            const url = await storage(files[0], pathImage, deletePathImage);
            if(url != undefined && url != null) {
                img = url;
            }
        }

        await Categories.update({ 
            name, slug, banner, img, id_department
        }, {
            where: { id },
            transaction
        });

        await transaction.commit();

        res.json({
            msg: 'Categoria actualizada correctamente',
            data: category
        });
    } catch (error) {
        await transaction.rollback();
        res.status(501).json({
            msg: 'Ocurrio un error al actualizar la categoria'
        })
    }
}