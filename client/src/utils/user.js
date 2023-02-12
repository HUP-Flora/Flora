export const userType = () => {
	const userData = JSON.parse(localStorage.getItem("recoil-persist"));
	if (!userData) return null;

	const userType_B = userData.userTypeState;
	if (userType_B === "STORE") {
		return "사장";
	} else if (userType_B === "CUSTOMER") {
		return "손님";
	}
	return null;
};
