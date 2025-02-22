import { useNavigate } from "react-router-dom"
import { compile } from 'path-to-regexp';
import { Button, CardActionArea, Chip } from "@mui/material";
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import { SiYoutubemusic } from "react-icons/si";
function CardComponent({ settings }) {
    const { data, index, className } = settings
    const navigate = useNavigate()
    const showProduct = (url) => {
        const toProductPath = compile('/product/:product_url/');
        navigate(
            toProductPath({ product_url: url })
        )
    }
    return (
        <div className={`custom-card bg-light border shadow-sm rounded-2 ${className && className}`} key={index} onClick={() => showProduct(data.product_url)}>
            <CardActionArea>
                {data?.has_video_shopping == 'yes' && <div title="Virtual Shopping" className="text-primary position-absolute top-0 end-0 m-3" style={{ zIndex:1 }}>
                    <SiYoutubemusic size={30}  />
                </div>}
                <div className="prdt-img">
                    <div className="text-center">
                        <LazyLoadComponent>
                            <LazyLoadImage effect="blur" src={data.image} style={{ opacity: data.stock_status == "out_of_stock" ? .7 : 1 }} className="product-card-image" />
                        </LazyLoadComponent>
                    </div>
                    {
                        data.badge == true &&
                        <div className="ofr-prc">
                            <h5>#{index + 1}</h5>
                        </div>
                    }
                </div>
                <div className="trend-access bg-light">
                    <div className="ratings">
                        <div className="prdt-type text-start">
                            {data.category_name}
                        </div>
                        {data.stock_status == "out_of_stock" && <Chip size="small" className="bg-danger position-absolute top-0 start-0 m-3" label="out of stock" color="error" />}
                    </div>
                    <div className="prdt-nameprc">
                        <h4>{data.product_name}</h4>
                        <h5 className="text-end"> 
                            <del className="strike-rate">{data.sale_prices.strike_rate && data.sale_prices.strike_rate_original > 0 && `₹${data.sale_prices.strike_rate}`}</del>
                            <div   className={`${data.sale_prices.strike_rate == '0.00' ? "margin-price-top" : ''} text-primary fw-bold`}>₹{data.sale_prices.price}</div>
                        </h5>
                    </div>
                </div>
            </CardActionArea>
        </div>
    )
}

export default CardComponent