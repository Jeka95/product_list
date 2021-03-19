import React from 'react';
import Button from '@material-ui/core/Button';

import postProducts from "../../instance";
import "./index.scss";


class AddProduct extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         img: "",
         count: "",
         height: "",
         width: "",
         weight: "",
         discription: "",
         id: this.props.ID + 1,
      }
      this.handleChange = this.handleChange.bind(this);
   }
   handleChange(event) {
      this.setState({ [event.target.name]: event.target.value });
   };

   async CreateProduct() {
      let resulProduct = {
         id: this.state.id,
         name: this.state.name,
         discription: this.state.discription,
         weight: this.state.weight,
         size: {
            height: this.state.height,
            width: this.state.width,
         },
         imageUrl: this.state.img,
         deleted: false,
         count: this.state.count,
      }
      await postProducts
         .put(`/products/${this.props.ID}.json`, resulProduct);
      this.setState = {
         name: "",
         img: "",
         count: "",
         height: "",
         width: "",
         weight: "",
         discription: "",
         id: "",
      }
      this.props.closeModal();
   }


   render() {
      return (<>
         <h2 className="createProduct">Add Product</h2>
         <form action="" className="createProduct__form_create">
            <label className="createProduct__name">Product Name <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /> </label>
            <label className="createProduct__img"> Product Img<input type="text" name="img" value={this.state.img} onChange={this.handleChange} /> </label>
            <label className="createProduct__count"> Count<input type="number" name="count" value={this.state.count} onChange={this.handleChange} />  </label>
            <label className="createProduct__height"> Product height<input type="text" name="height" value={this.state.height} onChange={this.handleChange} /> </label>
            <label className="createProduct__width"> Product width<input type="text" name="width" value={this.state.width} onChange={this.handleChange} /> </label>
            <label className="createProduct__weight"> Product weight<input type="text" name="weight" value={this.state.weight} onChange={this.handleChange} /> </label>
            <label className="createProduct__discription">Product discription <textarea name="discription" type="text" value={this.state.discription} onChange={this.handleChange} /> </label>
         </form>
         <div className="createProduct__btn">
            <Button variant="contained" color="primary" onClick={() => { this.CreateProduct() }}>Save</Button>
            <Button variant="contained" color="secondary" onClick={this.props.closeModal} >Cancel</Button>
         </div>
      </>);
   }
}

export default AddProduct;
