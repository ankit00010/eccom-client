import React from 'react';
import AllProductsContainer from '../container/allProductsContainer';

const AllProducts = () => {
    return (
        <div>
            <AllProductsContainer showHeader={true} showFilter={true} />
        </div>
    );
}

export default AllProducts;
