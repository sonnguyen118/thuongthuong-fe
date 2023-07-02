import React, { useState, ReactNode, useMemo, useEffect } from "react";
import {Button, Table, Tag, Input, Tabs, TabsProps, notification} from "antd";
import type {ColumnsType} from "antd/es/table";
import type {TableRowSelection} from "antd/es/table/interface";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import {FilterAdminTable} from "@components/molecules/FilterAdmin";
import {useRouter} from "next/router";
import {useDrag, useDrop, DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {setLoading} from "@slices/loadingState";
import { useDispatch} from "react-redux";
import {webInformation, webInformationClient} from "@service";
interface DataType {
	key: number;
	title: string;
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
	const dispatch = useDispatch();
	const router = useRouter();
	const [data, setData] = useState<DataType[]>([]);
	const [dataEN, setDataEN] = useState<DataType[]>([]);
	//Lấy dữ liệu ban đầu
	useEffect(()=> {
		dispatch(setLoading(true));
		webInformationClient.handleGetWebInformation("4")
			.then((res:any) => {
				// Xử lý kết quả thành công
				const dataString = JSON.parse(res.value);
				console.log(dataString, "dataString");
				dispatch(setLoading(false));
				if(dataString) {
					setData(dataString)
				}
			})
			.catch((error) => {
				// Xử lý lỗi
				dispatch(setLoading(false));
				console.error(error);
			});
		webInformationClient.handleGetWebInformation("5")
			.then((res:any) => {
				// Xử lý kết quả thành công
				const dataString = JSON.parse(res.value);
				console.log(dataString, "dataString");
				dispatch(setLoading(false));
				if(dataString) {
					setDataEN(dataString)
				}
			})
			.catch((error) => {
				// Xử lý lỗi
				dispatch(setLoading(false));
				console.error(error);
			});
	}, []);
	const [isChange, setChange] = useState<boolean>(false);
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

	const moveDiv = (startIndex: any, endIndex: any) => {
		const updatedDivs = [...data];
		const draggedDiv = updatedDivs[startIndex];
		updatedDivs.splice(startIndex, 1);
		updatedDivs.splice(endIndex, 0, draggedDiv);
		setData(updatedDivs);
	};
	const handleChangePosition = () => {
		setChange(true);
	}
	const handleCancleChangePosition = () => {
		setChange(false);
		// setData([])
	}
	const [activeTab, setActiveTab] = useState("1");
	const onChange = (key: string) => {
		setActiveTab(key);
	};
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
	const handleAddMenu  = () => {
		let datafromState = [...data];
		let lastItem = datafromState[datafromState.length - 1];
		let newKey = lastItem ? lastItem.key + 1 : 1;
		datafromState.push({
			key: newKey,
			title: "",
			isActivate: true,
			link: ""
		});
		setData(datafromState);
	};
	// hàm thay đổi giá trị của các menu
	const handleInputChange = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setData((prevData) => {
			const newData:any = [...prevData];
			newData[index][field] = value;
			return newData;
		});
	};
	const handleInputChangeEN  = (event:any, index:any, field:any) => {
		const { value } = event.target;
		setDataEN((prevData) => {
			const newData:any = [...prevData];
			newData[index][field] = value;
			return newData;
		});
	};
	const handleDeleteMenu = (key: number) => {
		let datafromState = data.filter((item) => item.key !== key);
		setData(datafromState);
	}
	const handleSubmit = () => {
		dispatch(setLoading(true));
		data.forEach(function(item, index) {
			item.key = index + 1;
		});
		// Sử dụng map để tạo một mảng mới với giá trị "key" được cập nhật
		var newData = data.map(function(item, index) {
			return { ...item, key: index + 1 };
		});
		console.log(newData);
		const promises = [];
		// thực hiện hành động gửi dữ liệu
		const body = {
			id: 4,
			key: "MENU_VI",
			value: JSON.stringify(data),
			description: "dữ liệu menu - tv"
		}
		const bodyEN = {
			id: 5,
			key: "MENU_EN",
			value: JSON.stringify(dataEN),
			description: "dữ liệu menu - ta"
		}
		if (body) {
			const promiseVI = webInformation.handleUpdateWebInformation(body);
			promises.push(promiseVI);
		}
		if (bodyEN) {
			const promiseEN = webInformation.handleUpdateWebInformation(bodyEN);
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
					description: 'Bạn đã thành công cập nhật dữ liệu menu',
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
	};
	console.log(data, "data")
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
						<Tabs activeKey={activeTab} items={item} onChange={onChange}/>
						<div className="admin__main-cards">
							{activeTab === "1" ? (
								<>
									{data.map((item, index)=> (
										<div style={{display: "flex", alignItems: "center", marginBottom: 30}} key={item.key}>
											<span style={{marginRight: 20, fontStyle: "16px", fontWeight: 500}}>{item.key}</span>
											<Input size="large" placeholder="Nhập vào tiêu đề cho menu"
														 onChange={(event) => handleInputChange(event, index, "title")}
														 value={item.title}/>
											<Input size="large"  placeholder="Nhập vào đường dẫn" style={{marginLeft: 20, marginRight: 20}}
														 onChange={(event) => handleInputChange(event, index, "link")}
														 value={item.link}
														 addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"} />
											<Button type="default" onClick={(e) => handleDeleteMenu(item.key)}><DeleteOutlined/></Button>
										</div>
									))}
								</>
							) : (
								<>
									{dataEN.map((item, index)=> (
										<div style={{display: "flex", alignItems: "center", marginBottom: 30}} key={item.key}>
											<span style={{marginRight: 20, fontStyle: "16px", fontWeight: 500}}>{item.key}</span>
											<Input size="large" placeholder="Nhập vào tiêu đề cho menu"
														 onChange={(event) => handleInputChangeEN(event, index, "title")}
														 value={item.title}/>
											<Input size="large"  placeholder="Nhập vào đường dẫn" style={{marginLeft: 20, marginRight: 20}}
														 onChange={(event) => handleInputChangeEN(event, index, "link")}
														 value={item.link}
														 addonBefore={process.env.NEXT_PUBLIC_FULL_URL + "/"} />
											<Button type="default" onClick={(e) => handleDeleteMenu(item.key)}><DeleteOutlined/></Button>
										</div>
									))}
								</>
							)}

						</div>
						<Button type={"primary"} style={{marginTop: 20}} onClick={()=> handleAddMenu()}><PlusOutlined style={{marginRight: 5}}/>Thêm Menu</Button>
						<Button type={"primary"} style={{marginTop: 20, marginLeft: 20}} onClick={()=> handleSubmit()}>Cập nhật</Button>
					</div>
				):(
					<div className="admin__main-content">
						<div style={{marginBottom: 15}}>
							<Button type={"default"} onClick={()=> handleCancleChangePosition()}>Hủy bỏ</Button>
							<Button type={"primary"} onClick={()=> handleSubmit()} style={{marginLeft: 10}}>Cập nhật</Button>
						</div>
						<DndProvider backend={HTML5Backend}>
							<div className="">
								<h2>Kéo thả thẻ menu</h2>
								{data.map((div:DataType, index:number) => (
									<DraggableDiv key={div.key} id={div.key} title={div.title} link={div.link} isActive={div.isActivate} index={index} moveDiv={moveDiv}/>
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
