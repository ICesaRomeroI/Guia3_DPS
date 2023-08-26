import React, { useState } from "react";
import Modal from "react-modal"
import {data} from "../components/data";


export const ProductList = ({
    allProducts,
    setAllproducts,
    total,
    setTotal,
    setCountProducts,
    countProducts,
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = product => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    } 
    const closeModal = () =>{
        setSelectedProduct(null);
        setModalIsOpen(false);
    }

    const onAddProduct = product =>{
        if(allProducts.find(item => item.id === product.id)){
            const products = allProducts.map(item => item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
                );
                setTotal(total + product.price * product.quantity);
                setCountProducts(countProducts + product.quantity);
                return setAllproducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllproducts([...allProducts, product]);
    };
    return(
        <div className="container-items">
            {data.map(product =>(
                <div className="item" key={product.id}>
                    <figure onClick={()=> openModal(product)}>
                        <img src={product.urlImage} alt={product.title} />
                    </figure>
                    <div className="info-product">
                        <h2>{product.title}</h2>
                        <p className="price">${product.price}</p>
                        <button onClick={() => onAddProduct(product)} className="btn-add-cart"> Añadir al Carrito</button>
                    </div>
                </div>
            ))}
            {/* Modal */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="mod">
                {selectedProduct && (
                    <div className="modal">
                        <button className="modal-close-button" onClick={closeModal}>&times;</button>
                        <h2>{selectedProduct.title}</h2>
                        <p>{selectedProduct.description}</p>                        
                    </div>
                )}
            </Modal>
        </div>
    );
}
