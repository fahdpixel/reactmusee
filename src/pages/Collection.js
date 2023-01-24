import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { FilterPane } from '../components/Filter/FilterPane';
import { ProductCount } from '../components/Filter/ProductCount';
import { SortBy } from '../components/Filter/SortBy';
import { Submenu } from '../components/Layouts/Submenu';
import { OtherCategory } from '../components/Sliders/OtherCategory';
import SideCustomScrollbar from './../components/SideCustomScrollbar';
import { Filter } from './Filter';
import { fetchProducts } from './../app/reducer/productFilterSlice';
import { Helmet } from 'react-helmet';

export const Collection = () => {

    const [filterStaticMenu, setFilterStaticMenu] = useState([]);

    const dispatch = useDispatch();

    async function getFilterStaticMenuData() {
        await fetch(window.API_URL + '/get/filter/static/sidemenus')
            .then((response) => response.json())
            .then((data) => setFilterStaticMenu(data))
            .catch((err) => {
                // console.log(err.message)
            });
    }

    useEffect(() => {
        getFilterStaticMenuData();
        dispatch(fetchProducts());
    }, []);


    // const isSideBarOpen = useSelector((state) => state.sideMenuBar.value);
    return (
        <Fragment>
            <Helmet>

                <title> Product Filters | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                
                {/* <meta name="keyword" content="" /> */}
                
               
                {/* <meta name="description" content={productInfo.meta.meta_description} /> */}
            </Helmet>
            <SideCustomScrollbar />
            <Submenu />

            <section className="all-pianos-list">
                <div className="container">
                    <div className="row">

                        <Filter filterStaticMenu={filterStaticMenu} />

                        <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <div className="pianos-lists">

                                <div className="col-lg-12 col-md-12 col-sm-12 d-flex
                                    justify-content-between">
                                    <div className="primary-heads">
                                        <ProductCount />
                                    </div>
                                    <SortBy sort_by={filterStaticMenu.sory_by} />
                                </div>

                                <FilterPane />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="browse-categories">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="common-heads light">
                                <h2>Browse our other categories</h2>
                            </div>
                        </div>
                        <OtherCategory />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
