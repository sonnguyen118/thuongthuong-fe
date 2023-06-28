import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {Tabs, Button, Input, Switch, Upload, Select, InputNumber, notification} from "antd";
import type {TabsProps} from "antd";
import {StarFilled, UploadOutlined, DeleteOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import ImgCrop from "antd-img-crop";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {CkeditorEnable} from "@components/molecules/ckeditor";
import {handleCategoryClient, webInformation, webInformationClient} from "@service"
import {useSelector, useDispatch} from "react-redux";
import {setLoading} from "@slices/loadingState";
import {useCookies} from "react-cookie";
import {normalizeString} from "@utils/Mocks";
import {handleProducts} from "@service";
import {toast} from "react-toastify";

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
	// khai báo trang thái xoay
	const [isReversed1, setIsReversed1] = useState(false);
	const [isReversed2, setIsReversed2] = useState(false);
	const [isReversed3, setIsReversed3] = useState(false);
	const [isReversed4, setIsReversed4] = useState(false);
	const [isReversed5, setIsReversed5] = useState(false);
	// ẩn hay hiện
	const [show1, setShow1] = useState(true);
	const [show2, setShow2] = useState(true);
	const [show3, setShow3] = useState(true);
	const [show4, setShow4] = useState(true);
	const [show5, setShow5] = useState(true);
	// dữ liệu tiêu đề tiếng VIệt/ Anh
	const [title1VI, setTitle1VI] = useState("");
	const [title2VI, setTitle2VI] = useState("");
	const [title3VI, setTitle3VI] = useState("");
	const [title4VI, setTitle4VI] = useState("");
	const [title5VI, setTitle5VI] = useState("");
	const [title1EN, setTitle1EN] = useState("");
	const [title2EN, setTitle2EN] = useState("");
	const [title3EN, setTitle3EN] = useState("");
	const [title4EN, setTitle4EN] = useState("");
	const [title5EN, setTitle5EN] = useState("");
	// nội dung tiếng việt/anh
	const [description1VI, setDescription1VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description2VI, setDescription2VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description3VI, setDescription3VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description4VI, setDescription4VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description5VI, setDescription5VI] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description1EN, setDescription1EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description2EN, setDescription2EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description3EN, setDescription3EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description4EN, setDescription4EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [description5EN, setDescription5EN] = useState({
		content1: "",
		content2: "",
		content3: ""
	});
	const [imageBlock, setImageBlock] = useState([]);
	const [imageBlock1, setImageBlock1] = useState([]);
	const [imageBlock2, setImageBlock2] = useState([]);
	const [imageBlock3, setImageBlock3] = useState([]);
	const [imageBlock4, setImageBlock4] = useState([]);
	const [imageBlock5, setImageBlock5] = useState([]);

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [fileList1, setFileList1] = useState<UploadFile[]>([]);
	const [fileList2, setFileList2] = useState<UploadFile[]>([]);
	const [fileList3, setFileList3] = useState<UploadFile[]>([]);
	const [fileList4, setFileList4] = useState<UploadFile[]>([]);
	const [fileList5, setFileList5] = useState<UploadFile[]>([]);
	const [dataFileList, setDataFileList] = useState<UploadFile[]>([]);
	const onChangeImage: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList(newFileList);
	};
	const onChangeImage1: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList1(newFileList);
	};
	const onChangeImage2: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList2(newFileList);
	};
	const onChangeImage3: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList3(newFileList);
	};
	const onChangeImage4: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList4(newFileList);
	};
	const onChangeImage5: UploadProps["onChange"] = ({fileList: newFileList,}) => {
		setFileList5(newFileList);
	};

	const onPreview = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview1 = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview2 = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview3 = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview4 = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onPreview5 = async (file: UploadFile) => {
		let src = file.url as string;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as RcFile);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
// khai báo hàm để thay đổi các description
	const handleChangeDescription = (event:any, key:any, number:number, type:string) => {
		const { value } = event.target;
		if(number === 1 && type==="VI" ) {
			setDescription1VI((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 1 && type==="EN" ) {
			setDescription1EN((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 2 && type==="VI" ) {
			setDescription2VI((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 2 && type==="EN" ) {
			setDescription2EN((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 3 && type==="VI" ) {
			setDescription3VI((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 3 && type==="EN" ) {
			setDescription3EN((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 4 && type==="VI" ) {
			setDescription4VI((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 4 && type==="EN" ) {
			setDescription4EN((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 5 && type==="VI" ) {
			setDescription5VI((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}
		if(number === 5 && type==="EN" ) {
			setDescription5EN((prevState) => ({
				...prevState,
				[key]: value,
			}));
		}

	};
	const [activeTab, setActiveTab] = useState("1");

	// lấy dữ liệu danh mục
	useMemo(() => {
		dispatch(setLoading(true));
		const promises = [];
		const promiseVI = webInformationClient.handleGetWebInformation("8")
		promises.push(promiseVI);
		const promiseEN = webInformationClient.handleGetWebInformation("9")
		promises.push(promiseEN);
		Promise.all(promises)
			.then((results: any) => {
				console.log(results, "results");
				if(results[0]) {
					const data = JSON.parse(results[0].value);
					setIsReversed1(data.isReversed1);
					setIsReversed2(data.isReversed2);
					setIsReversed3(data.isReversed3);
					setIsReversed4(data.isReversed4);
					setIsReversed5(data.isReversed5);
					setShow1(data.show1);
					setShow2(data.show2);
					setShow3(data.show3);
					setShow4(data.show4);
					setShow5(data.show5);
					setTitle1VI(data.title1);
					setTitle2VI(data.title2);
					setTitle3VI(data.title3);
					setTitle4VI(data.title4);
					setTitle5VI(data.title5);
					setDescription1VI(data.description1);
					setDescription2VI(data.description2);
					setDescription3VI(data.description3);
					setDescription4VI(data.description4);
					setDescription5VI(data.description5);
					setImageBlock(data.imageBaner);
					setImageBlock1(data.image1);
					setImageBlock2(data.image2);
					setImageBlock3(data.image3);
					setImageBlock4(data.image4);
					setImageBlock5(data.image5);
				}
				if(results[1]) {
					const data = JSON.parse(results[1].value)
					setTitle1EN(data.title1);
					setTitle2EN(data.title2);
					setTitle3EN(data.title3);
					setTitle4EN(data.title4);
					setTitle5EN(data.title5);
					setDescription1EN(data.description1);
					setDescription2EN(data.description2);
					setDescription3EN(data.description3);
					setDescription4EN(data.description4);
					setDescription5EN(data.description5);
				}
				dispatch(setLoading(false));

			})
			.catch((error) => {
				// Xử lý khi có lỗi xảy ra
				notification.error({
					message: "Cập nhật dữ liệu thất bại",
					description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu tiếng việt",
					duration: 1.5,
					onClose: () => {
						dispatch(setLoading(false));
					},
				});
			});

	}, [])
// đẩy ảnh vào các list hiển thị
	useEffect(()=> {
		if(imageBlock.length > 0) {
			const mappedData: UploadFile[] = imageBlock.map((urlImage: string) => ({
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
			setFileList(mappedData);
		}
	},[imageBlock1]);
	useEffect(()=> {
		if(imageBlock1.length > 0) {
			const mappedData: UploadFile[] = imageBlock1.map((urlImage: string) => ({
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
	},[imageBlock1]);
	useEffect(()=> {
		if(imageBlock2.length > 0) {
			const mappedData: UploadFile[] = imageBlock2.map((urlImage: string) => ({
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
		}
	},[imageBlock2]);
	useEffect(()=> {
		if(imageBlock3.length > 0) {
			const mappedData: UploadFile[] = imageBlock3.map((urlImage: string) => ({
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
		}
	},[imageBlock3]);
	useEffect(()=> {
		if(imageBlock4.length > 0) {
			const mappedData: UploadFile[] = imageBlock4.map((urlImage: string) => ({
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
			setFileList4(mappedData);
		}
	},[imageBlock1]);
	useEffect(()=> {
		if(imageBlock5.length > 0) {
			const mappedData: UploadFile[] = imageBlock5.map((urlImage: string) => ({
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
		}
	},[imageBlock5]);

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


	const itemDecription: TabsProps["items"] = [
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
				<></>
			),
		}
	];

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
	// hàm submit
	const handleSubmit = () => {
		dispatch(setLoading(true));
		const newArray = fileList.map(obj => obj.response);
		const newArray1 = fileList1.map(obj => obj.response);
		const newArray2 = fileList2.map(obj => obj.response);
		const newArray3 = fileList3.map(obj => obj.response);
		const newArray4 = fileList4.map(obj => obj.response);
		const newArray5 = fileList5.map(obj => obj.response);

		let dataVI ={
			imageBaner:newArray,
			isReversed1: isReversed1,
			isReversed2: isReversed2,
			isReversed3: isReversed3,
			isReversed4: isReversed4,
			isReversed5: isReversed5,
			show1: show1,
			show2: show2,
			show3: show3,
			show4: show4,
			show5: show5,
			title1: title1VI,
			title2: title2VI,
			title3: title3VI,
			title4: title4VI,
			title5: title5VI,
			description1: description1VI,
			description2: description2VI,
			description3: description3VI,
			description4: description4VI,
			description5: description5VI,
			image1:newArray1,
			image2: newArray2,
			image3: newArray3,
			image4: newArray4,
			image5: newArray5
		}

		let dataEN ={
			imageBaner:newArray,
			isReversed1: isReversed1,
			isReversed2: isReversed2,
			isReversed3: isReversed3,
			isReversed4: isReversed4,
			isReversed5: isReversed5,
			show1: show1,
			show2: show2,
			show3: show3,
			show4: show4,
			show5: show5,
			title1: title1EN,
			title2: title2EN,
			title3: title3EN,
			title4: title4EN,
			title5: title5EN,
			description1: description1EN,
			description2: description2EN,
			description3: description3EN,
			description4: description4EN,
			description5: description5EN,
			image1:newArray1,
			image2: newArray2,
			image3: newArray3,
			image4: newArray4,
			image5: newArray5
		}
		const body1 = {
			id: 8,
			key: "GIOITHIEU_VI",
			value: JSON.stringify(dataVI),
			description: "dữ liệu trang gioi thieu - tiếng việt"
		}
		const body2 = {
			id:9,
			key: "GIOITHIEU_EN",
			value: JSON.stringify(dataEN),
			description: "dữ liệu trang gioi thieu - tiếng anh"
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
					description: 'Bạn đã thành công cập nhật dữ liệu cho trang giới thiệu',
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
					header={"Dữ liệu Trang Giới Thiệu"}
					description={"Có thể tùy chọn tải ảnh hoặc slider, thay đổi vị trí ảnh"}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<label className="admin__main-label">
							<StarFilled style={{marginRight: 5}}/>
							Tải ảnh baner chính
						</label>
						<Upload
							customRequest={customRequest}
							listType="picture-card"
							fileList={fileList}
							onChange={onChangeImage}
							onPreview={onPreview}
						>
							{fileList.length < 1 && "+ Tải Ảnh"}
						</Upload>
					</div>
						<div
							className="admin__main-cards"
							style={{marginBottom: "20px"}}
						>
							<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Tải ảnh slider baner
									<Switch checkedChildren="căn ảnh phải" unCheckedChildren="căn ảnh trái" checked={isReversed1} onChange={()=>setIsReversed1(!isReversed1)} style={{marginLeft: 15}}/>
								</label>
								<Switch checkedChildren="Đang hiện" unCheckedChildren="Đang ẩn" checked={show1} onChange={()=>setShow1(!show1)} style={{marginLeft: 15}}/>
							</div>
							<div className="" style={{
								display: "flex",
								flexDirection: isReversed1 ? 'row-reverse' : 'row',
								justifyContent: "space-between"
							}}>
								<div style={{width: "35%", paddingTop: 30}}>
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
								<div style={{width: "60%"}}>
									<label className="admin__main-label">
										Nội dung
									</label>
									<Tabs
										activeKey={activeTab}
										items={itemDecription}
										onChange={onChange}
									/>
									{activeTab === "1" ? (<>
										<label className="admin__main-label">
											Tiêu đề
										</label>
										<Input
											placeholder="Nhập tiêu đề tiếng việt"
											size="large"
											onChange={(e)=>setTitle1VI(e.target.value)}
											value={title1VI}
										/>
										<label className="admin__main-label">
											Mô tả
										</label>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả ngắn tiếng việt"
											onChange={(event) => handleChangeDescription(event, "content1", 1, "VI")}
											value={description1VI.content1}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả ngắn tiếng việt"
											onChange={(event) => handleChangeDescription(event, "content2", 1, "VI")}
											value={description1VI.content2}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả ngắn tiếng việt"
											onChange={(event) => handleChangeDescription(event, "content3", 1, "VI")}
											value={description1VI.content3}
										/>
									</>) : (<>
										<label className="admin__main-label">
											Tiêu đề
										</label>
										<Input
											placeholder="Nhập tiêu đề tiếng anh"
											size="large"
											onChange={(e)=>setTitle1EN(e.target.value)}
											value={title1EN}
										/>
										<label className="admin__main-label">
											Mô tả
										</label>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả tiếng anh"
											onChange={(event) => handleChangeDescription(event, "content1", 1, "EN")}
											value={description1EN.content1}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả tiếng anh"
											onChange={(event) => handleChangeDescription(event, "content2", 1, "EN")}
											value={description1EN.content2}
										/>
										<TextArea
											showCount
											maxLength={400}
											style={{height: 80, marginBottom: 24}}
											placeholder="Nhập mô tả tiếng anh"
											onChange={(event) => handleChangeDescription(event, "content3", 1, "EN")}
											value={description1EN.content3}
										/>
									</>)}
								</div>
							</div>
						</div>

					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
							<label className="admin__main-label">
								<StarFilled style={{marginRight: 5}}/>
								Tải ảnh slider baner
								<Switch checkedChildren="căn ảnh phải" unCheckedChildren="căn ảnh trái" checked={isReversed2} onChange={()=>setIsReversed2(!isReversed2)} style={{marginLeft: 15}}/>
							</label>
							<Switch checkedChildren="Đang hiện" unCheckedChildren="Đang ẩn" checked={show2} onChange={()=>setShow2(!show2)} style={{marginLeft: 15}}/>
						</div>
						<div className="" style={{
							display: "flex",
							flexDirection: isReversed2 ? 'row-reverse' : 'row',
							justifyContent: "space-between"
						}}>
							<div style={{width: "35%", paddingTop: 30}}>
								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList2}
									onChange={onChangeImage2}
									onPreview={onPreview2}
								>
									{fileList2.length < 5 && "+ Tải Ảnh"}
								</Upload>
							</div>
							<div style={{width: "60%"}}>
								<label className="admin__main-label">
									Nội dung
								</label>
								<Tabs
									activeKey={activeTab}
									items={itemDecription}
									onChange={onChange}
								/>
								{activeTab === "1" ? (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng việt"
										size="large"
										onChange={(e)=>setTitle2VI(e.target.value)}
										value={title2VI}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content1", 2, "VI")}
										value={description2VI.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content2", 2, "VI")}
										value={description2VI.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content3", 2, "VI")}
										value={description2VI.content3}
									/>
								</>) : (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng anh"
										size="large"
										onChange={(e)=>setTitle2EN(e.target.value)}
										value={title2EN}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content1", 2, "EN")}
										value={description2EN.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content2", 2, "EN")}
										value={description2EN.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content3", 2, "EN")}
										value={description2EN.content3}
									/>
								</>)}
							</div>
						</div>
					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
							<label className="admin__main-label">
								<StarFilled style={{marginRight: 5}}/>
								Tải ảnh slider baner
								<Switch checkedChildren="căn ảnh phải" unCheckedChildren="căn ảnh trái" checked={isReversed3} onChange={()=>setIsReversed3(!isReversed3)} style={{marginLeft: 15}}/>
							</label>
							<Switch checkedChildren="Đang hiện" unCheckedChildren="Đang ẩn" checked={show3} onChange={()=>setShow3(!show3)} style={{marginLeft: 15}}/>
						</div>
						<div className="" style={{
							display: "flex",
							flexDirection: isReversed3 ? 'row-reverse' : 'row',
							justifyContent: "space-between"
						}}>
							<div style={{width: "35%", paddingTop: 30}}>
								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList3}
									onChange={onChangeImage3}
									onPreview={onPreview3}
								>
									{fileList3.length < 5 && "+ Tải Ảnh"}
								</Upload>
							</div>
							<div style={{width: "60%"}}>
								<label className="admin__main-label">
									Nội dung
								</label>
								<Tabs
									activeKey={activeTab}
									items={itemDecription}
									onChange={onChange}
								/>
								{activeTab === "1" ? (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng việt"
										size="large"
										onChange={(e)=>setTitle3VI(e.target.value)}
										value={title3VI}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content1", 3, "VI")}
										value={description3VI.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content2", 3, "VI")}
										value={description3VI.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content3", 3, "VI")}
										value={description3VI.content3}
									/>
								</>) : (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng anh"
										size="large"
										onChange={(e)=>setTitle1EN(e.target.value)}
										value={title3EN}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content1", 3, "EN")}
										value={description3EN.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content2", 3, "EN")}
										value={description3EN.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content3", 3, "EN")}
										value={description3EN.content3}
									/>
								</>)}
							</div>
						</div>
					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
							<label className="admin__main-label">
								<StarFilled style={{marginRight: 5}}/>
								Tải ảnh slider baner
								<Switch checkedChildren="căn ảnh phải" unCheckedChildren="căn ảnh trái" checked={isReversed4} onChange={()=>setIsReversed4(!isReversed4)} style={{marginLeft: 15}}/>
							</label>
							<Switch checkedChildren="Đang hiện" unCheckedChildren="Đang ẩn" checked={show4} onChange={()=>setShow4(!show4)} style={{marginLeft: 15}}/>
						</div>
						<div className="" style={{
							display: "flex",
							flexDirection: isReversed4 ? 'row-reverse' : 'row',
							justifyContent: "space-between"
						}}>
							<div style={{width: "35%", paddingTop: 30}}>
								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList4}
									onChange={onChangeImage4}
									onPreview={onPreview4}
								>
									{fileList4.length < 5 && "+ Tải Ảnh"}
								</Upload>
							</div>
							<div style={{width: "60%"}}>
								<label className="admin__main-label">
									Nội dung
								</label>
								<Tabs
									activeKey={activeTab}
									items={itemDecription}
									onChange={onChange}
								/>
								{activeTab === "1" ? (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng việt"
										size="large"
										onChange={(e)=>setTitle4VI(e.target.value)}
										value={title4VI}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content1", 4, "VI")}
										value={description4VI.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content2", 4, "VI")}
										value={description4VI.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content3", 4, "VI")}
										value={description4VI.content3}
									/>
								</>) : (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng anh"
										size="large"
										onChange={(e)=>setTitle4EN(e.target.value)}
										value={title4EN}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content1", 4, "EN")}
										value={description4EN.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content2", 4, "EN")}
										value={description4EN.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content3", 4, "EN")}
										value={description4EN.content3}
									/>
								</>)}
							</div>
						</div>
					</div>
					<div
						className="admin__main-cards"
						style={{marginBottom: "20px"}}
					>
						<div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
							<label className="admin__main-label">
								<StarFilled style={{marginRight: 5}}/>
								Tải ảnh slider baner
								<Switch checkedChildren="căn ảnh phải" unCheckedChildren="căn ảnh trái" checked={isReversed5} onChange={()=>setIsReversed5(!isReversed5)} style={{marginLeft: 15}}/>
							</label>
							<Switch checkedChildren="Đang hiện" unCheckedChildren="Đang ẩn" checked={show5} onChange={()=>setShow5(!show5)} style={{marginLeft: 15}}/>
						</div>
						<div className="" style={{
							display: "flex",
							flexDirection: isReversed5 ? 'row-reverse' : 'row',
							justifyContent: "space-between"
						}}>
							<div style={{width: "35%", paddingTop: 30}}>
								<Upload
									customRequest={customRequest}
									listType="picture-card"
									fileList={fileList5}
									onChange={onChangeImage5}
									onPreview={onPreview5}
								>
									{fileList5.length < 5 && "+ Tải Ảnh"}
								</Upload>
							</div>
							<div style={{width: "60%"}}>
								<label className="admin__main-label">
									Nội dung
								</label>
								<Tabs
									activeKey={activeTab}
									items={itemDecription}
									onChange={onChange}
								/>
								{activeTab === "1" ? (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng việt"
										size="large"
										onChange={(e)=>setTitle5VI(e.target.value)}
										value={title5VI}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content1", 5, "VI")}
										value={description5VI.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content2", 5, "VI")}
										value={description5VI.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả ngắn tiếng việt"
										onChange={(event) => handleChangeDescription(event, "content3", 5, "VI")}
										value={description5VI.content3}
									/>
								</>) : (<>
									<label className="admin__main-label">
										Tiêu đề
									</label>
									<Input
										placeholder="Nhập tiêu đề tiếng anh"
										size="large"
										onChange={(e)=>setTitle5EN(e.target.value)}
										value={title5EN}
									/>
									<label className="admin__main-label">
										Mô tả
									</label>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content1", 5, "EN")}
										value={description5EN.content1}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content2", 5, "EN")}
										value={description5EN.content2}
									/>
									<TextArea
										showCount
										maxLength={400}
										style={{height: 80, marginBottom: 24}}
										placeholder="Nhập mô tả tiếng anh"
										onChange={(event) => handleChangeDescription(event, "content3", 5, "EN")}
										value={description5EN.content3}
									/>
								</>)}
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
