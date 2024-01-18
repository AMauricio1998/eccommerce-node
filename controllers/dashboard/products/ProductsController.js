import storage from '../../../utils/cloud_storage.js';
import Sequelize from "../../../config/db.js";
import Departments from '../../../models/Departments.js';
import Categories from '../../../models/Categories.js';
import Brands from '../../../models/Brands.js';
import Products from '../../../models/Products.js';

export const getProductsFromDepartment = async (req, res) =>{
    const { id_department } = req.params;
    const products = await Products.findAll({
        where: {
            id_department
        },
        include: [
            { model: Brands, as: 'brand' },
            { model: Departments, as: 'department' },
            { model: Categories, as: 'category' },
        ]
    });
    res.json({
        data: products
    });
}

export const getProductsFromCategory = async (req, res) =>{
    const { id_category } = req.params;
    const products = await Products.findAll({
        where: {
            id_category
        },
        include: [
            { model: Brands, as: 'brand' },
            { model: Departments, as: 'department' },
            { model: Categories, as: 'category' },
        ]
    });
    res.json({
        data: products
    });
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findOne({
        where: {
            id
        },
        include: [
            { model: Brands, as: 'brand' },
            { model: Departments, as: 'department' },
            { model: Categories, as: 'category' },
        ]
    });
    res.json({
        data: product
    });
}

export const createProduct = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const { name, slug, description, image_default,price, id_department, id_category, status, in_discount, discount, system_code } = req.body;
            
        const product = await Products.create({ 
            name, 
            slug, 
            description,
            image_default, 
            price, 
            id_department, 
            id_category, 
            status,
            in_discount,
            discount,
            system_code
        }, {
            fields: [
                'name', 
                'slug', 
                'description',
                'image_default', 
                'price', 
                'id_department', 
                'id_category', 
                'status',
                'in_discount',
                'discount',
                'system_code'
            ],
            transaction
        });
        await transaction.commit();

        const product_r = await Products.findOne({
            where: {
                id: product.id
            },
            include: [
                { model: Departments, as: 'department' },
                { model: Categories, as: 'category' },
            ]
        });

        res.status(201).json({
            data: product_r,
            msg: 'Producto creado con exito'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.errors[0].message
        });
    }
}