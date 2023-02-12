export const priceComma = price => {
	if (price && isNaN(price)) {
		price = price?.replace(/\,/g, "");
	}

	return price.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
