import React, { useState, useEffect } from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";

function ProductForms(props) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");

	const [nameValidMessage, setNameValidMessage] = useState(true);
	const [priceValidMessage, setPriceValidMessage] = useState(true);
	const [descriptionValidMessage, setDescriptionValidMessage] = useState(true);

	// 더미 데이터
	const type = "add";
	// const type = "edit";

	useEffect(() => {
		if (type === "edit") {
			// (백) request
			const product = {
				name: "상품명",
				price: 10000,
				description:
					"lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incidid",
			};

			setName(product.name);
			setPrice(product.price);
			setDescription(product.description);
		}
	}, []);

	return (
		<>
			<StatusBar text={type === "add" ? "상품 등록" : "상품 수정"} />
			<ProductForm
				name={name}
				setName={setName}
				price={price}
				setPrice={setPrice}
				description={description}
				setDescription={setDescription}
				nameValidMessage={nameValidMessage}
				priceValidMessage={priceValidMessage}
				descriptionValidMessage={descriptionValidMessage}
			/>
			<ProductAddBottomButtons
				type={type}
				name={name}
				price={price}
				description={description}
				setNameValidMessage={setNameValidMessage}
				setPriceValidMessage={setPriceValidMessage}
				setDescriptionValidMessage={setDescriptionValidMessage}
			/>
		</>
	);
}

export default ProductForms;
