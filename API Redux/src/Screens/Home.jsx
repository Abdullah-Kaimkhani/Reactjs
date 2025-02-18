import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Components/Navbar'
import Cards from '../Components/Card';
import { fetchData } from '../store/slices/ProductSlice';


const Home = () => {
    const { isloading, isError, allProducts } = useSelector((state) => state.productReducer);
    console.log(isloading, isError, allProducts);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    }, [])

    return (
        <>
            <Navbar />
            {
                isloading ? (<h1>Loading...</h1>) : (allProducts.map((e, i) => {
                    return (
                        <div style={{ marginTop: 30 }}>
                            <Cards key={i} title={e.title} desc={e.desc} imgSrc={e.image} product={e} />
                        </div>
                    )
                })
                )}
        </>
    )
}

export default Home