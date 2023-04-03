import { Fragment, useEffect, useState } from 'react'
import { CartDetails } from '../components/Cart/CartDetails'
import { ProductDetails } from '../components/Cart/ProductDetails'
import { ShippingAddress } from '../components/Cart/ShippingAddress'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { setDefaultShippingAddress } from '../app/reducer/shippingAddressSlice'
import { fetchCarts } from '../app/reducer/cartSlice'
import { Helmet } from 'react-helmet';
import { AddressList } from '../components/Cart/AddressList'
import { WaveSpinner } from "react-spinners-kit";
import { Button } from '@mui/material';
import DiscountCollection from '../components/Home/DiscountCollection';
import AddAddress from '../components/Profile/AddAddress';
import AddressForm from './../components/Cart/AddressForm';

export const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const defaultShipping = useSelector((state) => state.shipping_address);
    const charges = useSelector((state) => state.charges);
    const [cartLength, setCartlength] = useState(0);
    const [shippingAddress, setShippingAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [customerAddress, setCustomerAddress] = useState([]);
    const [shippCharges, setShippCharges] = useState([]);
    const [show, setShow] = useState(false);
    const [showList, setShowList] = useState(false);
    const [paymentLoader, setPaymentLoader] = useState(false);
    const [fromList, setFromList] = useState('');
    const [fromAdd, setFromAdd] = useState('');
    const dispatch = useDispatch();

    const [formLoader, setFormLoader] = useState(false);
    const [addressType, setAddressType] = useState([]);
    const [rocketCharges, setRocketCharges] = useState([]);
    const [states, setStates] = useState('');
    const [addressFormShow, setAddressFormShow] = useState(false);
    const [updateAddressId, setUpdateAddressId] = useState(0);
    const [addressInfo, setAddressInfo] = useState(null);
    const navigate = useNavigate();

    let site_info = JSON.parse(window.localStorage.getItem('site_info'));
    const customer = JSON.parse(window.localStorage.getItem('customer'));
    const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
    const billing_address = JSON.parse(window.localStorage.getItem('billing_address'));

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm();

    const handleClose = () => {
        document.getElementById('address_form').reset();
        setShow(false)
    };

    const handleAddressModalClose = () => {

        setUpdateAddressId(0)
        document.getElementById('addressForm').reset();
        setAddressFormShow(false)

    };

    const handleAddressModalShow = () => {
        setAddressFormShow(true);
        setTimeout(() => {
            document.getElementById('addressForm').reset();
        }, 100);
    }

    const handleShow = () => {
        if (!customer?.id) {
            toast.error('Login to add address');
            setTimeout(() => {
                navigate('/login');
            })
        }
        setFromAdd();
        setShow(true);
    }

    const handleListClose = () => {
        setShowList(false)
    };
    const handleListShow = (from_type) => {
        setFromList(from_type)
        setShowList(true);
    };

    async function getAllStates() {
        await axios({
            url: window.API_URL + '/get/states',
            method: 'GET',
        }).then((res) => {

            setStates(res.data);
        }).catch((err) => {
        })
    }

    const handleSetShippingAddressView = (address_id) => {

        if (customerAddress) {

            let ship_selected = customerAddress.find(item => item.id == address_id);
            setShippingAddress(ship_selected);
        }

    }

    useEffect(() => {

        if (Array.isArray(cart.cart.carts)) {
            setCartlength(cart.cart.carts.length);
        } else {
            if (cart.cart.carts) {
                setCartlength(Object.keys(cart.cart.carts).length);
            }
        }
        if (window.localStorage.getItem('address') && window.localStorage.getItem('address') != 'undefined') {
            setCustomerAddress(JSON.parse(window.localStorage.getItem('address')));
        }

        if (site_info) {
            setAddressType(site_info.data.address_type);
        }

        if (shipping_address) {

            handleSetShippingAddressView(shipping_address)
        }

        if (!states) {
            getAllStates();
        }

    }, [shipping_address])


    const NumericOnly = (e) => {
        const reg = /^[0-9\b]+$/
        let preval = e.target.value
        if (e.target.value === '' || reg.test(e.target.value)) return true
        else e.target.value = preval.substring(0, (preval.length - 1))
    }

    const onSubmit = (data) => {
        addAddress(data);
    };

    const sameAsBilling = (e) => {

        if (e.target.checked) {
            setBillingAddress(shipping_address);
            localStorage.setItem('billing_address', shipping_address);
            toast.success('Billing address has been set successfully')

        } else {

            setBillingAddress('');
            localStorage.setItem('billing_address', '');

        }
    }

    const handleSetShippingAddress = (value) => {

        setShippingAddress(value.target.value);
        localStorage.setItem('shipping_address', value.target.value);
        toast.success('Shipping address has been set successfully')
        // if (from_type === 'billing') {

        //     setBillingAddress(address);
        //     localStorage.setItem('billing_address', JSON.stringify(address));
        //     toast.success('Billing address has been set successfully')

        // } else {

        //     setShippingAddress(address);
        //     dispatch(setDefaultShippingAddress(address));
        //     localStorage.setItem('shipping_address', JSON.stringify(address));
        //     toast.success('Shipping address has been set successfully')
        //     // document.getElementById('same_as_billing').checked = false;
        // }
        // getShippingRocketCharges(address, from_type);
        // handleListClose();

    }

    const handleSetBillingAddress = (value) => {

        setBillingAddress(value.target.value);
        localStorage.setItem('billing_address', value.target.value);
        toast.success('Billing address has been set successfully')

    }

    const getShippingRocketCharges = (address, from_type) => {

        const customer = JSON.parse(window.localStorage.getItem('customer'));
        axios({
            url: window.API_URL + '/get/shipping/rocket/charges',
            method: 'POST',
            data: { customer_id: customer.id, address: address, from_type: from_type },
        }).then((res) => {
            setRocketCharges(res.data.shiprocket_charges);
            localStorage.setItem('shiprocket_charges', JSON.stringify(res.data.shiprocket_charges));
        }).catch((err) => {
        })

    }

    async function addAddress(formData) {

        setFormLoader(true);
        axios({
            url: window.API_URL + '/add/customer/address',
            method: 'POST',
            data: formData,
        }).then((res) => {
            setFormLoader(false);
            if (res.data.error == 1) {
                let error_message = res.data.message;
                error_message.forEach(x => toast.error(x));
                reset();
            } else {
                toast.success(res.data.message);

                localStorage.setItem('address', JSON.stringify(res.data.customer_address));

                let defaultShip = res.data.customer_address.find(item => item.is_default == 1);
                if (defaultShip) {
                    setShippingAddress(defaultShip.id);
                    localStorage.setItem('shipping_address', defaultShip.id);
                }
                reset();
                handleClose();
            }
        }).catch((err) => {
        })

    }

    const proceedCheckout = () => {

        if (!shippingAddress) {
            toast.error('Please select address to proceed')
            return false;
        }

    }

    async function updateCartAmount(shipping_id, type = '') {
        const customer = JSON.parse(window.localStorage.getItem('customer'));
        if (!customer?.id) {

            toast.error('Login to Apply Shipping Charges');
            navigate('/login')
        }
        await axios({
            url: window.API_URL + '/update/cartAmount',
            method: 'POST',
            data: { shipping_id: shipping_id, customer_id: customer.id, type: type },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))
        }).catch((err) => {

        })
    }

    console.log(shippingAddress, 'shippingAddress ')

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div>
                {
                    cart.cart.carts && cartLength > 0 && JSON.stringify(cart.cart.carts) !== '{}' ?
                        <section className="shop-carts">
                            <div className="container">
                                <div className="row">
                                    <>
                                        <div className="col-lg-8">
                                            <div className="finalcart-list">
                                                <ProductDetails cart={cart.cart.carts} cart_total={cart.cart.cart_total} getShippingRocketCharges={getShippingRocketCharges} />
                                                <div className="shipping-addresss">
                                                    <ShippingAddress handleSetShippingAddress={handleSetShippingAddress} handleSetBillingAddress={handleSetBillingAddress} sameAsBilling={sameAsBilling} handleShow={handleShow} customerAddress={customerAddress} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <CartDetails billingAddress={billingAddress} setPaymentLoader={setPaymentLoader} cart_total={cart.cart.cart_total} cart_items={cart.cart.carts} shippingAddress={shippingAddress} proceedCheckout={proceedCheckout} shippCharges={cart.cart.shipping_charges} cartInfo={cart.cart} customerAddress={customerAddress} updateCartAmount={updateCartAmount} />
                                        </div>
                                    </>
                                </div>
                            </div>
                            {
                                paymentLoader &&

                                <div id="cart-loader" >
                                    <div className='loader-wrapper'>
                                        <WaveSpinner
                                            size={100}
                                            color="#0a1d4a"
                                            loading={paymentLoader}

                                            style={{ top: '50%', left: '45%' }}

                                        />
                                        <div className='loader-text'> Payment Processing, Don't try to go back or refresh </div>
                                    </div>
                                </div>
                            }
                        </section>
                        :
                        <div className="jumbotron text-gray" >
                            <div className='container  p-4'>
                                <div className='row m-0 align-items-center'>
                                    <div className='col-md-10'>
                                        <h2 className='text-primary'>Your cart</h2>
                                        <p className='mb-3'>is empty, A few clicks is all it takes.</p>
                                        <Button variant="outlined" className='btn-dark' color='light' onClick={() => navigate('/')} role="button"> <i className="bi bi-music-note-beamed me-2 fs-5"></i> Shop now </Button>
                                    </div>
                                    <div className='col-md-2 text-center'>
                                        <div>
                                            <img src={require('../assets/images/empty-cart.png')} alt="empty-cart" width={180} />
                                            <div>
                                                <b className='h5 text-uppercase'> Cart is empty!. </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            <AddressForm states={states} show={show} setShow={setShow} addressType={addressType} customer={customer} setCustomerAddress={setCustomerAddress} />
        </Fragment>
    )
}
