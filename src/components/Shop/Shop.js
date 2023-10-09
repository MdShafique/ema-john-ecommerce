import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDislpayProducts] = useState([]);

    useEffect(()=>{
        fetch('./products.JSON')
        .then(res =>res.json())
        .then(data=> {
            setProducts(data);
            setDislpayProducts(data);

        });
    }, []);

    useEffect(()=>{
        if(products.length){
            const saveCart = getStoredCart();
            const storeCart =[];
            for(const key in saveCart){
                const addedProduct = products.find(product=>product.key===key);
                if(addedProduct){
                    const quantity = saveCart[key];
                    addedProduct.quantity = quantity;
                    storeCart.push(addedProduct);
                }
                
            }
            setCart(storeCart);
        }
    }, [products])

    const handleAddToCart = (product) =>{
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if(exists){
            const rest =cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
        }
        else{
            product.quantity= 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
    }

    const handlesearch = event =>{
        const searchText = event.target.value;
        const matchProducts = products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDislpayProducts(matchProducts);
    }


    return (
        <>
            <div className='search-container'>
                <input type='text'
                onChange={handlesearch}
                placeholder='Search Product'/>
            </div>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                    displayProducts.map(product=> <Product 
                        key={product.key}
                        product={product}
                        handleAddToCart = {handleAddToCart}
                        >

                        </Product>)
                    }
                </div>
                <div className='cart-container'>
                    <Cart cart={cart}>
                        <Link to='/review'>
                            <button className='btn-regular'>Review Your Order</button>
                        </Link>
                    </Cart>
                </div> 
            </div>
        </>
    );
};

export default Shop;