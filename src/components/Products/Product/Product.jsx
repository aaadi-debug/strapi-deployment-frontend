import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
    console.log("Product Data:", data);
    const navigate = useNavigate();

    // Perform null/undefined checks
    const imageUrl =
        data && 
        data.img && 
        data.img.data &&
        data.img.data.length > 0 && 
        data.img.data[0].attributes
            ? process.env.REACT_APP_STRIPE_APP_DEV_URL +
              data.img.data[0].attributes.url
            : null;

        console.log("imageUrl:", imageUrl);

    return (
        <div className="product-card" onClick={() => navigate("/product/" + id)}>
            <div className="thumbnail">
                {/* Use imageUrl only if it's defined */}
                {imageUrl && <img src={imageUrl} alt={data.title} />}
            </div>
            <div className="prod-details">
                <span className="name">{data.title}</span>
                <span className="price">&#8377;{data.price}</span>
            </div>
        </div>
    );
};

export default Product;
