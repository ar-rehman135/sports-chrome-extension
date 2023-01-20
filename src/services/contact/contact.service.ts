import { API_FETCH_CONTACTS } from '../../constants/api';
import { getErrorMessage } from '../utils';
import { getRequest } from '../utils';

export const getContactsData = async (userId: any): Promise<any> => {
  try {
    const response = await getRequest(`${API_FETCH_CONTACTS(userId)}`);
    return response?.data.data;
  } catch (e: any) {
    throw new Error(getErrorMessage(e));
  }
};