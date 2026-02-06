import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export async function createProduct (req,res) {
  const product =  req.body

  if(!product.name || !product.price || !product.image){
    return res.status(400).send({success:false,message: "All fields are required"})
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save()
    res.status(201).send({success:true,data: newProduct, message: "Product created successfully"})
  } catch (error) {
    res.status(500).send({success:false,message: "Server error"})
  }
}

export async function deleteProduct (req,res) {

  const {id} = req.params

  if(!id){
    return res.status(400).send({success:false,message: "Product id is required"})
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({success:false,message: "Invalid product id"})
  }

  try {
    await Product.findByIdAndDelete(id)
    res.status(200).send({success:true,message: "Product deleted successfully"})
  } catch (error) {
    res.status(500).send({success:false,message: "Server error"})
  }

}

export async function updateProduct (req,res) {

  const {id} = req.params
  const updates = req.body

  if(!id){
    return res.status(400).send({success:false,message: "Product id is required"})
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({success:false,message: "Invalid product id"})
  }

  try {
    await Product.findByIdAndUpdate(id, updates)
    res.status(200).send({success:true,message: "Product updated successfully", data: updates})
  } catch (error) {
    res.status(500).send({success:false,message: "Server error"})
  }

}

export async function getProducts (req,res) {
  try {
    const products = await Product.find({})
    res.status(200).send({success:true, data: products})
  } catch (error) {
    res.status(500).send({success:false,message: "Server error"})
  }
}

export async function getProductDetails (req,res) {
  const {id} = req.params

  if(!id){
    return res.status(400).send({success:false,message: "Product id is required"})
  }

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).send({success:false,message: "Invalid product id"})
  }

  try {
    const product = await Product.findById(id)
    res.status(200).send({success:true, data: product})
  } catch (error) {
    res.status(500).send({success:false,message: "Server error"})
  }
}
