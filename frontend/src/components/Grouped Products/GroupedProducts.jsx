import React, { useContext, useRef, useState } from "react";
import "./groupedProducts.scss";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import summaryApi from "../../../common";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import Context from "../../context";

function GroupedProducts({ group }) {
	// SCROLL FUNCTONALITY
	const [scroll, setScroll] = useState(0);
	const scrollElement = useRef();

	const scrollRight = () => {
		scrollElement.current.scrollLeft += 800;
	};
	const scrollLeft = () => {
		scrollElement.current.scrollLeft -= 800;
	};

	//ADD TO CART FUNCTIONALITY
	const quantity = 1;
	const { fetchCart } = useContext(Context);

	const addToCart = async (e, id) => {
		e.preventDefault();
		console.log(id);

		const payload = {
			productId: id,
			quantity: quantity,
		};

		try {
			const fetchApi = await fetch(summaryApi.addToCart.url, {
				method: summaryApi.addToCart.method,
				credentials: "include",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const response = await fetchApi.json();

			if (response.success) {
				toast.success(response.message);
				fetchCart();
			}
			if (response.error) {
				toast.error(response.message);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="groupedProducts">
			<h2> You might also like... </h2>
			{group?.length > 5 && (
				<>
					<div className="btns left" onClick={scrollLeft}>
						<FaChevronLeft />
					</div>
					<div className="btns right" onClick={scrollRight}>
						<FaChevronRight />
					</div>
				</>
			)}
			<div className="groupedProductsContainer" ref={scrollElement}>
				{group?.map((product) => {
					return (
						<div key={product?._id} className="products">
							<Link to={"/product/" + product?._id}>
								<img src={product?.productImage[0]} alt="" />
								<div className="details">
									<div className="top">
										<p className="productname">
											{product?.productName}
										</p>
										{/* <p className="description">{product?.brandName}</p> */}
									</div>
									<div className="bottom">
										<p>
											Kshs{" "}
											<span className="price">
												{product?.price}
											</span>
										</p>
									</div>
								</div>
							</Link>
							<button
								className="cart"
								onClick={(e) => addToCart(e, product._id)}
							>
								Add To Cart
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default GroupedProducts;
