import React, { Fragment } from 'react'
import { fetchProducts } from './../../app/reducer/productFilterSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AttributeCollection = ({ dynamicFilter }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getProduct = (e) => {
        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        var array = []
        var checkboxes = document.querySelectorAll('.filter_dynamic_attributes:checked')

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
        }
        if (array.length > 0) {
            let checkedAvailabilityString = array.join("-");
            url.searchParams.set("attributes_category", checkedAvailabilityString);
        } else {
            url.searchParams.delete("attributes_category");
        }
        navigate(SUrl + url.search);
        dispatch(fetchProducts());

    }
    return (
        <Fragment>
            <div className="filter-lists">
                {
                    dynamicFilter.map((item) => (
                        <ul>
                            <h4> {item.filter_title} </h4>
                            {
                                item.child && item.child.map((items) => (
                                    <li >
                                        <label className="cstm-chkbx">
                                            {items.title } : {items.attribute_values}

                                            <input type="checkbox" name='filter_dynamic_attributes[]' value={items.id} className='filter_dynamic_attributes' onChange={() => getProduct()} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </li>
                                ))
                            }
                        </ul>
                    ))
                }
            </div>
        </Fragment>
    )
}
