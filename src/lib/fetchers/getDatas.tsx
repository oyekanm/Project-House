import axios from "axios"
import useSWR from "swr"

export const FetchData = (url: string) => {


    const fetcher = async (url: string) => {
        const response = await axios.get(url)
        const resp = await response.data
        return resp
    }

    const { data, error, isLoading } = useSWR(url, fetcher, { refreshInterval: 500,  })

    return { data, error, isLoading }

}