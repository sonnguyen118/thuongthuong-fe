import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import { Button, Input, notification, Tabs, TabsProps, Upload, Switch } from "antd";
import { StarFilled, UploadOutlined } from "@ant-design/icons";
import {useRouter} from "next/router";
import { useDispatch} from "react-redux";
import {setLoading} from "@slices/loadingState";
import { handleProducts, webInformation, webInformationClient } from "@service";
import { UploadFile, UploadProps } from "antd/es/upload/interface";
import { HandleString } from "@utils/Functions";

const {TextArea} = Input;

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}

const App: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
// khai báo state
	const [map, setMap] = useState("");
	const [phone, setPhone]= useState("");
	const [hotline, setHotline]= useState("");
	const [email, setEmail]= useState("");
	const [adress1, setAdress1]= useState("");
	const [adress2, setAdress2]= useState("");
	const [activeTab, setActiveTab] = useState("1");

	const [contentVI, setContentVI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [contentEN, setContentEN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	// thêm icon gạch chân và tiêu đề
	const [fileListIcon, setFileListIcon] = useState<UploadFile[]>([]);
	const [iconBlock, setIconBlock] = useState([]);
	const [titleBlockVI, setTitleBlockVI] = useState("");
	const [titleBlockEN, setTitleBlockEN] = useState("");
	const [uderlineBlock, setUnderlineBlock] = useState(true);
	useEffect(()=> {
		const mappedData: UploadFile[] = iconBlock.map((urlImage : string) => ({
			uid: "",
			lastModified: 0,
			lastModifiedDate: undefined,
			name: HandleString.removeUploadPath(urlImage),
			size: 0,
			type: "image/jpeg",
			percent: 100,
			originFileObj: undefined,
			status: "done",
			response: urlImage,
			thumbUrl: process.env.NEXT_PUBLIC_API_URL + "/" + urlImage,
		}));
		setFileListIcon(mappedData);
	},[iconBlock]);
	const onChangeIcon: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileListIcon(newFileList);
	};
	const customRequest = async (options:any) => {
		const { file, onSuccess, onError } = options;
		try {
			const response: any = await handleProducts.handleUploadImageProducts(file);
			const { data } = response;
			onSuccess(data.path);
		} catch (error) {
			onError(error);
		}
	};
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: `Tiếng Việt`,
			children: (
				<>
				</>
			),
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: (
				<>
				</>
			),
		}
	];
	const handleChangeContentVI = (event:any, key:any) => {
		const { value } = event.target;
		setContentVI((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	const handleChangeContentEN = (event:any, key:any) => {
		const { value } = event.target;
		setContentEN((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	// lấy dữ liệu danh mục
	useEffect(() => {
		dispatch(setLoading(true));
		// thao tác 3 lần get lấy dữ liệu
		const promises = [];

		const promiseVI = webInformationClient.handleGetWebInformation("12")
		promises.push(promiseVI);

		const promiseEN = webInformationClient.handleGetWebInformation("13")
		promises.push(promiseEN);

		Promise.all(promises)
			.then((results: any) => {
				console.log(results, "results");
				if(results[0]) {
					const data = JSON.parse(results[0].value);
					setMap(data.map);
					setPhone(data.phone);
					setHotline(data.hotline);
					setEmail(data.email);
					setAdress1(data.adress1);
					setAdress2(data.adress2);
					setContentVI(data.content);
					setIconBlock(data.iconBlock);
					setUnderlineBlock(data.underlineBlock);
					setTitleBlockVI(data.titleBlock);
				}
				if(results[1]) {
					const data = JSON.parse(results[1].value)
					setContentEN(data.content);
					setTitleBlockEN(data.titleBlock);
				}
				dispatch(setLoading(false));

			})
			.catch((error) => {
				// Xử lý khi có lỗi xảy ra
				notification.success({
					message: "Cập nhật dữ liệu thất bại",
					description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu tiếng việt",
					duration: 1.5,
					onClose: () => {
						dispatch(setLoading(false));
					},
				});
			});
	}, [])

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
			title: `Sản phẩm`,
			link: "/admin/san-pham",
		},
		{
			id: 3,
			title: "Tạo mới sản phẩm",
			link: "/",
		},
	];
	const onChangeTextarea = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(e);
	};

	const handleSubmit = () => {
		dispatch(setLoading(true));
		const newArrayIcon = fileListIcon.map(obj => obj.response);
		let dataVI = {
			map: map,
			phone: phone,
			hotline: hotline,
			email: email,
			adress1: adress1,
			adress2: adress2,
			content: contentVI,
			iconBlock: newArrayIcon,
			titleBlock: titleBlockVI,
      		underlineBlock: uderlineBlock,

		};
		let dataEN = {
			map: map,
			phone: phone,
			hotline: hotline,
			email: email,
			adress1: adress1,
			adress2: adress2,
			content: contentEN,
			iconBlock: newArrayIcon,
			titleBlock: titleBlockEN,
      		underlineBlock: uderlineBlock,
		}
		const body1 = {
			id: 12,
			key: "LIENHE_VI",
			value: JSON.stringify(dataVI),
			description: "dữ liệu trang lien he - tiếng việt"
		}
		const body2 = {
			id:13,
			key: "LIENHE_EN",
			value: JSON.stringify(dataEN),
			description: "dữ liệu trang lien he - tiếng anh"
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

	}

	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Dữ liệu Trang Liên Hệ"}
					description={"Thay đổi thông tin tin liên hệ của công ty"}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<div style={{display: "flex", marginBottom: 20}}>
						<Upload customRequest={customRequest} fileList={fileListIcon} onChange={onChangeIcon}>
							<Button icon={<UploadOutlined/>}>Tải ảnh icon</Button>
						</Upload>
						<Switch checkedChildren="Hiện gạch chân tiêu đề "
										unCheckedChildren="Ẩn gạch chân tiêu đề"
										checked={uderlineBlock}
										onChange={(checked:any) => setUnderlineBlock(checked)}
										style={{marginLeft: 25}}/>
					</div>

					<Tabs activeKey={activeTab} items={items} onChange={onChange}/>
					{activeTab === "1" ? (
						<Input
							placeholder="Nhập và tên danh danh mục tiếng việt"
							size="large"
							onChange={(e) => setTitleBlockVI(e.target.value)}
							value={titleBlockVI}
						/>
					): (
						<Input
							placeholder="Nhập và tên danh danh mục tiếng anh"
							size="large"
							onChange={(e) => setTitleBlockEN(e.target.value)}
							value={titleBlockEN}
						/>
					)}
					<div
						className="admin__main-cards"
						style={{marginBottom: 20, marginTop: 20}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Nhúng  bản đồ
						</label>
						<TextArea
							showCount
							maxLength={700}
							style={{height: 80, marginBottom: 24}}
							placeholder="Nhúng đường dẫn bản đồ vào đây"
							onChange={(e) => setMap(e.target.value)}
							value={map}
						/>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Nội dung
						</label>
							<Input
								addonBefore={"Điện thoại"}
								placeholder="Nhập vào Số điện thoại của công ty"
								size="large"
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
								style={{marginBottom: 15, width: "100%"}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Hotline"}
								placeholder="Nhập vào Hotline của công ty"
								size="large"
								onChange={(e) => setHotline(e.target.value)}
								value={hotline}
								style={{marginBottom: 15, width: "100%"}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Email"}
								placeholder="Nhập vào Email của công ty"
								size="large"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								style={{marginBottom: 15, width: "100%"}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Địa chỉ 1"}
								placeholder="Nhập vào Địa chỉ của công ty"
								size="large"
								onChange={(e) => setAdress1(e.target.value)}
								value={adress1}
								style={{marginBottom: 15, width: "100%"}}
								className="admin__main-footer-group-item"
							/>
							<Input
								addonBefore={"Địa chỉ 2"}
								placeholder="Nhập vào Địa chỉ của công ty"
								size="large"
								onChange={(e) => setAdress2(e.target.value)}
								value={adress2}
								style={{marginBottom: 15, width: "100%"}}
								className="admin__main-footer-group-item"
							/>
							<label className="admin__main-label">
								Mô tả
							</label>
						<Tabs activeKey={activeTab} items={items} onChange={onChange}/>
						{activeTab === "1"?(
							<>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentVI(e, "content1")}
									value={contentVI.content1}
									placeholder="Nhập mô tả ngắn"
								/>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentVI(e, "content2")}
									value={contentVI.content2}
									placeholder="Nhập mô tả ngắn"
								/>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentVI(e, "content3")}
									value={contentVI.content3}
									placeholder="Nhập mô tả ngắn"
								/>
							</>
						):(
							<>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentEN(e, "content1")}
									value={contentEN.content1}
									placeholder="Nhập mô tả ngắn"
								/>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentEN(e, "content2")}
									value={contentEN.content2}
									placeholder="Nhập mô tả ngắn"
								/>
								<TextArea
									showCount
									maxLength={600}
									style={{height: 120, marginBottom: 24}}
									onChange={(e) => handleChangeContentEN(e, "content3")}
									value={contentEN.content3}
									placeholder="Nhập mô tả ngắn"
								/>
							</>
						)}

					</div>

					<div
						className="admin__main-cards"
						style={{marginBottom: "60px"}}
					>
						<div className="admin__main-cards-title">Tối ưu SEO</div>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Title SEO
						</label>
						<TextArea
							showCount
							maxLength={60}
							style={{height: 40, marginBottom: 12}}
							onChange={onChangeTextarea}
							placeholder="Title SEO"
						/>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Description SEO
						</label>
						<TextArea
							showCount
							maxLength={150}
							style={{height: 80, marginBottom: 12}}
							onChange={onChangeTextarea}
							placeholder="Description SEO"
						/>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Keywords SEO
						</label>
						<TextArea
							showCount
							maxLength={120}
							style={{height: 60, marginBottom: 12}}
							onChange={onChangeTextarea}
							placeholder="Keywords SEO"
						/>
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
