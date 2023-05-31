function getAccessTokenFromCookie(): string {
	// Lấy tất cả các cookie hiện tại
	const cookies = document.cookie.split(';');

	// Tìm và trích xuất giá trị của accessToken từ cookie
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		// Kiểm tra xem cookie có bắt đầu bằng 'accessToken=' hay không
		if (cookie.startsWith('accessToken=')) {
			// Trích xuất giá trị accessToken từ cookie
			const accessToken = cookie.substring('accessToken='.length);

			// Trả về giá trị accessToken
			return accessToken;
		}
	}

	// Nếu không tìm thấy accessToken trong cookie, trả về rỗng ""
	return "";
}

export default { getAccessTokenFromCookie };