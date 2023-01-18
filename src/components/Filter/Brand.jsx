import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBrands } from '../../app/reducer/brandSlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from './../../app/reducer/productFilterSlice';

export const Brand = () => {
    
    const brandData = useSelector((state) => state.brands);
    const [searchField, setSearchField] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchBrands());
    }, [])

    const CommonUrl = new URL(window.location.href);
    var brandSelected = [];
    if( CommonUrl.searchParams.get('brand') ) {
        brandSelected = CommonUrl.searchParams.get('brand').split("_") ;
    }

    const filteredBrands = brandData.brands.filter(
        brand => {
            return (
                brand.title.toLowerCase().includes(searchField.toLocaleLowerCase())
            )
        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
    };
     
    const getProduct = (e) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.filter_brand:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("_");
            url.searchParams.set("brand", checkedAvailabilityString);
        } else {
            url.searchParams.delete("brand");
        }
        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }

    return (
        <Fragment>
            {
                brandData.brands && (
                    <div className="filter-lists mnh-ght mCustomScrollbar">
                        <ul>
                            <h4>Brands</h4>
                            <li>
                                <input type="search" placeholder="Search..." onChange={() => handleChange} />
                            </li>
                            {
                                filteredBrands ? filteredBrands.map((item, i) => (
                                    <li key={i} oncl>
                                        <label className="cstm-chkbx"> {item.title}
                                            <input type="checkbox" checked={ (brandSelected.includes(item.slug) ? 'checked' : '')} name='brand[]' className='filter_brand' value={item.slug} onChange={()=>getProduct()} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                )) :
                                <></>
                                   
                            }
                        </ul>
                        <span className={`shw-all `} >
                            <Link to='/brand'>
                                Show all brands
                            </Link>
                        </span>
                    </div>
                )
            }
           
        </Fragment>
    )
}
