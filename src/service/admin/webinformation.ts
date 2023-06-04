import { WebInformation } from "@api";


interface contentProps {
	name: string,
	language: string,
	content: string,
	description: string
}

interface createWebInformationBody {
	key: string;
	value: string;
	description: string;
}
type metaProps = {
	message: string;
	status: number;
};

type ResponseData = {
	data: any;
	meta: metaProps;
};

const handleCreateWebInformation = async (body: createWebInformationBody): Promise<ResponseData | Error> => {
	try {
		const response = await WebInformation.createWebInformation(body);
		const { data, meta } = response.data;
		if (meta.status === 200) {
			const resData: ResponseData = { meta: meta, data: data };
			return resData;
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

export default { handleCreateWebInformation };
