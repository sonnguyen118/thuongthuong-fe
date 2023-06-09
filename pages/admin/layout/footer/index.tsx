import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {Tabs, Button, Input, notification } from "antd";
import type {TabsProps} from "antd";
import {StarFilled, DeleteOutlined } from "@ant-design/icons";
import {useRouter} from "next/router";
import {webInformation, webInformationClient} from "@service";
import {useSelector, useDispatch} from "react-redux";
import {setLoading} from "@slices/loadingState";


interface RootState {
	loading: {
		loading: boolean;
	};
}

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}

type LanguageKey = "VI" | "EN" | "FR" | "PO";
type NameState = {
	[key: string]: string | undefined;
};
type menuProps = {
	key: number;
	title: string;
	link: string;
}
const App: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();
	const [link, setLink] = useState("");
	const [parent, setParent] = useState("");
	const loading = useSelector((state: RootState) => state.loading.loading);
	const dispatch = useDispatch();
	const router = useRouter();
	const [data, setData] = useState();
	// liệt kê state sử dụng
	const [titleVI1, setTitleVi1] = useState("");
	const [titleEN1, setTitleEN1] = useState("");
	const [titleVI2, setTitleVi2] = useState("");
	const [titleEN2, setTitleEN2] = useState("");

	const [adress, setAddres] = useState("");
	const [hotLine, setHotLine] = useState("");
	const [email, setEmail] = useState("");


	const [linkSocical, setLinkSocical] = useState({
		facebook: "",
		tiktok: "",
		google: "",
		youtube: "",
		instagram: "",
		twiter: ""
	});
	// khai báo 2 state đại diện cho số lượng con của 3 blobk
	const [dataBlock1, setDataBlock1] = useState<menuProps[]>([
		{
			key: 1,
			title: "",
			link: "",
		}
	]);
	const [dataBlock2, setDataBlock2] = useState<menuProps[]>([
		{
			key: 1,
			title: "",
			link: "",
		}
	]);
	const [dataBlock1EN, setDataBlock1EN] = useState<menuProps[]>([
		{
			key: 1,
			title: "",
			link: "",
		}
	]);
	const [dataBlock2EN, setDataBlock2EN] = useState<menuProps[]>([
		{
			key: 1,
			title: "",
			link: "",
		}
	]);
	//Lấy dữ liệu ban đầu
	useEffect(()=> {
		dispatch(setLoading(true));
		try {
		webInformationClient.handleGetWebInformation("2")
			.then((res:any) => {
				// Xử lý kết quả thành công
				const datarex = JSON.parse(res.value);
				console.log(datarex, "data");
				if(datarex) {
					setTitleVi1(datarex.title1);
					setTitleVi2(datarex.title2);
					setAddres(datarex.adress);
					setHotLine(datarex.hotLine);
					setEmail(datarex.email);
					let memory1 = datarex.subMenu1.map((obj:any, index:any) => ({ ...obj, key: index + 1 }));
					let memory2 = datarex.subMenu2.map((obj:any, index:any) => ({ ...obj, key: index + 1 }));
					setDataBlock1(memory1);
					setDataBlock2(memory2);
					setLinkSocical(datarex.linkSocical);
				}
				console.log(datarex);
			})
			.catch((error) => {
				// Xử lý lỗi
				console.error(error);
			});
		webInformationClient.handleGetWebInformation("3")
			.then((res:any) => {
				// Xử lý kết quả thành công
				const datarex = JSON.parse(res.value);
				console.log(datarex, "data");
				if(datarex) {
					setTitleEN1(datarex.title1);
					setTitleEN2(datarex.title2);
					let memory1 = datarex.subMenu1.map((obj:any, index:any) => ({ ...obj, key: index + 1 }));
					let memory2 = datarex.subMenu2.map((obj:any, index:any) => ({ ...obj, key: index + 1 }));
					setDataBlock1EN(memory1);
					setDataBlock2EN(memory2);
				}
				console.log(datarex);
			})
			.catch((error) => {
				// Xử lý lỗi
				console.error(error);
			});
		} catch ( error) {
		}
		dispatch(setLoading(false));
	},[])
	// định nghia hàm thêm và xóa
	const handleAddMenu1 = () => {
		let datafromState = [...dataBlock1];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			title: "",
			link: "",
		});
		setDataBlock1(datafromState);
	};
	const handleAddMenu1EN  = () => {
		let datafromState = [...dataBlock1EN];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			title: "",
			link: "",
		});
		setDataBlock1EN(datafromState);
	};

	const handleAddMenu2 = () => {
		let datafromState = [...dataBlock2];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			title: "",
			link: "",
		});
		setDataBlock2(datafromState);
	};
	const handleAddMenu2EN = () => {
		let datafromState = [...dataBlock2EN];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			title: "",
			link: "",
		});
		setDataBlock2EN(datafromState);
	};

	const handleDeleteMenu1 = (key: number) => {
		let datafromState = dataBlock1.filter((item) => item.key !== key);
		setDataBlock1(datafromState);
	}
	const handleDeleteMenu2 = (key: number) => {
		let datafromState = dataBlock2EN.filter((item) => item.key !== key);
		setDataBlock2(datafromState);
	}
	const handleDeleteMenu1EN = (key: number) => {
		let datafromState = dataBlock1EN.filter((item) => item.key !== key);
		setDataBlock1EN(datafromState);
	}
	const handleDeleteMenu2EN = (key: number) => {
		let datafromState = dataBlock2EN.filter((item) => item.key !== key);
		setDataBlock2EN(datafromState);
	}
	// hàm thay đổi giá trị của các menu con
	const handleInputChange1 = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setDataBlock1((prevDataBlock1) => {
			const newDataBlock1:any = [...prevDataBlock1];
			newDataBlock1[index][field] = value;
			return newDataBlock1;
		});
	};
	const handleInputChange1EN = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setDataBlock1EN((prevDataBlock1) => {
			const newDataBlock1:any = [...prevDataBlock1];
			newDataBlock1[index][field] = value;
			return newDataBlock1;
		});
	};
	const handleInputChange2 = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setDataBlock2((prevDataBlock2) => {
			const newDataBlock2:any = [...prevDataBlock2];
			newDataBlock2[index][field] = value;
			return newDataBlock2;
		});
	};
	const handleInputChange2EN = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setDataBlock2EN((prevDataBlock2) => {
			const newDataBlock2:any = [...prevDataBlock2];
			newDataBlock2[index][field] = value;
			return newDataBlock2;
		});
	};
	const handleInputChangeSocial =
		(link: string) =>
			(event: React.ChangeEvent<HTMLInputElement>) => {
				setLinkSocical((prevName) => ({
					...prevName,
					[link]: event.target.value,
				}));
			};

	const [activeTab, setActiveTab] = useState("1");
	const onChange = (key: string) => {
		setActiveTab(key);
	};

	const navigationData: NavigationProps[] = [
		{
			id: 1,
			title: `Trang chủ`,
			link: "/admin",
		},
		{
			id: 2,
			title: `Layout`,
			link: "/admin/layout",
		},
		{
			id: 3,
			title: "Dữ liệu Footer",
			link: "",
		}
	];

	// hàm lọc title chuyển thành link

	const [item, setItem] = useState<TabsProps["items"]>([
		{
			key: "1",
			label: `Tiếng Việt`,
			children: (
				<></>
			),
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: (
				<></>
			),
		}
	]);


	const handleSubmit = () => {
		// lấy dữ liệu menu con block 1
		dispatch(setLoading(true));
		try {
			const dataVI = {
				title1: titleVI1,
				title2: titleVI2,
				subMenu1: dataBlock1,
				subMenu2: dataBlock2,
				adress: adress,
				hotLine: hotLine,
				email: email,
				linkSocical: linkSocical
			}
			const dataEN = {
				title1: titleEN1,
				title2: titleEN2,
				subMenu1: dataBlock1EN,
				subMenu2: dataBlock2EN,
				adress: adress,
				hotLine: hotLine,
				email: email,
				linkSocical: linkSocical
			}
			const body1 = {
				id: 2,
				key: "FOOTER_VI",
				value: JSON.stringify(dataVI),
				description: "dữ liệu chân trang - footer tiếng việt"
			}
			const body2 = {
				id:3,
				key: "FOOTER_EN",
				value: JSON.stringify(dataEN),
				description: "dữ liệu chân trang - footer tiếng anh"
			}
			const promises = [];
			if (dataVI) {
				const promiseVI = webInformation.handleUpdateWebInformation(body1);
				promises.push(promiseVI);
			}
			if (dataEN) {
				const promiseEN = webInformation.handleUpdateWebInformation(body2);
				promises.push(promiseEN);
			}

			Promise.all(promises)
				.then((results: any) => {
					if(results[0].meta.status !== 200) {
						notification.success({
							message: "Cập nhật dữ liệu thất bại",
							description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu tiếng việt",
							duration: 1.5,
							onClose: () => {
								dispatch(setLoading(false));
							},
						});
						return;
					}
					if(results[1].meta.status !== 200) {
						notification.success({
							message: "Cập nhật dữ liệu thất bại",
							description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu tiếng anh",
							duration: 1.5,
							onClose: () => {
								dispatch(setLoading(false));
							},
						});
						return;
					}
					notification.success({
						message: 'Cập nhật dữ liệu thành công',
						description: 'Bạn đã thành công cập nhật dữ liệu footer',
						duration: 1.5,
						onClose: () => {
							dispatch(setLoading(false));
							router.reload();
						},
					});

				})
				.catch((error) => {
					// Xử lý khi có lỗi xảy ra
				});
		} catch (error) {
			// Xử lý khi có lỗi xảy ra
		}
	}
	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Dữ liệu chân trang - Footer"}
					description={
						"Gồm 2 block dữ liệu có thể thêm mới nhiều, bảng thông tin đại chỉ điền sẵn, Link mạng xã hội & bản quyền copyright"
					}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<div className="admin__main-cards" style={{marginBottom: 15}}>
						<Tabs activeKey={activeTab} items={item} onChange={onChange}/>
						{activeTab === "2" ? (
							<>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Tiêu đề đầu block dữ liệu 1
								</label>

								<Input
									placeholder="Nhập và tiêu đề Block1 tiếng anh"
									size="large"
									onChange={(e) => setTitleEN1(e.target.value)}
									value={titleEN1}
								/>
								<div>
									<label className="admin__main-label">
										<StarFilled style={{marginRight: 5}}/>
										Tạo danh sách menu con
									</label>
									{dataBlock1EN.map((data: menuProps, index: number) => (
										<div className="admin__main-footer-group" key={data.key}>
											<Input
												placeholder="Nhập và tiêu đề menu con block1"
												size="large"
												className="admin__main-footer-group-item"
												value={data.title}
												onChange={(event) => handleInputChange1EN(event, index, "title")}
											/>
											<Input
												addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"}
												placeholder=""
												size="large"
												className="admin__main-footer-group-item"
												value={data.link}
												onChange={(event) => handleInputChange1EN(event, index, "link")}
											/>
											<Button type="default" onClick={(e) => handleDeleteMenu1EN(data.key)}><DeleteOutlined/></Button>
										</div>
									))}
									<div className="admin__main-footer-group-btn" onClick={(e) => handleAddMenu1EN()}>Thêm Menu</div>
								</div>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Tiêu đề đầu block dữ liệu 2
								</label>

								<Input
									placeholder="Nhập và tiêu đề Block2 tiếng anh"
									size="large"
									onChange={(e) => setTitleEN2(e.target.value)}
									value={titleEN2}
								/>
								<div>
									<label className="admin__main-label">
										<StarFilled style={{marginRight: 5}}/>
										Tạo danh sách menu con
									</label>
									{dataBlock2EN.map((data: menuProps, index: number) => (
										<div className="admin__main-footer-group" key={data.key}>
											<Input
												placeholder="Nhập và tiêu đề menu con block2"
												size="large"
												className="admin__main-footer-group-item"
												value={data.title}
												onChange={(event) => handleInputChange2EN(event, index, "title")}
											/>
											<Input
												addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"}
												placeholder=""
												size="large"
												className="admin__main-footer-group-item"
												value={data.link}
												onChange={(event) => handleInputChange2EN(event, index, "link")}
											/>
											<Button type="default" onClick={(e) => handleDeleteMenu2EN(data.key)}><DeleteOutlined/></Button>
										</div>
									))}
									<div className="admin__main-footer-group-btn" onClick={(e) => handleAddMenu2EN()}>Thêm Menu</div>
								</div>
							</>
						):(
							<>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Tiêu đề đầu block dữ liệu 1
								</label>

								<Input
									placeholder="Nhập và tiêu đề Block1 tiếng việt"
									size="large"
									onChange={(e) => setTitleVi1(e.target.value)}
									value={titleVI1}
								/>
								<div>
									<label className="admin__main-label">
										<StarFilled style={{marginRight: 5}}/>
										Tạo danh sách menu con
									</label>
									{dataBlock1.map((data: menuProps, index: number) => (
										<div className="admin__main-footer-group" key={data.key}>
											<Input
												placeholder="Nhập và tiêu đề menu con block1"
												size="large"
												id={`block1_title_VI${index}`}
												className="admin__main-footer-group-item"
												value={data.title}
												onChange={(event) => handleInputChange1(event, index, "title")}
											/>
											<Input
												addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"}
												placeholder=""
												size="large"
												id={`block1_link${index}`}
												className="admin__main-footer-group-item"
												value={data.link}
												onChange={(event) => handleInputChange1(event, index, "link")}
											/>
											<Button type="default" onClick={(e) => handleDeleteMenu1(data.key)}><DeleteOutlined/></Button>
										</div>
									))}
									<div className="admin__main-footer-group-btn" onClick={(e) => handleAddMenu1()}>Thêm Menu</div>
								</div>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Tiêu đề đầu block dữ liệu 2
								</label>

								<Input
									placeholder="Nhập và tiêu đề Block2 tiếng việt"
									size="large"
									onChange={(e) => setTitleVi2(e.target.value)}
									value={titleVI2}
								/>
								<div>
									<label className="admin__main-label">
										<StarFilled style={{marginRight: 5}}/>
										Tạo danh sách menu con
									</label>
									{dataBlock2.map((data: menuProps, index: number) => (
										<div className="admin__main-footer-group" key={data.key}>
											<Input
												placeholder="Nhập và tiêu đề menu con block2"
												size="large"
												id={`block2_title_VI${index}`}
												className="admin__main-footer-group-item"
												value={data.title}
												onChange={(event) => handleInputChange2(event, index, "title")}
											/>
											<Input
												addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"}
												placeholder=""
												size="large"
												id={`block2_link${index}`}
												className="admin__main-footer-group-item"
												value={data.link}
												onChange={(event) => handleInputChange2(event, index, "link")}
											/>
											<Button type="default" onClick={(e) => handleDeleteMenu2(data.key)}><DeleteOutlined/></Button>
										</div>
									))}
									<div className="admin__main-footer-group-btn" onClick={(e) => handleAddMenu2()}>Thêm Menu</div>
								</div>
							</>
						)}
					</div>
					<div className="admin__main-cards" style={{marginBottom: 15}}>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Thêm thông tin cho block Liên hệ
						</label>
						<Input
							addonBefore={"Địa chỉ"}
							placeholder="Nhập vào Địa chỉ của công ty"
							size="large"
							onChange={(e)=> setAddres(e.target.value)}
							value={adress}
							style={{marginBottom: 15}}
						/>
						<Input
							addonBefore={"Hotline"}
							placeholder="Nhập vào Hotline của công ty"
							size="large"
							onChange={(e)=> setHotLine(e.target.value)}
							value={hotLine}
							style={{marginBottom: 15}}
						/>
						<Input
							addonBefore={"Email"}
							placeholder="Nhập vào Email của công ty"
							size="large"
							onChange={(e)=> setEmail(e.target.value)}
							value={email}
							style={{marginBottom: 15}}
						/>
					</div>
					<div className="admin__main-cards">
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Đường dẫn mạng xã hội (lưu ý chỉ điền thì icon mới xuất hiện)
						</label>
						<div className="admin__main-footer-group" style={{flexWrap: "wrap", paddingBottom: 30}}>
							<Input
								addonBefore={"Link Facebook"}
								placeholder="Nhập vào Link Facebook của công ty"
								size="large"
								onChange={handleInputChangeSocial("facebook")}
								value={linkSocical.facebook}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Link Youtube"}
								placeholder="Nhập vào Link Youtube của công ty"
								size="large"
								onChange={handleInputChangeSocial("youtube")}
								value={linkSocical.youtube}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Link TikTok"}
								placeholder="Nhập vào Link TikTok của công ty"
								size="large"
								onChange={handleInputChangeSocial("tiktok")}
								value={linkSocical.tiktok}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Link Instagram"}
								placeholder="Nhập vào Link Instagram của công ty"
								size="large"
								onChange={handleInputChangeSocial("instagram")}
								value={linkSocical.instagram}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Link Google"}
								placeholder="Nhập vào Link Google của công ty"
								size="large"
								onChange={handleInputChangeSocial("google")}
								value={linkSocical.google}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Link Twiter"}
								placeholder="Nhập vào Link Twiter của công ty"
								size="large"
								onChange={handleInputChangeSocial("twiter")}
								value={linkSocical.twiter}
								style={{marginBottom: 15}}
								className="admin__main-footer-group-item"
							/>
						</div>
					</div>
					<div className="admin__main-save-products">
						<Button
							size="large"
							type="default"
							className="admin__main-save-products-btn"
						>
							Hủy bỏ
						</Button>
						<Button
							type="primary"
							size="large"
							style={{marginLeft: 10}}
							className="admin__main-save-products-btn-2"
							onClick={handleSubmit}
						>
							Cập nhật dữ liệu
						</Button>
					</div>
				</div>

			</div>
		</Dashboard>
	);
};

export default App;
