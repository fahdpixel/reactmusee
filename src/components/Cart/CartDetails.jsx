import { Fragment, useEffect, useState } from 'react'
import { ShippingFee } from './ShippingFee'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useRazorpay from 'react-razorpay';
import { toast } from 'react-toastify';
import { setPaymentResponse } from '../../app/reducer/paymentResponseSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart, fetchCarts } from '../../app/reducer/cartSlice';
import './cart.css';
import { RocketShippingFee } from './RocketShippingFee';
import { Button } from 'rsuite';
import { Tooltip } from '@mui/material';
import { setCoupon } from '../../app/reducer/couponSlice';


export const CartDetails = ({ billingAddress, setPaymentLoader, cart_total, cart_items, shippingAddress, proceedCheckout, shippCharges, updateCartAmount, cartInfo }) => {
    
    const coupon = useSelector((state) => state.coupon);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checkoutFormloading, setCheckoutFormLoading] = useState(false);
    const Razorpay = useRazorpay();
    const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
    // const couponInfo = sessionStorage.getItem('cart_coupon') ? JSON.parse(sessionStorage.getItem('cart_coupon')) : '';

    const handlePayment = async () => {
        setCheckoutFormLoading(true);
        setPaymentLoader(true);

        const customer = JSON.parse(window.localStorage.getItem('customer'));
        const shipping_address = JSON.parse(window.localStorage.getItem('shipping_address'));
        const shiprocket_charges = localStorage.getItem('shiprocket_charges') ? JSON.parse(localStorage.getItem('shiprocket_charges')) : []
        // console.log( shipping_address, 'shipping_address')
        // console.log( shiprocket_charges, 'shiprocket_charges')
        // return false;
        if (!shippingAddress) {
            toast.error('Shipping address is required');
            setCheckoutFormLoading(false);
            setPaymentLoader(false);
        } else if (!billingAddress) {
            toast.error('Billing address is required');
            setCheckoutFormLoading(false);
            setPaymentLoader(false);
        } else {
            console.log('going to checkout');
            axios({
                url: window.API_URL + '/proceed/checkout',
                method: 'POST',
                data: { customer_id: customer.id, shipping_address: shipping_address, shiprocket_charges: shiprocket_charges, billing_address: billingAddress, cart_total: cart_total, cart_items: cart_items, shipping_id: cartInfo.shipping_id },
            }).then((response) => {
                if (response.error == 1) {
                    toast.error(response.message);
                } else {
                    verifyPayment(response.data);
                }
            });
        }
    }

    const verifyPayment = async (params) => {

        const options = {
            key: params.key,
            amount: params.amount,
            currency: params.currency,
            name: params.name,
            description: params.description,
            image: params.image,
            order_id: params.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                verifySignature(response, 'success')
            },
            prefill: {
                name: params.prefill.name,
                email: params.prefill.email,
                contact: params.prefill.contact,
            },
            notes: {
                address: params.notes.address,
            },
            theme: {
                color: params.theme.color,
            },
        }

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            verifySignature(response, 'fail')
        });

        rzp1.open();
    };

    const verifySignature = (data, type) => {

        const customer = JSON.parse(window.localStorage.getItem('customer'));

        axios({
            url: window.API_URL + '/verify/payment/signature',
            method: 'POST',
            data: { razor_response: data, customer_id: customer.id, status: type },
        }).then((response) => {

            setCheckoutFormLoading(false);
            setPaymentLoader(false);
            if (response.data.success) {
                localStorage.removeItem('shipping_address');
                localStorage.removeItem('cart');
                localStorage.removeItem('shiprocket_charges');
                dispatch(clearCart());
                toast.success(response.data.message);
                navigate('/thankyou/success');
            } else {
                toast.error(response.data.message);

                // navigate('/thankyou/fail');
            }

        });

    }

    const applyCoupon = () => {
        setIsLoadingCoupon(true);
        let customer = JSON.parse(window.localStorage.getItem('customer'));
        if( !customer?.id) {
            
            toast.error('Login to Apply Coupon');
            navigate('/login')
        }    
        var coupon_code = document.getElementById('coupon').value;

        if (coupon_code == '') {
            toast.error('Coupon code is required');
            document.getElementById('coupon').focus();
            setIsLoadingCoupon(false);
            return false;
        }

        axios({
            url: window.API_URL + '/apply/coupon',
            method: 'POST',
            data: { coupon_code: coupon_code, customer_id: customer.id },

        }).then((res) => {
            setIsLoadingCoupon(false);
            if (res.data.status == 'error') {
                toast.error(res.data.message);
            } else if (res.data.status == 'success') {
                toast.success(res.data.message);
            }
            dispatch(setCoupon(res.data));
            localStorage.setItem('cart', JSON.stringify(res.data.cart_info));
            sessionStorage.setItem('cart_coupon', JSON.stringify(res.data.coupon_info));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })

    }

    const cancelCoupon = () => {
        fetchCartProducts();
        dispatch(setCoupon(''));
        let cancelApplyBtn = document.getElementById('coupon');
        cancelApplyBtn.value = '';
    }

    async function fetchCartProducts() {

        let customer = JSON.parse(window.localStorage.getItem('customer'));

        await axios({
            url: window.API_URL + '/get/cart',
            method: 'POST',
            data: { customer_id: customer?.id, guest_token: localStorage.getItem('guest_token') || '' },
        }).then((res) => {

            localStorage.setItem('cart', JSON.stringify(res.data));
            dispatch(fetchCarts(JSON.parse(window.localStorage.getItem('cart'))))

        }).catch((err) => {

        })
    }


    return (
        <Fragment >
            <h5 className='text-primary mb-3 fw-bold text-uppercase'>Cart Details</h5>
            <div className="card mb-3">
                <div className="card-body">
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between">
                            <b>Sub Total</b>
                            <span className='text-dark fw-bold'>₹{cart_total.product_tax_exclusive_total}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <b>Taxes</b>
                            <span className='text-dark fw-bold'>₹{cart_total.tax_total}</span>
                        </li>
                    </ul>
                    <ShippingFee shippCharges={shippCharges} updateCartAmount={updateCartAmount} cartInfo={cartInfo} />
                    <ul className="list-group my-3">
                        <li className="list-group-item d-flex justify-content-between align-items-end">
                            <b className='lead'>Grand Total</b>
                            <span className='text-dark fw-bold lead'>₹{cart_total.total}</span>
                        </li>
                    </ul>
                    {shippingAddress &&
                        <ul className="list-group my-3">
                            <li className="list-group-item">
                                <b className='text-capitalize text-primary'>
                                    <i className="fa fa-map-marker"></i>  {shippingAddress.name}
                                </b>
                                <div className='text-secondary fw-bold'>
                                    {shippingAddress.address_line1},
                                    {shippingAddress.city}
                                    {shippingAddress.state}
                                    {shippingAddress.post_code}
                                </div>
                            </li>
                        </ul>
                    }
                    <div className='mb-1 fw-bold text-primary'>
                        Have a Coupon?
                        <Tooltip title="Get More, Spend Less!" placement="top-start" arrow>
                            <i className="fa fa-info-circle ms-1 text-secondary"></i>
                        </Tooltip>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control border" placeholder='Enter here..' />
                        <Button loading={isLoadingCoupon} className="btn text-white bg-dark" onClick={() => applyCoupon()}>Apply</Button>
                        {/* loading={true} */}
                    </div>
                    <Button className='btn-dark text-white w-100' size='lg'
                        onClick={() => handlePayment()}
                        loading={checkoutFormloading}
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
            {/* <div className="cart-boduy">
                <h4>Cart Details</h4>
                <h5>Cart Subtotal</h5>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Sub Total</td>
                            <td>₹{cart_total.product_tax_exclusive_total}</td>
                        </tr>
                        <tr>
                            <td>Taxes</td>
                            <td>₹{cart_total.tax_total}</td>
                        </tr>
                        {
                            cart_total.coupon_amount ?
                                <tr>
                                    <td>
                                        Coupon {cart_total.coupon_code} (-)
                                        <div className='coupon-pane'>
                                            {
                                                couponInfo && couponInfo.coupon_code &&
                                                <div>
                                                    <div>Code : {couponInfo.coupon_code} {couponInfo.coupon_type.discount_type == 'percentage' ? '(' + parseInt(couponInfo.coupon_type.discount_value) + '%)' : ''}</div>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                    <td>₹{cart_total.coupon_amount}</td>
                                </tr>
                                : null
                        }
                    </tbody>
                </table>
                <div className="line-spacer"></div>

                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>Ship To:</td>
                            <td><a href="">Changes Address</a></td>
                        </tr>
                        <tr>
                            {shippingAddress &&
                                <td colSpan="2">
                                    {shippingAddress.name}
                                    <br /> {shippingAddress.address_line1},
                                    {shippingAddress.city}
                                    {shippingAddress.state}
                                    {shippingAddress.post_code}
                                </td>
                            }

                        </tr>
                    </tbody>
                </table>

                <ShippingFee shippCharges={shippCharges} updateCartAmount={updateCartAmount} cartInfo={cartInfo} />

                <div className="line-spacer"></div>
                <div className="line-spacer"></div>
                <table className="table table-borderless end-point">
                    <tbody>
                        <tr>
                            <td>Grand Total</td>
                            <td> ₹{cart_total.total} </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={() => handlePayment()} disabled={`${checkoutFormloading ? 'disabled' : ''}`}>
                                    {checkoutFormloading && (
                                        <span className="spinner-grow spinner-grow-sm"></span>
                                    )}
                                    Proceed to Checkout
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div> */}
        </Fragment>
    )
}
