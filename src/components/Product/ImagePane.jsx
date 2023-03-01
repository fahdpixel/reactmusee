import { Fragment, useState, useRef } from "react";
import ReactImageMagnify from "react-image-magnify";
import "./imagepane.css";

export const ImagePane = ({ productInfo }) => {
  // const [nav1, setNav1] = useState();
  // const [nav2, setNav2] = useState();
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
