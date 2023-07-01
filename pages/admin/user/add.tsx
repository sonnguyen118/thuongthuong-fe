import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {Tabs, Button, Input, Select, Upload, Switch} from "antd";
import type {TabsProps} from "antd";
import {EnvironmentOutlined, StarFilled, UserOutlined, KeyOutlined} from "@ant-design/icons";
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
		useEffect(() => {
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


	const navigationData: NavigationProps[] = [
		{
			id: 1,
			title: `Trang chủ`,
			link: "/admin",
		},
		{
			id: 2,
			title: `Người dùng`,
			link: "/admin/user",
		},
		{
			id: 3,
			title: "Thêm mới người dùng",
			link: "/",
		},
	];
	const optionSelector = [
		{
			value: 1,
			label: 'Quyền quản trị (full quyền lực)',
		},
		{
			value: 2,
			label: 'Quản lý bán hàng (giỏ hàng, liên hệ, đăng sản phẩm)',
		},
		{
			value: 3,
			label: 'Communicated',
		},
		{
			value: 4,
			label: 'Identified',
		},
		{
			value: 5,
			label: 'Resolved',
		},
		{
			value: 6,
			label: 'Cancelled',
		}
];
const handleSubmit = () => {
	dispatch(setLoading(true));
	let body = {
		link: link,
		imgLink: "/",
		categoryLevel1Id: selector1,
		categoryLevel2Id: selector2,
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
				header={"Thêm người dùng"}
				description={"Tạo mới người dùng và phân quyền"}
				data={navigationData}
			/>
			<div className="admin__main-content">

				<div
					className="admin__main-cards"
					style={{marginBottom: "20px"}}
				>
					<label className="admin__main-label">
						<StarFilled style={{marginRight: 5}}/>
						Tài khoản
					</label>
					<Input size="large" placeholder="Nhập vào tên tài khoản" prefix={<UserOutlined/>} style={{marginBottom: 15}}/>
					<Input size="large" placeholder="Nhập vào mật khẩu" prefix={<KeyOutlined/>} style={{marginBottom: 15}}/>
					<Input size="large" placeholder="Nhập lại mật khẩu" prefix={<KeyOutlined/>} style={{marginBottom: 15}}/>
				</div>
				<div
					className="admin__main-cards"
					style={{marginBottom: "20px"}}
				>
					<label className="admin__main-label">
						<StarFilled style={{marginRight: 5}}/>
						Phân quyền
					</label>
					<Select
						showSearch
						style={{ width: "100%" }}
						placeholder="Search to Select"
						optionFilterProp="children"
						filterOption={(input, option) => (option?.label ?? '').includes(input)}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={optionSelector}
					/>
				</div>
				<div
					className="admin__main-cards"
					style={{marginBottom: "20px"}}
				>
					<label className="admin__main-label">
						<StarFilled style={{marginRight: 5}}/>
						Cập nhật thông tin tài khoản
					</label>
					<Input size="large" placeholder="Họ và tên" style={{marginBottom: 15}}/>
					<Input size="large" placeholder="Số điện thoại" style={{marginBottom: 15}}/>
					<Input size="large" placeholder="Địa chỉ" style={{marginBottom: 15}}/>
					<TextArea
						showCount
						maxLength={400}
						style={{height: 80, marginBottom: 24}}
						placeholder="Mô tả về bản thân"
						onChange={(e) => handleDescriptionChange("VI")}
						value={description.VI}
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
						Thêm người dùng
					</Button>
				</div>
			</div>
		</div>
	</Dashboard>
);
}
;

export default App;
