import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { NavLink } from "react-router-dom";

import PutComment from "../../instance";
import getProduct from "../../instance";

import "./index.scss";
import ProductUpdate from "../../components/ProductUpdate";



const ProductDetails = (props) => {
   const [updatepage, setUpdatePage] = useState(false);
   const [product, setProduct] = useState({ size: { height: "", width: "" } });
   const [open, setOpen] = useState(false);
   const [maxID, setMaxID] = useState(0);
   const [coment, setComent] = useState("");
   const handleOpen = () => {
      setOpen(true);
   };

   useEffect(async () => {
      await getProduct
         .get(`/products/${props.location.elem.id - 1}.json`)
         .then(response => {
            setProduct(response.data);
            let id_arr = response.data.coments ? response.data.coments.map(e => {
               return (e.id)
            }) : [];
            if (Math.max(...id_arr) >= 0) {
               setMaxID(
                  Math.max(...id_arr)
               );
            }
         })
   }, [updatepage]);
   const handleClose = () => {
      setOpen(false);
   };

   const DeleteComent = async (e) => {
      let comentdel = {
         deleted: true,
      }
      await PutComment
         .patch(`/products/${props.location.elem.id - 1}/coments/${e.id - 1}.json`, comentdel);
      setUpdatePage(!updatepage);

   };
   const AddComent = async () => {
      let comentadd = {
         id: maxID + 1,
         productId: props.location.elem.id,
         description: coment,
         date: new Date().toDateString(),
         deleted: false,
      }
      await PutComment
         .put(`/products/${props.location.elem.id - 1}/coments/${maxID}.json`, comentadd);
      setUpdatePage(!updatepage);
   };


   return (
      <div className="productDetails">
         <h1>ProductDetails</h1>
         <Button onClick={handleOpen}>Edit</Button>
         <Modal
            open={open}
            onClose={handleClose}>

            <div className="product__add_modal">
               <ProductUpdate closeModal={handleClose} elem={product} />
            </div>
         </Modal>
         <div className="productDetails__item">
            <img src={props.location.elem.imageUrl} alt="some img" className="product__img" />
            <span className="productDetails__name"> Name :{product.name}</span>
            <div className="productDetails__dicsription"> Discription: {product.discription}</div>
            <div className="productDetails__info">
               <span className="productDetails__height"> Height: {product.size.height ? product.size.height : null}</span>
               <span className="productDetails__width"> Width: {product.size.width ? product.size.width : null}</span>
               <span className="productDetails__weight"> Weight: {product.size.weight}</span>
            </div>
            <div className="productDetails__coments">
               {product.coments ? product.coments.filter(elem => elem.deleted === false).map(el => {
                  return (
                     <div key={el.id} className="productDeteils__comment">
                        <div className="productDeteils__text">{el.description}</div>
                        <Button onClick={() => { DeleteComent(el) }}>Remove</Button>
                     </div>
                  )
               }) : null}
               <div className="productDeteils__add-coment">
                  <textarea name="" id="" cols="30" rows="10" className="productDeteils__text" value={coment} onChange={e => setComent(e.target.value)}></textarea>
                  <Button onClick={AddComent}>Add coment</Button>
               </div>
               <NavLink
                  to={{
                     pathname: "/",

                  }}
                  exact
               >Back to List
                     </NavLink>
            </div>
         </div>

      </div>
   );
}

export default ProductDetails;