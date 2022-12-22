import React, { Fragment } from 'react'
import Slider from 'react-slick';

export const CollectionRecommend = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        slidesToShow: 5,
        dots: true,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        }, ],
    }
    return (
        <Fragment>
            <section className="new-arrivals">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-between">
                            <div className="common-heads">
                                <h2>Our Recommendations</h2>
                            </div>
                            <div className="next-jump">
                                <a href=""> Browse All <img src="assets/images/nxt.png" /></a>
                            </div>
                        </div>

                        <Slider className="arrivals-slider" {...settings}>   

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-1.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5><span>₹14,999</span>₹24,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-2.jpg" />
                                    <div className="ofr-prc">
                                        <h5>15%<span>Off</span></h5>
                                    </div>
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5>₹24,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-3.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5>₹24,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-4.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5>₹24,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-5.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5>₹24,296</h5>
                                </div>
                            </div>

                            <div className="arrival-product">
                                <div className="prdt-img">
                                    <img src="assets/images/deals/deal-1.jpg" />
                                </div>
                                <div className="ratings d-flex justify-content-between">
                                    <div className="prdt-type">
                                        Ukuleles
                                    </div>
                                    <div className="prdt-ratngs">
                                        <img src="assets/images/star.png" />4.9
                                    </div>
                                </div>
                                <div className="prdt-nameprc">
                                    <h4>Juarez 53.34 cm (21") Soprano Ukulele Kit</h4>
                                    <h5>₹24,296</h5>
                                </div>
                            </div>

                        </Slider>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
