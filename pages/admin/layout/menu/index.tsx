import React, {useState, ReactNode} from "react";
import {Button, Table, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import type {TableRowSelection} from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {FilterAdminTable} from "@components/molecules/FilterAdmin";
import {useRouter} from "next/router";
import {useDrag, useDrop, DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {EditOutlined} from "@ant-design/icons";

interface DataType {
	id: number;
	key: number;
	name: string;
	isActivate: boolean;
	link: string;
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
		title: "Tiêu đề",
		dataIndex: "name",
		render: (text) => <>{text}</>,
	},
	{
		title: "Đường dẫn",
		dataIndex: "link",
		render: (text) => <>{process.env.NEXT_PUBLIC_FULL_URL + text}</>,
	},
	{
		title: "Trạng thái",
		key: "isActivate",
		dataIndex: "isActivate",
		render: (_, {isActivate}) => (
			<>
				{isActivate ? (
					<Tag color={"green"}>Hiển thị</Tag>
				) : (
					<Tag color={"volcano"}>Đang ẩn</Tag>
				)}
			</>
		),
	},
	{
		title: "Thao tác",
		dataIndex: "address",
		render: (text, record) => (
			<Button>Tạm ẩn</Button>
		),
	},
];

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}
interface  DraggableDivProps {
	id: number;
	index: number;
	moveDiv: any;
	title: string;
	link: string;
	isActive: boolean;
}

const DraggableDiv = (props:DraggableDivProps ) => {
	const {id, index, moveDiv, title, link, isActive} = props
	const [state, setState] = useState('Initial state');

	const [{isDragging}, drag] = useDrag(() => ({
		type: 'box',
		item: {id, index},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	const [, drop] = useDrop(() => ({
		accept: 'box',
		hover(item: any) {
			if (item.index !== index) {
				moveDiv(item.index, index);
			}
		},
	}));

	const handleDivClick = () => {
		setState('State changed');
	};

	return (
		<div
			ref={(node) => drag(drop(node))}
			style={{
				opacity: isDragging ? 0.5 : 1,
				cursor: 'move',
			}}
		>
			<div onClick={handleDivClick} className="admin__main-dnd-item">
				<div className="admin__main-dnd-item-title">{title}</div>
				<div className="admin__main-dnd-item-link">{link}</div>
			</div>
		</div>
	);
};


const App: React.FC = () => {
	const router = useRouter();
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [data, setData] = useState<DataType[]>([
		{
			id: 1,
			key: 1,
			name: "Trang Chủ",
			isActivate: true,
			link: "/"
		},
		{
			id: 1,
			key: 2,
			name: "Giới Thiệu",
			isActivate: true,
			link: "/gioi-thieu"
		},
		{
			id: 1,
			key: 3,
			name: "Tin Tức",
			isActivate: true,
			link: "/tin-tuc"
		},
		{
			id: 1,
			key: 4,
			name: "Sản Phẩm",
			isActivate: true,
			link: "/san-pham"
		},
		{
			id: 1,
			key: 5,
			name: "Tuyển Dụng",
			isActivate: true,
			link: "/tuyen-dung"
		},
		{
			id: 1,
			key: 6,
			name: "Liên Hệ",
			isActivate: true,
			link: "/lien-he"
		},
	]);
	const [isChange, setChange] = useState<boolean>(false)
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
			title: `Danh sách menu`,
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
		title: "Tạo menu",
		link: "/admin/layout/menu/tao-moi",
	};

	const moveDiv = (startIndex: any, endIndex: any) => {
		const updatedDivs = [...data];
		const draggedDiv = updatedDivs[startIndex];
		updatedDivs.splice(startIndex, 1);
		updatedDivs.splice(endIndex, 0, draggedDiv);
		setData(updatedDivs);
	};
	console.log(data)
	const handleChangePosition = () => {
		setChange(true);
	}
	const handleCancleChangePosition = () => {
		setChange(false);
		// setData([])
	}
	const handleSubmitChangePosition = () => {
		setChange(false);
		// setData([])
	}
	return (
		<Dashboard>
			<div className="admin__main-wrap">
				<NavigationAdmin
					header={"Danh sách Menu - Navbar"}
					description={
						"Trang quản lý danh sách menu - navbar"
					}
					data={navigationData}
				/>
				{!isChange ? (
					<div className="admin__main-content">
						<Button type={"primary"} onClick={()=> handleChangePosition()} style={{marginBottom: 15}}><EditOutlined style={{marginRight: 5}}/>Sửa vị trí</Button>
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
							onRow={(record, rowIndex) => {
								return {
									onClick: (event) => {
										router.push(`/admin/danh-muc/danh-muc-cap-2/${record.key}`); // Perform router push on row click
									},
								};
							}}
						/>
					</div>
				):(
					<div className="admin__main-content">
						<div style={{marginBottom: 15}}>
							<Button type={"default"} onClick={()=> handleCancleChangePosition()}>Hủy bỏ</Button>
							<Button type={"primary"} onClick={()=> handleSubmitChangePosition()} style={{marginLeft: 10}}>Cập nhật</Button>
						</div>
					<DndProvider backend={HTML5Backend}>
						<div className="">
							<h2>Kéo thả thẻ menu</h2>
							{data.map((div:DataType, index:number) => (
								<DraggableDiv key={div.key} id={div.id} title={div.name} link={div.link} isActive={div.isActivate} index={index} moveDiv={moveDiv}/>
							))}
						</div>
					</DndProvider>
					</div>
				)}
			</div>
		</Dashboard>
	);
};

export default App;
