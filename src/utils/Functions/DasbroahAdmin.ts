function getSelectKeys(url: string, level :any) {
	let selectedKeys : string = "";
	let openKeys: string ="";
	if (url === "/admin") {
		selectedKeys ="1";
		openKeys ="";
		return {
			selectedKeys :selectedKeys,
			openKeys: openKeys,
		}
	} else if (url.includes("/admin/don-hang")) {
		openKeys = "sub1";
		if (url === "/admin/don-hang") {
			selectedKeys ="4";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/don-hang/don-hang-chua-xu-ly") {
			selectedKeys ="2";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/don-hang/don-hang-da-xu-ly") {
			selectedKeys ="3";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	} else if (url.includes("/admin/lien-he")) {
		openKeys = "sub2";
		if (url === "/admin/lien-he") {
			selectedKeys ="10";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/lien-he/lien-he-da-xu-ly") {
			selectedKeys ="8";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/lien-he/lien-he-chua-xu-ly") {
			selectedKeys ="9";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}  else if (url.includes("/admin/danh-muc")) {
		openKeys = "sub3";
		if (url === "/admin/danh-muc") {
			selectedKeys ="12";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/danh-muc/danh-muc-cap-1") {
			selectedKeys ="13";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/danh-muc/danh-muc-cap-2") {
			selectedKeys ="14";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/danh-muc/tao-moi-danh-muc") {
			if(level === "1") {
				selectedKeys ="15";
				return {
					selectedKeys :selectedKeys,
					openKeys: openKeys,
				}
			} else if(level==="2")  {
				selectedKeys ="16";
				return {
					selectedKeys :selectedKeys,
					openKeys: openKeys,
				}
			}
		}
	}  else if (url.includes("/admin/san-pham")) {
		openKeys = "sub4";
		if (url === "/admin/san-pham/toan-bo-san-pham") {
			selectedKeys ="21";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/san-pham/san-pham-da-an") {
			selectedKeys ="20";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/san-pham/tao-moi-san-pham") {
			selectedKeys ="22";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else if (url === "/admin/san-pham/san-pham-ban-chayc") {
			selectedKeys ="19";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}  else if (url.includes("/admin/layout")) {
		openKeys = "sub5";
		if (url === "/admin/layout/menu") {
			selectedKeys ="25";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/layout/footer") {
			selectedKeys ="26";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}  else if (url.includes("/admin/he-thong")) {
		openKeys = "sub6";
		if (url === "/admin/he-thong/trang-chu") {
			selectedKeys ="29";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/he-thong/gioi-thieu") {
			selectedKeys ="30";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}  else  if (url === "/admin/he-thong/tuyen-dung") {
			selectedKeys ="31";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}  else  if (url === "/admin/he-thong/lien-he") {
			selectedKeys ="32";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}  else if (url.includes("/admin/bai-viet")) {
		openKeys = "sub7";
		if (url === "/admin/bai-viet") {
			selectedKeys ="35";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/bai-viet/bai-viet-bi-an") {
			selectedKeys ="36";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}  else  if (url === "/admin/bai-viet/them-bai-viet") {
			selectedKeys ="37";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}  else if (url.includes("/admin/user")) {
		openKeys = "sub8";
		if (url === "/admin/user/list") {
			selectedKeys ="40";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		} else  if (url === "/admin/user/add") {
			selectedKeys ="41";
			return {
				selectedKeys :selectedKeys,
				openKeys: openKeys,
			}
		}
	}
}

export default { getSelectKeys };