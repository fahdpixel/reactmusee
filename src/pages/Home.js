import React, { Fragment, useEffect, useState } from 'react'
import DiscountCollection from '../components/Home/DiscountCollection';
import SideCustomScrollbar from '../components/SideCustomScrollbar';
import HistoryVideo from '../components/Home/HistoryVideo';
import { CollectionSectionOne } from '../components/Sliders/CollectionSectionOne';
import { LiveVideo } from '../components/LiveVideo';
import { CollectionToprank } from '../components/Sliders/CollectionToprank';
import { CollectionTrending } from '../components/Sliders/CollectionTrending';
import { CollectionBlockBuster } from '../components/Sliders/CollectionBlockBuster';
import { Brand } from '../components/Sliders/Brand';
import { CollectionKeyboards } from '../components/Sliders/CollectionKeyboards';
import { CollectionBestSeller } from '../components/Sliders/CollectionBestSeller';
import { CollectionControlTunes } from '../components/Sliders/CollectionControlTunes';
import { CollectionRecommend } from '../components/Sliders/CollectionRecommend';
import { RecentView } from '../components/Sliders/RecentView';
import { Testimonials } from '../components/Sliders/Testimonials';
import { PackageSupport } from '../components/Home/PackageSupport';
import HomeCarousel from './../components/Carousel/HomeCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { useLocation } from 'react-router-dom';
import { clearCart } from '../app/reducer/cartSlice';
import { clearAttemptItem } from '../app/reducer/attemptedCartSlice';
import { Helmet } from 'react-helmet';


export default function Home() {
    
    const dispatch = useDispatch();
    const customer = JSON.parse(window.localStorage.getItem('customer'));
    

    useEffect(() => {
        if( !customer ) {
            dispatch(clearCart());
            // dispatch(clearAttemptItem())
        }
        const openSideBar = () => {
            dispatch(isOpenSideBar());
        }
    }, [])
    

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Musee Musical</title>
                <link rel="canonical" href="https://museemusical.shop/" />
            </Helmet>
            <HomeCarousel />
            <DiscountCollection />
            <HistoryVideo />
            <CollectionSectionOne />
            <LiveVideo />
            <CollectionToprank />
            <CollectionTrending />
            <CollectionBlockBuster />
            <Brand />
            <CollectionKeyboards />
            <CollectionBestSeller />
            <CollectionControlTunes />
            <CollectionRecommend />
            <RecentView />
            <Testimonials />
            <PackageSupport />
            
        </Fragment>
    )
}
