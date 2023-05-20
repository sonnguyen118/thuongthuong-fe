interface EnvInterface {
  base_api_url: string;
  base_url: string;
  base_full_url: string;
}

const env: EnvInterface = {
  base_api_url: process.env.NEXT_PUBLIC_API_URL || "",
  base_url: process.env.NEXT_PUBLIC_BASE_URL || "",
  base_full_url: process.env.NEXT_PUBLIC_FULL_URL || "",
};

export default env;
