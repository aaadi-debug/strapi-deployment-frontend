import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onChange = (e) => {
        setQuery(e.target.value);
    };

    let { data } = useFetch(
        `/api/products?populate=*&filters[title][$contains]=${query}`
    );

    if (!query.length) {
        data = null;
    }

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
        <div className="search-modal">
            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products"
                    value={query}
                    onChange={onChange}
                />
                <MdClose
                    className="close-btn"
                    onClick={() => setSearchModal(false)}
                />
            </div>
            <div className="search-result-content">
                {!data?.data?.length && (
                    <div className="start-msg">
                        Start typing to see products you are looking for.
                    </div>
                )}
                <div className="search-results">
                    {data?.data?.map((item) => (
                        <div
                            className="search-result-item"
                            key={item.id}
                            onClick={() => {
                                navigate("/product/" + item.id);
                                setSearchModal(false);
                            }}
                        >
                            <div className="image-container">
                                {/* <img
                                    src={
                                        process.env.REACT_APP_STRIPE_APP_DEV_URL +
                                        item.attributes.image.data[0].attributes.url
                                    }
                                /> */}
                                {/* Use imageUrl only if it's defined */}
                                {imageUrl && <img src={imageUrl} alt={item.attributes.title} />}
                            </div>
                            <div className="prod-details">
                                <span className="name">
                                    {item.attributes.title}
                                </span>
                                <span className="desc">
                                    {item.attributes.description}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
