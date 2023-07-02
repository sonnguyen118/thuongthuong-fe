import React, {useState, useEffect, useMemo} from "react";
import Dashboard from "@components/layouts/admin/Dashboard";
import {NavigationAdmin} from "@components/elements/navigation";
import { Tabs, Button, Input, Select, Upload, notification } from "antd";
import type {TabsProps} from "antd";
import {StarFilled} from "@ant-design/icons";
import {useRouter} from "next/router";
import {CkeditorEnable} from "@components/molecules/ckeditor";
import {useSelector, useDispatch} from "react-redux";
import {setLoading} from "@slices/loadingState";
import { handleCategoryClient, webInformation, webInformationClient } from "@service";

const {TextArea} = Input;

interface NavigationProps {
	id: number;
	title: string;
	link: string;
}

const App: React.FC = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [contentVI, setContentVI] = useState<string | undefined>()
	const [contentEN, setContentEN]= useState<string | undefined>()
	const [activeTab, setActiveTab] = useState("1");

	// lấy dữ liệu danh mục
	useEffect(() => {
		dispatch(setLoading(true));
		// thao tác 3 lần get lấy dữ liệu
		const promises = [];

		const promiseVI = webInformationClient.handleGetWebInformation("10")
		promises.push(promiseVI);

		const promiseEN = webInformationClient.handleGetWebInformation("11")
		promises.push(promiseEN);

		Promise.all(promises)
			.then((results: any) => {
				console.log(results, "results");
				if(results[0]) {
					const data = JSON.parse(results[0].value);
					setContentVI(data);
				}
				if(results[1]) {
					const data = JSON.parse(results[1].value)
					setContentEN(data);
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

	const itemCKeditor: TabsProps["items"] = [
		{
			key: "1",
			label: `Tiếng Việt`,
			children: <></>
		},
		{
			key: "2",
			label: `Tiếng Anh`,
			children: <></>
		}
	];
	const handleSubmit = () => {
		dispatch(setLoading(true));
		const body1 = {
			id: 10,
			key: "TUYENDUNG_VI",
			value: JSON.stringify(contentVI),
			description: "dữ liệu trang tuyen dung - tiếng việt"
		}
		const body2 = {
			id:11,
			key: "TUYENDUNG_EN",
			value: JSON.stringify(contentEN),
			description: "dữ liệu trang tuyen dung - tiếng anh"
		}
		const promises = [];
		if (contentVI) {
			const promiseVI = webInformation.handleUpdateWebInformation(body1);
			promises.push(promiseVI);
		}
		if (contentEN) {
			const promiseEN = webInformation.handleUpdateWebInformation(body2);
			promises.push(promiseEN);
		}
		Promise.all(promises)
			.then((results: any) => {
				if(results[0].meta.status !== 200) {
					notification.success({
						message: "Cập nhật dữ liệu thất bại",
						description: "Đã có lỗi xảy ra trong quá trình cập nhật dữ liệu tiếng việt",
						duration: 1,
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
						duration: 1,
						onClose: () => {
							dispatch(setLoading(false));
						},
					});
					return;
				}
				notification.success({
					message: 'Cập nhật dữ liệu thành công',
					description: 'Bạn đã thành công cập nhật dữ liệu footer',
					duration: 1,
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
								<div style={{display: activeTab === "2" ?"none": "block"}}>
									<CkeditorEnable data={contentVI} setData={setContentVI} />
								</div>
								<div style={{display: activeTab === "1" ?"none": "block"}}>
									<CkeditorEnable data={contentEN} setData={setContentEN} />
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
							style={{marginLeft: 10, zIndex: 500}}
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
