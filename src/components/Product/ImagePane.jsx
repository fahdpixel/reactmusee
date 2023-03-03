import { Fragment, useState, useRef, React } from "react";
import ReactImageMagnify from "react-image-magnify";
import Slider from "react-slick";
import "./imagepane.css";
import valueicon1 from "../../assets/images/det-1.jpg";
import valueicon2 from "../../assets/images/det-2.jpg";
import valueicon3 from "../../assets/images/det-3.jpg";

export const ImagePane = ({ productInfo }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const imgRef = useRef([]);
  imgRef.current = [];
  const addRefs = (el) => {
    if (el && !imgRef.current.includes(el)) {
      imgRef.current.push(el);
    }
  };
  const sampleImgSrc = [
    "/assets/images/no_img_category_sm.jpg",
  ];
  const imgSrc = productInfo.gallery || sampleImgSrc;
  const [img, setImg] = useState(imgSrc[0]);
  // const settings = {
  //   customPaging: function (i) {
  //     return (
  //       <a>
  //         <img src="/assets/images/product-view-1.jpg" />
  //       </a>
  //     );
  //   },
  //   dots: true,
  //   dotsClass: "slick-dots slick-thumb",
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };
  const imgClickHandler = (image, i) => {
    setImg(image);
    imgRef.current[i].classList.add("details-images-container-active");
    for (let j = 0; j < image.length; j++) {
      if (i !== j) {
        imgRef.current[j].classList.remove("details-images-container-active");
      }
    }
  }; 
  return (
    <Fragment>
      <div className="col-lg-6 pb-5">
      <h4>dsflknldfsmnlkndfskln</h4> 
      <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}> 
        <div className="main-boxer">
        <img src={valueicon1} alt="call" className="img-fluid" />
        </div>
        <div className="main-boxer">
        <img src={valueicon2} alt="call" className="img-fluid" />
        </div>
        <div className="main-boxer">
        <img src={valueicon3} alt="call" className="img-fluid" />
        </div>
        <div className="main-boxer">
        <img src={valueicon1} alt="call" className="img-fluid" />
        </div>
        <div className="main-boxer">
        <img src={valueicon2} alt="call" className="img-fluid" />
        </div>
        <div className="main-boxer">
        <img src={valueicon3} alt="call" className="img-fluid" />
        </div> 
      </Slider> 
      <Slider
        asNavFor={nav1}
        ref={(slider2) => setNav2(slider2)}
        slidesToShow={3}
        swipeToSlide={true}
        focusOnSelect={true} 
      >
        <div className="thumb-boxer">
        <img src={valueicon1} alt="call" className="img-fluid" />
        </div>
        <div className="thumb-boxer">
        <img src={valueicon2} alt="call" className="img-fluid" />
        </div>
        <div className="thumb-boxer">
        <img src={valueicon3} alt="call" className="img-fluid" />
        </div>
        <div className="thumb-boxer">
        <img src={valueicon1} alt="call" className="img-fluid" />
        </div>
        <div className="thumb-boxer">
        <img src={valueicon2} alt="call" className="img-fluid" />
        </div>
        <div className="thumb-boxer">
        <img src={valueicon3} alt="call" className="img-fluid" />
        </div>
      </Slider>
      </div>
      <div className="col-lg-6">

      </div>  
      <div className="col-lg-6">
        <div className="details-img-section">
          <div className="mag-nfyre" style={{ width: "100%", height: "100%", minHeight: "500px", backgroundColor: "#fff", display:"flex", textAlign: "center", alignItems: "center" }}>
            <ReactImageMagnify
              imageClassName="imgStyles"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: img,
                },
                largeImage: {
                  src: img,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className="details-images-container">
            {imgSrc.map((image, i) => (
              <img key={i}
                onClick={() => imgClickHandler(image, i)}
                src={image}
                alt="details-pic"
                className={i === 0 ? "details-images-container-active" : ""}
                ref={addRefs}
              />
            ))}
          </div>
        </div>
        <div
          className={`offer-value ${
            productInfo.sale_prices.overall_discount_percentage > 0
              ? ""
              : "hide"
          }`}
        >
          <h4>
            {productInfo.sale_prices.overall_discount_percentage}%
            <span>Off</span>
          </h4>
        </div>
      </div>
    </Fragment>
  );
};
