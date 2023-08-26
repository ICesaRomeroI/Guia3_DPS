import { useState } from "react";
import {Header} from "./components/Headers";
import {ProductList} from "./components/ProductList";


function App(){
    const [allProducts, setAllproducts] = useState([]);
    const [total, setTotal] = useState([0]);
    const [countProducts, setCountProducts] = useState(0);

    return(
        <>
        <Header 
            allProducts={allProducts}
            setAllproducts={setAllproducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
            />
        <ProductList
            allProducts={allProducts}
            setAllproducts={setAllproducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
        />
        </>
    );
}    
export default App 