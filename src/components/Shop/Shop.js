import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        console.log('Product api called');
        fetch('./products.JSON')
        .then(res =>res.json())
        .then(data=> {setProducts(data);
            console.log('product recieved');
        });
    }, []);

    useEffect(()=>{
        console.log('LocalStorage cart called')
        if(products.length){
            const saveCart = getStoredCart();
            const storeCart =[];
            for(const key in saveCart){
                const addedProduct = products.find(product=>product.key===key);
                storeCart.push(addedProduct);
            }
            setCart(storeCart);
        }
    }, [products])

    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    }


    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product=> <Product 
                        key={product.key}
                        product={product}
                        handleAddToCart = {handleAddToCart}
                        >

                        </Product>)
                }
            </div>
            <div className='cart-container'>
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;