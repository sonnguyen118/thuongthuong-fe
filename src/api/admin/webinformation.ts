import {axiosInstanceAuthorization, axiosInstanceClient} from "@api/AxiosInterceptor";


interface createWebInformationBody {
	key: string;
	value: string;
	description: string;
}

const createWebInformation = (body: createWebInformationBody): Promise<any> => {
	return axiosInstanceAuthorization.post(process.env.NEXT_PUBLIC_API_URL + "/web-information", body);
};

const updateWebInformation = (body: createWebInformationBody): Promise<any> => {
	return axiosInstanceAuthorization.patch(process.env.NEXT_PUBLIC_API_URL + "/web-information", body);
};



export default { createWebInformation, updateWebInformation};
