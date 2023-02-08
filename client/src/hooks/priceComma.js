export const priceComma = price => {
	const intPrice = price.replace(/\,/g, "");
	return intPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
