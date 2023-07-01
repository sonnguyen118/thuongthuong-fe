import React, {useState, ReactNode, useEffect} from "react";
import { Button, notification, Table, Tag } from "antd";
import type {ColumnsType} from "antd/es/table";
import type {TableRowSelection} from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {FilterAdminTable} from "@components/molecules/FilterAdmin";
import {useRouter} from "next/router";
import {setLoading} from "@slices/loadingState";
import {handleCategory} from "@service";
import {useDispatch} from "react-redux";
import * as process from "process";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
	key: React.Key;
	name: string;
	tags: boolean;
	action: ReactNode;
}

interface buttonProps {
	isButton: boolean;
	style: string;
	title: string;
	link: string;
};
interface NavigationProps {
	id: number;
	title: string;
	link: string;
};
const App: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [dataCategory, setDataCategory] = useState([]);
	const [data, setData] = useState<any[]>([]);
	const handleGoDetailt = (record: any) => {
		router.push(`/admin/danh-muc/danh-muc-cap-2/${record.id}`);
	};
	const handledeleteCategory =(record : any) => {
		const body = {
			id: record.id,
			isActive: false,
			softDeleted: true,
		};
		dispatch(setLoading(true));
		handleCategory
			.handleUpdateStatus(body)
			.then((result:any) => {
				// Xử lý kết quả trả về ở đây
				notification.success({
					message: "Xoá thành công",
					description: "Bạn đã tiến hành xóa thành công danh mục sản phẩm này",
					duration: 1.5,
					onClose: () => {
						dispatch(setLoading(false));
						router.reload();
					},
				});
			})
			.catch((error) => {
				// Xử lý lỗi ở đây
				console.log(error);
				notification.error({
					message: "Cập nhật dữ liệu thất bại",
					description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu",
					duration: 1.5,
					onClose: () => {
						dispatch(setLoading(false));
						// router.reload();
					},
				});
			});
	};

	const columns: ColumnsType<DataType> = [
		{
			title: "STT",
			dataIndex: "key",
			render: (text) => <>{text}</>,
		},
		{
			title: "Tiêu đề danh mục",
			dataIndex: "name",
			render: (text) => <>{text}</>,
		},
		{
			title: "Đường dẫn",
			dataIndex: "link",
			render: (link, record:any) => <>{process.env.NEXT_PUBLIC_FULL_URL + record.linkParent + link}</>,
		},
		{
			title: "Trạng thái",
			dataIndex: "isActive",
			render: (isActive) => (
				<>
					{isActive ? (
						<Tag color={"green"}>Hiển thị</Tag>
					) : (
						<Tag color={"volcano"}>Đang ẩn</Tag>
					)}
				</>
			),
		},
		{
			title: "Danh mục cha",
			dataIndex: "nameParent",
			render: (text) => <>{text}</>,
		},
		{
			title: "Thao tác",
			dataIndex: "link",
			render: (link, record) => (
				<>
					<Button onClick={(e)=> handleGoDetailt(record)}><EditOutlined /></Button>
					<Button style={{marginLeft: 15}} onClick={()=> handledeleteCategory(record)}><DeleteOutlined/></Button>
				</>
			),
		}
	];
	useEffect(() => {
		const body = {
			language: "VI",
		};
		dispatch(setLoading(true));
		handleCategory
			.handleGetAllCategory()
			.then((result: any) => {
				// Xử lý kết quả trả về ở đây
				setDataCategory(result);
				dispatch(setLoading(false));
			})
			.catch((error) => {
				// Xử lý lỗi ở đây
				console.log(error);
				dispatch(setLoading(false));
			});
	}, []);

	// Hàm đệ quy để thêm phần tử từ subCategories và bổ sung idParent và nameParent
	function addSubCategories(categories: any[]) {
		const newArray: any[] = [];
		categories.forEach(category => {
			const subCategoriesItem = category.subCategories;
			subCategoriesItem.forEach((item: any) => {
				newArray.push(
					{
						name: item.name,
						link: item.link,
						id: item.id,
						idParent: category.id,
						linkParent: category.link,
						nameParent: category.name,
						isActive: item.isActive
					}
				)
			})
		});
		return newArray;
	}

	useEffect(() => {
		if (dataCategory && dataCategory.length > 0) {
			console.log(addSubCategories(dataCategory), "data");
			setData(addSubCategories(dataCategory));
		}
	}, [dataCategory])
	console.log(dataCategory);
	const navigationData: NavigationProps[] = [
		{
			id: 1,
			title: `Trang chủ`,
			link: "/admin",
		},
		{
			id: 2,
			title: `Danh mục`,
			link: "/admin/danh-muc",
		},
		{
			id: 3,
			title: `Danh mục cấp 2`,
			link: "/",
		},
	];
	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const optionsSelector = [
		{
			value: "1",
			label: "Tranh Giấy",
		},
		{
			value: "2",
			label: "Sơn Mài",
		},
		{
			value: "3",
			label: "Đồ Gia Dụng",
		},
	];
	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
			{
				key: "odd",
				text: "Select Odd Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return false;
						}
						return true;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
			{
				key: "even",
				text: "Select Even Row",
				onSelect: (changeableRowKeys) => {
					let newSelectedRowKeys = [];
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return true;
						}
						return false;
					});
					setSelectedRowKeys(newSelectedRowKeys);
				},
			},
		],
	};
	const button: buttonProps = {
		isButton: true,
		style: "add",
		title: "Tạo danh mục cấp 2",
		link: "/admin/danh-muc/tao-moi-danh-muc?level=2",
	};
	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Danh mục cấp 2"}
					description={
						"Trang quản lý danh sách danh mục cấp 2 trong hệ thống sản phẩm của bạn"
					}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<FilterAdminTable
						isSelector={true}
						optionsSelector={optionsSelector}
						isDatepicker={false}
						titleFilter={"Lọc theo danh mục cấp 1"}
						placeholderInput={"Tìm kiếm theo tiêu đề danh mục"}
						button={button}
					/>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
					/>
				</div>
			</div>
		</Dashboard>
	);
};

export default App;
