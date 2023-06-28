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

const createCategory = (body: bodyCategory): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/create", body);
};


const getAllCategory = (): Promise<any> => {
	return axiosInstanceAuthorization.get(process.env.NEXT_PUBLIC_API_URL + "/category/admin-get-all");
};

const updateStatusCategory = (body : bodyUpdateCategory): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/category/update-status", body);
};

export default {createCategory, getAllCategory, updateStatusCategory};
