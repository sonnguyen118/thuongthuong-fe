import { WebInformationClient } from "@api";


type metaProps = {
	message: string;
	status: number;
};

type ResponseData = {
	data: any;
	meta: metaProps;
};

const handleGetWebInformation = async (params: string): Promise<ResponseData | Error> => {
	try {
		const response = await WebInformationClient.getWebInformation(params);
		const { data, meta } = response.data;
		if (meta.status === 200) {
			return data;
		} else {
			throw new Error(`Unexpected status code: ${meta.status}`);
		}
	} catch (error) {
		if (error instanceof Error) {
			return error;
		} else {
			return new Error("Unexpected error");
		}
	}
};

export default { handleGetWebInformation };
