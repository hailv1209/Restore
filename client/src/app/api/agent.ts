import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve,500));

axios.defaults.baseURL = "http://localhost:5228/API/";

const responseBody = (Response: AxiosResponse) => Response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const {data,status} : any = error.response!;
    switch (status) {
      case 400:
        if(data.errors) {
            const modelStateErrors : string[] = [] ;
            for(const key in data.errors) {
                if(data.errors[key]) {
                    modelStateErrors.push(data.errors[key])
                }
            }
                 throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        history.push('/server-error',{error : data}
        );
        // toast.error(data.title);
        break;
      default:
        break;
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get("Products"),
  details: (id: number) => requests.get(`Products/${id}`),
};

const TestErrors = {
  get400Error: () => requests.get("Buggy/bad-request"),
  get401Error: () => requests.get("Buggy/unauthorised"),
  get404Error: () => requests.get("Buggy/not-found"),
  get500Error: () => requests.get("Buggy/server-error"),
  getValidationError: () => requests.get("Buggy/validation-error"),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
