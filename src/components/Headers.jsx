import { useState } from "react"

export const Header = ({
            allProducts,
            setAllproducts,
            total,
            countProducts,
            setCountProducts,
            setTotal,
}) => {
    const [active, setActive] = useState(false)

    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );
        const eliminarProducto = parseInt(prompt(`¿Cuántas unidades de ${product.title} deseas eliminar?`, "1"));
    
        if (!isNaN(eliminarProducto) && eliminarProducto > 0) {
            if (eliminarProducto >= product.quantity) {
                // Eliminar todas las unidades del producto
                setTotal(total - product.price * product.quantity);
                setCountProducts(countProducts - product.quantity);
                const updatedProducts = allProducts.filter(item => item.id !== product.id);
                setAllproducts(updatedProducts);
            } else {
                // Eliminar la cantidad especificada
                setTotal(total - product.price * eliminarProducto);
                setCountProducts(countProducts - eliminarProducto);
                const updatedProducts = allProducts.map(item => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity - eliminarProducto };
                    }
                    return item;
                });
                setAllproducts(updatedProducts);
            }
        }
    };
    const onCleanCart = () => {
        const EliminarConfirm = window.confirm("¿Estás seguro de que deseas vaciar el carrito?");

        if(EliminarConfirm){
            setAllproducts([]);
            setTotal(0);
            setCountProducts(0);
        }
        
    };
    return(
        <header>
            <h1>Tienda de Libros</h1>
            <div className="container-icon">
                <div className="container-cart-icon" onClick={() => setActive(!active)}>
                <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito" className="icon-cart" />
                <div className="count-products">
                    <span id="contador-productos">{countProducts}</span>
                </div>
                </div>   
                <div className={`container-cart-products ${ active ? '' : 'hidden-cart'}`}>
                    {allProducts.length ?(
                    <>
                    <div className="row-product">
                        {allProducts.map(product => (
                            <div className="cart-product" key={product.id}>
                                <div className="info-cart-product">
                                    <span className="img-product">
                                       <img src={product.urlImage} alt={product.title} className="img-carrito" />
                                    </span>
                                    <span className="cantidad-producto-carrito">
                                        {product.quantity}
                                    </span>
                                    <p className="titulo-producto-carrito">
                                        {product.title}
                                    </p>
                                    <span className="precio-producto-carrito">
                                        ${product.price}
                                    </span>
                                </div>
                                <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png" alt="cerrar" className="icon-close" onClick={() => onDeleteProduct(product)}/>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                       <h3>Total</h3>
                       <span className="total-pagar">${total}</span> 
                    </div>
                    <button className="btn-clear-all" onClick={onCleanCart}>Vaciar Carrito</button>
                   </>
                    ) : (
                        <p className="cart-empty">El carrito esta Vacio</p>
                    )}
                    </div>
                </div>                                   
        </header>
    );
};