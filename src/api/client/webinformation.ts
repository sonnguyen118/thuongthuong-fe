import {axiosInstanceClient} from "@api/AxiosInterceptor";


const getWebInformation = (params: string): Promise<any> => {
	return axiosInstanceClient.get(process.env.NEXT_PUBLIC_API_URL + `/web-information/${params}`);
};



export default { getWebInformation };
