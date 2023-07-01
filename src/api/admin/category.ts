import {axiosInstanceAuthorization} from "@api/AxiosInterceptor";

type NameState = {
	[key: string]: string | undefined;
};

type bodyCategory = {
	name: NameState;
	link: string;
	parent: string | number
};
type bodyUpdateCategory = {
	id: number;
	isActive: boolean;
	softDeleted: boolean;
};
type bodyGetOne = {
	id: number;
};
type bodyUpdate = {
	id: number;
	name: any;
	link: string;
	parent: string;
}

const createCategory = (body: bodyCategory): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/create", body);
};


const getAllCategory = (): Promise<any> => {
	return axiosInstanceAuthorization.get(process.env.NEXT_PUBLIC_API_URL + "/category/admin-get-all");
};

const updateStatusCategory = (body : bodyUpdateCategory): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/update-status", body);
};
const getOne = (body : bodyGetOne): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/get-one", body);
};
const update = (body : bodyUpdate): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/update", body);
};

export default {createCategory, getAllCategory, updateStatusCategory, getOne, update};
