import React, { useState, ReactNode, useEffect } from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import { NavigationAdmin } from "@components/elements/navigation";
import { FilterAdminTable } from "@components/molecules/FilterAdmin";
import { useRouter } from "next/router";
import { handleCategory } from "@service";

import { useDispatch } from "react-redux";
import { setLoading } from "@slices/loadingState";

interface DataType {
	id: number;
	description: string;
	key: React.Key;
	name: string;
	isActive: boolean;
	isHighlight: boolean;
	link: string;
	action: ReactNode;
	parent: any;
}
interface buttonProps {
	isButton: boolean;
	style: string;
	title: string;
	link: string;
}
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
		title: "Trạng thái",
		key: "isActive",
		dataIndex: "isActive",
		render: (_, { isActive }) => (
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
		title: "Trạng thái",
		key: "isActive",
		dataIndex: "isActive",
		render: (_, { isActive }) => (
			<>
				{isActive ? (
					<Tag color={"green"}>Hiển thị</Tag>
				) : (
					<Tag color={"volcano"}>Đang ẩn</Tag>
				)}
			</>
		),
	}
];

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}
const App: React.FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [data, setData] = useState();
	useEffect(() => {
		const body = {
			language: "VI",
		};
		dispatch(setLoading(true));
		handleCategory
			.handleGetAllCategory()
			.then((result:any) => {
				// Xử lý kết quả trả về ở đây
				setData(result);
				dispatch(setLoading(false));
			})
			.catch((error) => {
				// Xử lý lỗi ở đây
				console.log(error);
				dispatch(setLoading(false));
			});
	}, []);

	const navigationData: NavigationProps[] = [
		{
			id: 1,
			title: `Trang chủ`,
			link: "/admin",
		},
		{
			id: 2,
			title: `Bài viết`,
			link: "/admin/bai-viet",
		},
		{
			id: 3,
			title: `Bài viết bị ẩn`,
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
			label: "Lọc theo alphabeta",
		},
		{
			value: "2",
			label: "Lọc theo thời gian tạo",
		},
		{
			value: "3",
			label: "Lọc theo đã ẩn",
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
		title: "Tạo bài viết",
		link: "/admin/bai-viet/them-bai-viet",
	};
	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Danh sách người dùng Website"}
					description={
						"Trang quản lý danh sách người dùng, phân quyền trong website của bạn"
					}
					data={navigationData}
				/>
				<div className="admin__main-content">
					<FilterAdminTable
						isSelector={true}
						optionsSelector={optionsSelector}
						isDatepicker={false}
						titleFilter={"Lựa chọn kiểu lọc"}
						placeholderInput={"Tìm kiếm theo tiêu đề bài viết"}
						button={button}
					/>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={data}
						onRow={(record, rowIndex) => {
							return {
								onClick: (event) => {
									router.push(`/admin/danh-muc/danh-muc-cap-1/${record.key}`); // Perform router push on row click
								},
							};
						}}
					/>
				</div>
			</div>
		</Dashboard>
	);
};

export default App;
