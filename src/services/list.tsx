import apiManager from '../utils/apiManager';
import { ListCategoryInterface } from './interface/listCategoryInterface';
import { ListDetailCategoryInterface } from './interface/listDetailCategoryInterface';

const getListCategory = async () : Promise<ListCategoryInterface> => {
    try {
      const listCategory : ListCategoryInterface = await apiManager.get('categories');
      return listCategory;
    } catch (error) {
      console.error('Error getting category:', error);
      throw error;
    }
};

const getListDetailCategory = async ( category: String, count: Number ) : Promise<ListDetailCategoryInterface> => {
  try {
    const detailListCategory : ListDetailCategoryInterface = await apiManager.get(`joke/${category}?type=single&amount=${count}`);
    return detailListCategory;
  } catch (error) {
    console.error('Error getting detail category:', error);
    throw error;
  }
};

const ListServices = {getListCategory, getListDetailCategory};

export default ListServices;
