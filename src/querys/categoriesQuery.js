import {axiosClient} from '../utils/Axios'

const getCategories = async() => {
    const response = await axiosClient.get('/category');
    const cat = await response.data.categories;
    return cat;
}


export {getCategories}