function formatDateTime(inputDateTime: string | null | undefined): string {
	if (inputDateTime === null || inputDateTime === undefined) {
	  return "";
	}
  
	const dateObj = new Date(inputDateTime);
  
	// Lấy tên của ngày trong tuần
	const weekday: string[] = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
	const dayOfWeek: string = weekday[dateObj.getDay()];
  
	// Lấy ngày, tháng và năm
	const day: number = dateObj.getDate();
	const month: number = dateObj.getMonth() + 1; // Vì tháng được đếm từ 0, nên cần cộng thêm 1
	const year: number = dateObj.getFullYear();
  
	// Định dạng lại ngày tháng
	const formattedDate: string = `${dayOfWeek}, ngày ${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;
  
	return formattedDate;
  }

function formatExacthlyTime(inputDateTime: string | null | undefined): string {
	if (inputDateTime === null || inputDateTime === undefined) {
	  return "";
	}
  
	const dateObj = new Date(inputDateTime);
  
	// Lấy tên của ngày trong tuần
	const weekday: string[] = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
	const dayOfWeek: string = weekday[dateObj.getDay()];
  
	// Lấy ngày, tháng và năm
	const day: number = dateObj.getDate();
	const month: number = dateObj.getMonth() + 1; // Vì tháng được đếm từ 0, nên cần cộng thêm 1
	const year: number = dateObj.getFullYear();
  
	// Lấy giờ và phút
	const hours: number = dateObj.getHours();
	const minutes: number = dateObj.getMinutes();
  
	// Định dạng lại ngày tháng, giờ và phút
	const formattedDate: string = `${dayOfWeek}, ngày ${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}, ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  
	return formattedDate;
  }

export default { formatDateTime, formatExacthlyTime };
