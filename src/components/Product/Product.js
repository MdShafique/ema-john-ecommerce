import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import Rating from 'react-rating';

const product = (props) => {

    // console.log(props)
    const {name, img, price,seller, stock, star} = props.product;
    const element = <FontAwesomeIcon icon={faShoppingCart} />;

    return (
        <div className='product'>
            <div>
                <img src={img} alt=''/>
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <p><small>{seller}</small></p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock order soon</small></p>
                <Rating
                initialRating={star} 
                emptySymbol="far fa-star icon-color"
                fullSymbol="fas fa-star icon-color"
                readonly></Rating>
                <br/>
                <button onClick={()=>props.handleAddToCart(props.product)} className='btn-regular'>{element} Add To Cart</button>
            </div>
        </div>
    );
};

export default product;