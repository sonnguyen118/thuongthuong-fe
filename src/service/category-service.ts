import { GET_CATEGORIES_ENDPOINT } from "@api/endpoint"
import axios from "axios"

const getCategories = async (language: string) => {
    console.log('language: ', language)
    const res = await axios.post(GET_CATEGORIES_ENDPOINT, {
      language: language
    })
  }