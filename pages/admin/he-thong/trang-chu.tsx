import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import { Tabs, Button, Input, Switch, Upload, Select, InputNumber, notification } from "antd";
import type {TabsProps} from "antd";
import {StarFilled, UploadOutlined, DeleteOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import { handleCategoryClient, webInformation, webInformationClient } from "@service";
import {useDispatch} from "react-redux";
import {setLoading} from "@slices/loadingState";
import {HandleString} from "@utils/Functions";
import {handleProducts} from "@service";

const {TextArea} = Input;

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}

type bodyCategoryGetAdmin = {
	language: string;
};
type LanguageKey = "VI" | "EN" | "FR" | "PO";

const App: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [activeTab, setActiveTab] = useState("1");
	const [dataCategory, setDataCategory] = useState([]);
	const [options, setOptions] = useState([]);

	const [fileList1, setFileList1] = useState<UploadFile[]>([]);
	const [fileList2, setFileList2] = useState<UploadFile[]>([]);
	const [fileList3, setFileList3] = useState<UploadFile[]>([]);
	const [fileList5, setFileList5] = useState<UploadFile[]>([]);

	const [fileListIcon2, setFileListIcon2] = useState<UploadFile[]>([]);
	const [fileListIcon3, setFileListIcon3] = useState<UploadFile[]>([]);
	const [fileListIcon5, setFileListIcon5] = useState<UploadFile[]>([]);
	// khai báo state dữ liệu
	const [listSliderBlock1, setListSliderBlock1] = useState([]);
	const [showBlock1, setShowBlock1] = useState(true);

	const [iconBlock2, setIconBlock2] = useState([]);
	console.log(fileListIcon2,"iconBlock2")
	const [uderlineBlock2, setUnderlineBlock2] = useState(true);
	const [titleBlock2VI, setTitleBlock2VI] = useState("");
	const [titleBlock2EN, setTitleBlock2EN] = useState("");
	const [listSliderBlock2, setListSliderBlock2] = useState([]);
	const [contentBlock2VI, setContentBlock2VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [contentBlock2EN, setContentBlock2EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [showBlock2, setShowBlock2] = useState(true);

	const [listSliderBlock3, setListSliderBlock3] = useState([]);
	const [iconBlock3, setIconBlock3] = useState([]);
	const [uderlineBlock3, setUnderlineBlock3] = useState(true);
	const [titleBlock3VI, setTitleBlock3VI] = useState("");
	const [titleBlock3EN, setTitleBlock3EN] = useState("");
	const [showBlock3, setShowBlock3] = useState(true);

	const [dataBlock4, setDataBlock4] = useState([]);

	const [listSliderBlock5, setListSliderBlock5] = useState([]);
	const [iconBlock5, setIconBlock5] = useState([]);
	const [uderlineBlock5, setUnderlineBlock5] = useState(true);
	const [titleBlock5VI, setTitleBlock5VI] = useState("");
	const [titleBlock5EN, setTitleBlock5EN] = useState("");
	const [showBlock5, setShowBlock5] = useState(true);

	const [dataProduct, setDataProducts] = useState([
		{
			key: 0,
			number: 8,
			value: 1,}
	]);

	useEffect(()=> {
		if(listSliderBlock1.length > 0) {
			const mappedData: UploadFile[] = listSliderBlock1.map((urlImage: string) => ({
				uid: "",
				lastModified: 0,
				lastModifiedDate: undefined,
				name: "",
				size: 0,
				type: "image/jpeg",
				percent: 100,
				originFileObj: undefined,
				status: "done",
				response: urlImage,
				thumbUrl: process.env.NEXT_PUBLIC_API_URL + "/" + urlImage,
			}));
			setFileList1(mappedData);
		}
	},[listSliderBlock1]);
	useEffect(()=> {
		const mappedData: UploadFile[] = listSliderBlock2.map((urlImage : string) => ({
			uid: "",
			lastModified: 0,
			lastModifiedDate: undefined,
			name: "",
			size: 0,
			type: "image/jpeg",
			percent: 100,
			originFileObj: undefined,
			status: "done",
			response: urlImage,
			thumbUrl: process.env.NEXT_PUBLIC_API_URL + "/" + urlImage,
		}));
		setFileList2(mappedData);
	},[listSliderBlock1]);
	useEffect(()=> {
		const mappedData: UploadFile[] = listSliderBlock3.map((urlImage : string) => ({
			uid: "",
			lastModified: 0,
			lastModifiedDate: undefined,
			name: "",
			size: 0,
			type: "image/jpeg",
			percent: 100,
			originFileObj: undefined,
			status: "done",
			response: urlImage,
			thumbUrl: process.env.NEXT_PUBLIC_API_URL + "/" + urlImage,
		}));
		setFileList3(mappedData);
	},[listSliderBlock3]);
	useEffect(()=> {
		const mappedData: UploadFile[] = listSliderBlock5.map((urlImage : string) => ({
			uid: "",
			lastModified: 0,
			lastModifiedDate: undefined,
			name: "",
			size: 0,
			type: "image/jpeg",
			percent: 100,
			originFileObj: undefined,
			status: "done",
			response: urlImage,
			thumbUrl: process.env.NEXT_PUBLIC_API_URL + "/" + urlImage,
		}));
		setFileList5(mappedData);
	},[listSliderBlock5]);
	useEffect(()=> {
		const mappedData: UploadFile[] = iconBlock2.map((urlImage : string) => ({
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
		setFileListIcon2(mappedData);
	},[iconBlock2]);
	useEffect(()=> {
		const mappedData: UploadFile[] = iconBlock3.map((urlImage : string) => ({
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
		setFileListIcon3(mappedData);
	},[iconBlock3]);
	useEffect(()=> {
		const mappedData: UploadFile[] = iconBlock5.map((urlImage : string) => ({
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
		setFileListIcon5(mappedData);
	},[iconBlock5]);
	const onChangeImage1: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileList1(newFileList);
	};
	const onChangeIcon2: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileListIcon2(newFileList);
	};
	const onChangeImage2: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileList2(newFileList);
	};
	const onChangeImage3: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileList3(newFileList);
	};
	const onChangeIcon3: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileListIcon3(newFileList);
	};
	const onChangeImage5: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileList5(newFileList);
	};
	const onChangeIcon5: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
		setFileListIcon5(newFileList);
	};
	console.log(fileListIcon2, "icon2")
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
	const customRequestIcon2 = async (options:any) => {
		const { file, onSuccess, onError } = options;
		try {
			const response: any = await handleProducts.handleUploadImageProducts(file);
			const { data } = response;
			// setIconBlock2(data.path);
			onSuccess(data.path);
		} catch (error) {
			onError(error);
		}
	};
	const customRequestIcon3 = async (options:any) => {
		const { file, onSuccess, onError } = options;
		try {
			const response: any = await handleProducts.handleUploadImageProducts(file);
			const { data } = response;
			// setIconBlock3(data.path);
			onSuccess(data.path);
		} catch (error) {
			onError(error);
		}
	};
	const customRequestIcon5 = async (options:any) => {
		const { file, onSuccess, onError } = options;
		try {
			const response: any = await handleProducts.handleUploadImageProducts(file);
			const { data } = response;
			// setIconBlock5(data.path);
			onSuccess(data.path);
		} catch (error) {
			onError(error);
		}
	};

	const onPreview1 = async (file: UploadFile<any>) => {
		let src = process.env.NEXT_PUBLIC_API_URL + "/" + file.url;
		if (!src) {
			// Xử lý trường hợp không có src
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview2 = async (file: UploadFile<any>) => {
		let src = process.env.NEXT_PUBLIC_API_URL + "/" + file.url;
		if (!src) {
			// Xử lý trường hợp không có src
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview3 = async (file: UploadFile<any>) => {
		let src = process.env.NEXT_PUBLIC_API_URL + "/" + file.url;
		if (!src) {
			// Xử lý trường hợp không có src
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview5 = async (file: UploadFile<any>) => {
		let src = process.env.NEXT_PUBLIC_API_URL + "/" + file.url;
		if (!src) {
			// Xử lý trường hợp không có src
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};

	// lấy dữ liệu
	useMemo(() => {
		dispatch(setLoading(true));
		// thao tác 3 lần get lấy dữ liệu
		const promises = [];

		const promiseVI = webInformationClient.handleGetWebInformation("6")
		promises.push(promiseVI);

		const promiseEN = webInformationClient.handleGetWebInformation("7")
		promises.push(promiseEN);

		const promiseCategory = handleCategoryClient.handleGetAllCategory("VI");
		promises.push(promiseCategory);

		Promise.all(promises)
			.then((results: any) => {
				console.log(results, "results");
				if(results[0]) {
					const data = JSON.parse(results[0].value);
					setListSliderBlock1(data.listSliderBlock1);
					setShowBlock1(data.showBlock1);
					setIconBlock2(data.iconBlock2);
					setUnderlineBlock2(data.underlineBlock2);
					setTitleBlock2VI(data.titleBlock2);
					setListSliderBlock2(data.listSliderBlock2);
					setContentBlock2VI(data.contentBlock2);
					setShowBlock2(data.showBlock2);
					setListSliderBlock3(data.listSliderBlock3);
					setIconBlock3(data.iconBlock3);
					setUnderlineBlock3(data.underlineBlock3);
					setTitleBlock3VI(data.titleBlock3);
					setShowBlock3(data.showBlock3);
					setDataBlock4(data.dataBlock4);
					setListSliderBlock5(data.listSliderBlock5);
					setUnderlineBlock5(data.uderlineBlock5);
					setTitleBlock5VI(data.titleBlock5);
					setShowBlock5(data.showBlock5);
				}
				if(results[1]) {
					const data = JSON.parse(results[1].value)
					setTitleBlock2EN(data.titleBlock2);
					setContentBlock2EN(data.contentBlock2);
					setTitleBlock3EN(data.titleBlock3);
					setTitleBlock5EN(data.titleBlock5);
				}
				if(results[2]) {
					setDataCategory(results[2]);
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

	useEffect(() => {
		if (dataCategory) {
			const myoptions: any = dataCategory.map((item: any) => {
				return {
					value: item.id,
					label: item.name
				};
			});
			setOptions(myoptions);
		}
	}, [dataCategory]);

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

	const handleChangeContentEN = (event:any, key:any) => {
		const { value } = event.target;
		setContentBlock2EN((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	const handleChangeContentVI = (event:any, key:any) => {
		const { value } = event.target;
		setContentBlock2VI((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	const handleAddMenu = () => {
		let datafromState = [...dataProduct];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			number: 8,
			value: 1,
		});
		setDataProducts(datafromState);
	}
	const handleDeleteMenu = (key: number) => {
		let datafromState = dataProduct.filter((item) => item.key !== key);
		setDataProducts(datafromState);
	}
	const handleInputChange = (value:any, index:any, field:any) => {
		setDataProducts((prevData) => {
			const newData:any = [...prevData];
			newData[index][field] = value;
			return newData;
		});
	};
	const handleSubmit = () => {
		dispatch(setLoading(true));
		const newArray1 = fileList1.map(obj => obj.response);
		const newArray2 = fileList2.map(obj => obj.response);
		const newArrayIcon2 = fileListIcon2.map(obj => obj.response);
		const newArray3 = fileList3.map(obj => obj.response);
		const newArrayIcon3 = fileListIcon3.map(obj => obj.response);
		const newArray5 = fileList5.map(obj => obj.response);
		const newArrayIcon5 = fileListIcon5.map(obj => obj.response);

		let dataVI = {
			listSliderBlock1: newArray1,
			showBlock1: showBlock1,
			iconBlock2: newArrayIcon2,
			uderlineBlock2: uderlineBlock2,
			titleBlock2: titleBlock2VI,
			listSliderBlock2: newArray2,
			contentBlock2: contentBlock2VI,
			showBlock2: showBlock2,
			listSliderBlock3: newArray3,
			iconBlock3: newArrayIcon3,
			uderlineBlock3: uderlineBlock3,
			titleBlock3: titleBlock3VI,
			showBlock3: showBlock3,
			dataBlock4: dataBlock4,
			listSliderBlock5: newArray5,
			iconBlock5: newArrayIcon5,
			uderlineBlock5: uderlineBlock5,
			titleBlock5: titleBlock5VI,
			showBlock5: showBlock5
		};
		let dataEN = {
			listSliderBlock1: newArray1,
			showBlock1: showBlock1,
			iconBlock2: iconBlock2,
			uderlineBlock2: uderlineBlock2,
			titleBlock2: titleBlock2EN,
			listSliderBlock2: newArray2,
			contentBlock2: contentBlock2EN,
			showBlock2: showBlock2,
			listSliderBlock3: newArray3,
			iconBlock3: iconBlock3,
			uderlineBlock3: uderlineBlock3,
			titleBlock3: titleBlock3EN,
			showBlock3: showBlock3,
			dataBlock4: dataBlock4,
			listSliderBlock5: newArray5,
			iconBlock5: iconBlock5,
			uderlineBlock5: uderlineBlock5,
			titleBlock5: titleBlock5EN,
			showBlock5: showBlock5
		}
		const body1 = {
			id: 6,
			key: "TRANGCHU_VI",
			value: JSON.stringify(dataVI),
			description: "dữ liệu trang chủ - tiếng việt"
		}
		const body2 = {
			id:7,
			key: "TRANGCHU_EN",
			value: JSON.stringify(dataEN),
			description: "dữ liệu trang chủ - tiếng anh"
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
					header={"Dữ liệu Trang Chủ"}
					description={"Trang quản lý - Dữ liệu trang chủ"}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Tải ảnh slider baner <Switch checkedChildren="Hiển thị" unCheckedChildren="Tạm ẩn"
																					 checked={showBlock1}
																					 onChange={(checked) => setShowBlock1(checked)}
																					 style={{marginLeft: 15}}/>
						</label>
						<Upload
							customRequest={customRequest}
							listType="picture-card"
							fileList={fileList1}
							onChange={onChangeImage1}
							onPreview={onPreview1}
						>
							{fileList1.length < 5 && "+ Tải Ảnh"}
						</Upload>
					</div>

					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Block 1 (những mảnh ghép)
							<Switch checkedChildren="Hiển thị"
											unCheckedChildren="Tạm ẩn"
											checked={showBlock2}
											onChange={(checked) => setShowBlock2(checked)}
											style={{marginLeft: 15}}/>
						</label>
						<div style={{display: "flex", alignItems: "center"}}>
							<div style={{width: "20%"}}>
								<Upload customRequest={customRequestIcon2} fileList={fileListIcon2} onChange={onChangeIcon2}>
									<Button icon={<UploadOutlined/>}>Tải ảnh icon</Button>
								</Upload>
								<Switch checkedChildren="có gạch chân tiêu đề" unCheckedChildren="ẩn gạch chân tiêu đề" 											checked={uderlineBlock2}
												onChange={(checked) => setUnderlineBlock2(checked)}
												style={{marginTop: 15, marginBottom: 15}}/>
								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList2}
									onChange={onChangeImage2}
									onPreview={onPreview2}
								>
									{fileList2.length < 1 && "+ Tải Ảnh"}
								</Upload>
							</div>
							<div style={{width: "80%"}}>
								<Tabs activeKey={activeTab} items={items} onChange={onChange}/>
								{activeTab === "1" ? (
									<Input
										placeholder="Nhập và tên danh danh mục tiếng việt"
										size="large"
										onChange={(e) => setTitleBlock2VI(e.target.value)}
										value={titleBlock2VI}
									/>
								): (
									<Input
										placeholder="Nhập và tên danh danh mục tiếng anh"
										size="large"
										onChange={(e) => setTitleBlock2EN(e.target.value)}
										value={titleBlock2EN}
									/>
								)}

								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Mô tả ngắn
								</label>
								<Tabs
									activeKey={activeTab}
									items={items}
									onChange={onChange}
								/>
								{activeTab === "1" ? (
									<>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập nội dung (tiếng việt)"
											onChange={(event) => handleChangeContentVI(event, 'content1')}
											value={contentBlock2VI.content1}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập nội dung (tiếng việt)"
											onChange={(event) => handleChangeContentVI(event, 'content2')}
											value={contentBlock2VI.content2}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập nội dung (tiếng việt)"
											onChange={(event) => handleChangeContentVI(event, 'content3')}
											value={contentBlock2VI.content3}
										/>
									</>
								):(
									<>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 20}}
											placeholder="Nhập nội dung (tiếng anh)"
											onChange={(event) => handleChangeContentEN(event, 'content1')}
											value={contentBlock2EN.content1}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 20}}
											placeholder="Nhập nội dung (tiếng anh)"
											onChange={(event) => handleChangeContentEN(event, 'content2')}
											value={contentBlock2EN.content2}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 20}}
											placeholder="Nhập nội dung (tiếng anh)"
											onChange={(event) => handleChangeContentEN(event, 'content3')}
											value={contentBlock2EN.content3}
										/>
									</>
								)}
							</div>
						</div>


					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Tải ảnh slider cho Block 3 (sản phẩm thay lời nói) <Switch checkedChildren="Hiển thị"
																																				 unCheckedChildren="Tạm ẩn" checked={showBlock3}
																																				 onChange={(checked) => setShowBlock3(checked)}
																																				 style={{marginLeft: 15}}/>
						</label>
						<div style={{display: "flex", alignItems: "center"}}>
							<div style={{width: "20%"}}>
								<Upload customRequest={customRequestIcon3} fileList={fileListIcon3} onChange={onChangeIcon3}>
									<Button icon={<UploadOutlined/>}>Tải ảnh icon</Button>
								</Upload>
								<Switch checkedChildren="có gạch chân tiêu đề" unCheckedChildren="ẩn gạch chân tiêu đề" checked={uderlineBlock3}
												onChange={(checked) => setUnderlineBlock3(checked)}
												style={{marginTop: 15, marginBottom: 15}}/>
							</div>
							<div style={{width: "80%"}}>
								<div style={{marginBottom: 15}}>
									<Tabs activeKey={activeTab} items={items} onChange={onChange}/>
									{activeTab === "1" ? (
										<Input
											placeholder="Nhập tiêu đề block tiếng việt"
											size="large"
											onChange={(e) => setTitleBlock3VI(e.target.value)}
											value={titleBlock3VI}
										/>
									): (
										<Input
											placeholder="Nhập tiêu đề block tiếng anh"
											size="large"
											onChange={(e) => setTitleBlock3EN(e.target.value)}
											value={titleBlock3EN}
										/>
									)}
								</div>

								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList3}
									onChange={onChangeImage3}
									onPreview={onPreview3}
								>
									{fileList3.length < 20 && "Tải Ảnh Slider"}
								</Upload>
							</div>
						</div>
					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Sản phẩm ( mặc định luôn có sản phẩm mới)
						</label>
						<label className="admin__main-label">
							Lựa chọn danh mục cấp 1 và kiểm soát số lượng sản phẩm hiển thị ra
						</label>
						{dataProduct.map((product, index) =>(
							<div style={{display: "flex", alignItems: "center", marginBottom : 12}} key={product.key}>
								<Select
									showSearch
									style={{width: 200}}
									placeholder="Search to Select"
									optionFilterProp="children"
									filterOption={(input: any, option: any) => (option?.name ?? '').includes(input)}
									filterSort={(optionA: any, optionB: any) =>
										(optionA?.name ?? '').toLowerCase().localeCompare((optionB?.name ?? '').toLowerCase())
									}
									options={options}
									value={product.value}
									onSelect={(value, option) => handleInputChange(value, index, "value")}
								/>
								<span style={{marginLeft: 30}}>Số lượng sp hiển thị</span>
								<div style={{marginLeft: 20, marginRight: 20}}>
									<InputNumber min={1} max={0} value={product.number} onChange={(event:any) => handleInputChange(event.target.value, index, "number")}/>
								</div>
								<Button type="default" onClick={()=> handleDeleteMenu(product.key)}><DeleteOutlined/></Button>
							</div>
						))}

						<div className="admin__main-footer-group-btn" style={{marginTop: 15}} onClick={(e) => handleAddMenu()}>+
							Thêm
						</div>
					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Tải ảnh ảnh đối tác của bạn <Switch checkedChildren="Hiển thị" unCheckedChildren="Tạm ẩn" checked={showBlock5}
																									onChange={(checked) => setShowBlock5(checked)}
																									style={{marginLeft: 15}}/>
						</label>
						<div style={{display: "flex", alignItems: "center"}}>
							<div style={{width: "20%"}}>
								<Upload customRequest={customRequestIcon5} fileList={fileListIcon5} onChange={onChangeIcon5}>
									<Button icon={<UploadOutlined/>}>Tải ảnh icon</Button>
								</Upload>
								<Switch checkedChildren="có gạch chân tiêu đề" unCheckedChildren="ẩn gạch chân tiêu đề" checked={uderlineBlock5}
												onChange={(checked) => setUnderlineBlock5(checked)}
												style={{marginTop: 15, marginBottom: 15}}/>
							</div>
							<div style={{width: "80%"}}>
								<div style={{marginBottom: 15}}>
									<Tabs activeKey={activeTab} items={items} onChange={onChange}/>
									{activeTab === "1" ? (
										<Input
											placeholder="Nhập tiêu đề block tiếng việt"
											size="large"
											onChange={(e) => setTitleBlock5VI(e.target.value)}
											value={titleBlock5VI}
										/>
									): (
										<Input
											placeholder="Nhập tiêu đề block tiếng anh"
											size="large"
											onChange={(e) => setTitleBlock5EN(e.target.value)}
											value={titleBlock5EN}
										/>
									)}
								</div>

								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList5}
									onChange={onChangeImage5}
									onPreview={onPreview5}
								>
									{fileList5.length < 20 && "Tải Ảnh Slider"}
								</Upload>
							</div>
						</div>
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
