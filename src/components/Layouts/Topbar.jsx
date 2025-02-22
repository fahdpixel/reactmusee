import { Fragment, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutCustomer } from '../../app/reducer/customerSlice';
import { clearCart } from '../../app/reducer/cartSlice';
import axios from 'axios';
import { MagicSpinner } from "react-spinners-kit";
import './globalsearch.css';

export default function Topbar({ isTopPage }) {
    const customer = useSelector((state) => state.customer);
    const location = useLocation();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [searchData, setSearchData] = useState([]);
    const [searchStart, setSearchStart] = useState(false);
    const getTotalQuantity = () => {

        let total = 0;
        (cart.length > 0 || typeof cart == 'object') && cart?.cart?.carts && Object.entries(cart.cart.carts).map((key, item) => {

            return total += cart.cart.carts[item].quantity;
        })

        setCartCount(total);
        return total
    }
    useMemo(() => {
        getTotalQuantity();
    }, [cart])
    const logout = () => {
        localStorage.removeItem('customer');
        dispatch(clearCart());
        dispatch(logoutCustomer());
        localStorage.removeItem('shipping_address');
        localStorage.removeItem('cart');
        localStorage.removeItem('shiprocket_charges');
        localStorage.removeItem('address');
        sessionStorage.removeItem('cart_coupon')
        if (location.pathname == '/cart') {
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    const globalSearch = (event) => {
        setSearchStart(true)
        var search_type = 'product';
        var search_field = event.target.value;
        var element = document.getElementById('parent_search_tab');
        element.classList.add('bluebg')
        getAllStates(search_type, search_field);
    }
    async function getAllStates(search_type, search_field) {
        await axios({
            url: window.API_URL + '/get/global/search',
            method: 'POST',
            data: { search_type: search_type, search_field: search_field }
        }).then((res) => {
            setSearchData(res.data.products);
            setSearchStart(false)
        })
    }
    window.addEventListener('click', function (e) {
        if (document.getElementById('search-input').contains(e.target)) {
            var element = document.getElementById('parent_search_tab');
            element.classList.remove('bluebg')
        } else {
            var element = document.getElementById('parent_search_tab');
            element.classList.remove('bluebg')
        }
    });

    const commonUrl = new URL(window.location.href);
    var checkUrlChanged = commonUrl.hash.replace('/', '');
    useMemo(() => {
        var incUrl = ['#', '#brand', '#cart', '#login', '#register', '#forgotpassword'];
        if (incUrl.includes(checkUrlChanged)) {
            sessionStorage.removeItem('topSubMenu');
        }
    }, [checkUrlChanged])

    return (
        <Fragment>
            <div className={`top-bar ${isTopPage ? "top-fix" : ""}`} >
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="top-logo">
                                    <Link to="/">
                                        <img src="/assets/images/logo.svg" alt="" />
                                    </Link>
                                </div>
                                <div className="top-search">
                                    {/* <div className="">
                                        <select className="form-control" id="enq" name="enq" >
                                            <option value="product" selected >All Products</option>
                                        </select>
                                    </div> */}
                                    <div className={`form-data ${searchData.length > 0 ? 'bluebg' : ''}`} id='parent_search_tab'>
                                        <input className="src-blnk pe-5" id='search-input' type="search" onChange={globalSearch} placeholder="Search..." />
                                        <ul className="list-group src-fndings " id='searchPane'>

                                            {searchData.length > 0 ? searchData.map((item, i) => (
                                                <li key={i} className='list-group-item list-group-item-action'>
                                                    {
                                                        item.has_data === 'yes' ?
                                                            item.product_name ?
                                                                <Link to={`/product/${item.product_url}`} className="w-100" >
                                                                    <div className='w-100 m-flex'>
                                                                        <div className='w-20 bg-white text-center '>
                                                                            <img src={item.image} />
                                                                        </div>
                                                                        <div className='w-80 ps-3'>
                                                                            <label>
                                                                                {item.product_name}
                                                                            </label>
                                                                            <span>
                                                                                Home | {item.parent_category_name} | {item.category_name} | {item.brand_name} | {item.product_name}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                </Link>
                                                                :
                                                                <Link to='/'>
                                                                    <img src={item.image} width="100" /> {item.product_name}
                                                                    <span>
                                                                        Home | {item.parent_category_name} | {item.category_name} | {item.brand_name} | {item.product_name}
                                                                    </span>
                                                                </Link>

                                                            :
                                                            <div className='w-100' style={{ textAlign: 'center' }}> {item.message}</div>
                                                    }
                                                </li>

                                            ))
                                                :


                                                !searchStart ?
                                                    (
                                                        <div className='w-100' style={{ textAlign: 'center' }}> No records found</div>
                                                    )

                                                    :
                                                    (<li style={{ height: 'inherit' }}>
                                                        <div id="product-loader" className='w-100' >
                                                            <div className='product-wrapper'>
                                                                <MagicSpinner
                                                                    size={100}
                                                                    color="#0a1d4a"
                                                                    loading={true}
                                                                    style={{ top: '50%', left: '45%' }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </li>)

                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className="top-icons">
                                    <ul>
                                        <li>
                                            <Link to="cart">
                                                <img src="/assets/images/cart.png" alt="" />
                                                <span className={`cart-tpimg ${cartCount > 0 ? '' : 'hide'}`}>{cartCount}</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`${customer.value ? '/profile' : '/login'}`}>
                                                <img src="/assets/images/user.png" alt="" />
                                            </Link>
                                        </li>
                                        {
                                            customer.value ?

                                                <li>
                                                    <span onClick={() => logout()}>
                                                        <img src="/assets/images/logout.png" alt="" />
                                                    </span>
                                                </li>
                                                : null}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}
