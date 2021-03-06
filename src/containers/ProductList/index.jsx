import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import removeProduct from "../../instance";
import getProducts from "../../instance";

import "./index.scss";
import AddProduct from '../../components/ProductAdd';


const ProductList = () => {
   const [sortCount, setSortCount] = useState(false)
   const [updatepage, setUpdatePage] = useState(false);
   const [products, setProducts] = useState([]);
   const [maxID, setMaxID] = useState(0);
   const [removeItem, setRemoveItem] = useState(false);
   const [idRemove, setIdRemove] = useState();
   const [open, setOpen] = useState(false);
   useEffect(() => {
      getProducts
         .get("/products.json")
         .then(response => {
            let result_product = response.data.filter(elem => elem.deleted === false)
            setProducts(result_product);
            let id_arr = response.data.map(e => {
               return (e.id)
            })
            setMaxID(Math.max(...id_arr));
         })
   }, [updatepage]);
   const SortCountFoo = async () => {
      if (sortCount) {
         let descending = await products.sort((a, b) => Number(b.count) - Number(a.count));
         setProducts(descending);
         setSortCount(!sortCount);
      }
      let ascending = await products.sort((a, b) => Number(a.count) - Number(b.count));
      setProducts(ascending);
      setSortCount(!sortCount);
   }


   const OpenRemove = (e) => {
      setIdRemove(e);
      setRemoveItem(true);
   }
   const CloseRemove = () => {
      setRemoveItem(false);
   }
   const RemoveProduct = async () => {
      let rem = {
         deleted: true,
      }
      await removeProduct
         .patch(`/products/${idRemove - 1}.json`, rem);
      setUpdatePage(!updatepage);
      setRemoveItem(false);
   }

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setUpdatePage(!updatepage);
      setOpen(false);
   };

   return (
      <div className="product">
         <h1>ProductList</h1>
         <Button onClick={handleOpen} variant="contained" color="primary">
            Add Product
         </Button>
         <Button onClick={SortCountFoo}>Sort by Count</Button>
         <Modal
            open={open}
            onClose={handleClose}>

            <div className="product__add_modal">
               <AddProduct closeModal={handleClose} ID={maxID} />
            </div>
         </Modal>

         <div className="product__list">
            {products.map(elem => {
               return (
                  <div key={elem.id} className="product__item">
                     <img src={elem.imageUrl} alt="some img" className="product__img" />
                     <span className="product__name">name:{elem.name}</span>
                     <span className="product__count">count:{elem.count}</span>
                     <p className="product__dicsription">discription: {elem.discription}</p>
                     <div className="product__info">
                        <span className="product__height">height:{elem.size.height}</span>
                        <span className="product__width">width:{elem.size.width}</span>
                        <span className="product__weight">weight{elem.weight}</span>
                     </div>
                     <NavLink
                        to={{
                           pathname: "/details",
                           elem: elem,
                        }}
                        exact
                     >Details
                     </NavLink>
                     <Button onClick={() => OpenRemove(elem.id)} >Remove</Button>
                     <Modal
                        open={removeItem}
                        onClose={CloseRemove}>
                        <div className="product__add_modal">
                           <h2>are you sure to delete this product?</h2>
                           <Button onClick={RemoveProduct}>Yes</Button>
                           <Button onClick={() => { setRemoveItem(false) }}>Cancel</Button>
                        </div>
                     </Modal>
                  </div>
               )
            })}
         </div>
      </div>
   );
}

export default ProductList;