import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {Tabs, Button, Input, Select, Upload} from "antd";
import type {TabsProps} from "antd";
import {StarFilled} from "@ant-design/icons";
import {useRouter} from "next/router";
import ImgCrop from "antd-img-crop";
import type {RcFile, UploadFile, UploadProps} from "antd/es/upload/interface";
import {CkeditorEnable} from "@components/molecules/ckeditor";
import {handleCategoryClient} from "@service"
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
	const [cookies] = useCookies(["accessToken"]);
	const token = cookies["accessToken"];
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const onChangeImage: UploadProps["onChange"] = ({
																										fileList: newFileList,
																									}) => {
		setFileList(newFileList);
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

	const [activeTab, setActiveTab] = useState("1");
	const [dataCategory, setDataCategory] = useState([]);
	const [selector1, setSelector1] = useState<any>();
	const [selector2, setSelector2] = useState<any>();
	const [options, setOptions] = useState([]);
	const [options2, setOptions2] = useState([]);
	const [title, setTitle] = useState<{ [key: string]: string | undefined }>({
		VI: undefined,
		EN: undefined,
		FR: undefined,
		PO: undefined,
	});
	const [link, setLink] = useState<string>();
	const [description, setDescription] = useState<{ [key: string]: string | undefined }>({
		VI: undefined,
		EN: undefined,
		FR: undefined,
		PO: undefined,
	});
	const [contentVI, setContentVI] = useState<string | undefined>();
	const [contentEN, setContentEN] = useState<string | undefined>();
	const [contentFR, setContentFR] = useState<string | undefined>();
	const [contentPO, setContentPO] = useState<string | undefined>();
	const [image, setImage] = useState();
	const handleTitleChange =
		(languageKey: LanguageKey) =>
			(event: React.ChangeEvent<HTMLInputElement>) => {
				setTitle((prevName) => ({
					...prevName,
					[languageKey]: event.target.value,
				}));
			};
	const handleDescriptionChange =
		(languageKey: LanguageKey) =>
			(event: React.ChangeEvent<HTMLInputElement>) => {
				setDescription((prevName) => ({
					...prevName,
					[languageKey]: event.target.value,
				}));
			};

	// hàm lọc title chuyển thành link
	const handleChangeTitleToLink = (value: string) => {
		setTitle((prevName) => ({
			...prevName,
			VI: value,
		}));
		const newLink: string = normalizeString(value);
		setLink(newLink);
	};
	// lấy dữ liệu danh mục
	useMemo(() => {
		dispatch(setLoading(true));
		const body: bodyCategoryGetAdmin = {
			language: "VI"
		}
		handleCategoryClient.handleGetAllCategory("language=VI")
			.then((result: any) => {
				setDataCategory(result);
				dispatch(setLoading(false));
			})
			.catch((error) => {
				console.log(error);
				dispatch(setLoading(false));
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
	useEffect(() => {
		if (selector1) {
			const item: any = dataCategory.find((item: any) => item.id === selector1);
			let optionsts = [];
			if (item && item.subCategories.length > 0) {
				optionsts = item.subCategories.map((subItem: any) => {
					return {
						value: subItem.id,
						label: subItem.name
					};
				});
				setOptions2(optionsts);
			} else {
				setSelector2(null);
				setOptions2([]);
			}

		}
	}, [selector1]);

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
					<Input
						placeholder="Nhập và tên danh danh mục tiếng việt"
						size="large"
						onChange={(e) => handleChangeTitleToLink(e.target.value)}
						value={title.VI}
					/>
				</>
			),
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: (
				<>
					<Input
						placeholder="Nhập vào tên danh danh mục tiếng anh"
						size="large"
						onChange={handleTitleChange("EN")}
						value={title.EN}
					/>
				</>
			),
		},
		{
			key: "3",
			label: `Tiếng Pháp`,
			children: (
				<>
					<Input
						placeholder="Nhập vào tên danh danh mục tiếng pháp"
						size="large"
						onChange={handleTitleChange("FR")}
						value={title.FR}
					/>
				</>
			),
		},
		{
			key: "4",
			label: `Tiếng Bồ Đào Nha`,
			children: (
				<>
					<Input
						placeholder="Nhập vào tên danh danh mục tiêng bồ đào nha"
						size="large"
						onChange={handleTitleChange("PO")}
						value={title.PO}
					/>
				</>
			),
		},
	];
	const onChangeTextarea = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(e);
	};
	const itemDecription: TabsProps["items"] = [
		{
			key: "1",
			label: `Tiếng Việt`,
			children: (
				<TextArea
					showCount
					maxLength={100}
					style={{height: 120, marginBottom: 24}}
					placeholder="Nhập mô tả ngắn về sản phẩm"
					onChange={(e)=>handleDescriptionChange("VI")}
					value={description.VI}
				/>
			),
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: (
				<TextArea
					showCount
					maxLength={100}
					style={{height: 120, marginBottom: 24}}
					onChange={(e)=>handleDescriptionChange("EN")}
					value={description.EN}
					placeholder="Nhập mô tả ngắn về sản phẩm"
				/>
			),
		},
		{
			key: "3",
			label: `Tiếng Pháp`,
			children: (
				<TextArea
					showCount
					maxLength={100}
					style={{height: 120, marginBottom: 24}}
					onChange={(e)=>handleDescriptionChange("FR")}
					value={description.FR}
					placeholder="Nhập mô tả ngắn về sản phẩm"
				/>
			),
		},
		{
			key: "4",
			label: `Tiếng Bồ Đào Nha`,
			children: (
				<TextArea
					showCount
					maxLength={100}
					style={{height: 120, marginBottom: 24}}
					onChange={(e)=>handleDescriptionChange("PO")}
					value={description.PO}
					placeholder="Nhập mô tả ngắn về sản phẩm"
				/>
			),
		},
	];
	const itemCKeditor: TabsProps["items"] = [
		{
			key: "1",
			label: `Tiếng Việt`,
			children: <CkeditorEnable data={contentVI} setData={setContentVI}/>,
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: <CkeditorEnable data={contentEN} setData={setContentEN}/>,
		},
		{
			key: "3",
			label: `Tiếng Pháp`,
			children: <CkeditorEnable data={contentFR} setData={setContentFR}/>,
		},
		{
			key: "4",
			label: `Tiếng Bồ Đào Nha`,
			children: <CkeditorEnable data={contentPO} setData={setContentPO}/>,
		},
	];
	const handleSubmit = () => {
		dispatch(setLoading(true));
		let body = {
			link: link,
			imgLink: "/",
			categoryLevel1Id : selector1,
			categoryLevel2Id : selector2,
			content: [
				{
					name: title.VI,
					language: "VI",
					content: contentVI,
					description: description.VI
				},
				{
					name: title.EN,
					language: "EN",
					content: contentEN,
					description: description.EN
				},
				{
					name: title.FR,
					language: "FR",
					content: contentFR,
					description: description.FR
				},
				{
					name: title.PO,
					language: "PO",
					content: contentPO,
					description: description.PO
				},
			],

		}
		console.log(body, "body");
		handleProducts.handleCreateProducts(body)
			.then((result: any) => {
				console.log(result, "result");
				toast.success("Tạo danh mục sản phẩm thành công !", {
					position: "top-right",
					autoClose: 1200,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					onClose: () => {
						router.push("/admin/san-pham/toan-bo-san-pham");
					},
				});
			})
			.catch((error) => {
				console.log(error);
			});

	}
	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Trang Tuyển Dụng"}
					description={"Soạn thảo trang tuyển dụng bằng trình soạn thảo văn bản"}
					data={navigationData}
				/>
				<div className="admin__main-content">

							<div
								className="admin__main-cards"
								style={{marginBottom: "20px"}}
							>
								<label className="admin__main-label">
									<StarFilled style={{marginRight: 5}}/>
									Bài viết
								</label>
								<Tabs
									activeKey={activeTab}
									items={itemCKeditor}
									onChange={onChange}
								/>
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
							Tạo sản phẩm
						</Button>
					</div>
				</div>
			</div>
		</Dashboard>
	);
};

export default App;