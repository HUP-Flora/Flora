import React, { useState, useEffect } from "react";

import StatusBar from "../../components/common/StatusBar";
import ProductForm from "../../components/product/ProductForm";
import ProductAddBottomButtons from "../../components/product/ProductBottomButtons";

function ProductForms(props) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");

	const [isValidName, setIsValidName] = useState(true);
	const [isValidPrice, setIsValidPrice] = useState(true);
	const [isValidDescription, setIsValidDescription] = useState(true);

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
				isValidName={isValidName}
				isValidPrice={isValidPrice}
				isValidDescription={isValidDescription}
			/>
			<ProductAddBottomButtons
				type={type}
				name={name}
				price={price}
				description={description}
				isValidName={isValidName}
				isValidPrice={isValidPrice}
				isValidDescription={isValidDescription}
				setIsValidName={setIsValidName}
				setIsValidPrice={setIsValidPrice}
				setIsValidDescription={setIsValidDescription}
			/>
		</>
	);
}

export default ProductForms;
