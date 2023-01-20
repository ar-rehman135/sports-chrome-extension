import axios from "axios";
import { API_FETCH_CONTACTS, API_BASE_URL } from "../constants/api";

const api = {
  getContacts: async (userId: any): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/${API_FETCH_CONTACTS(userId)}`)
      .then((response: any) => response.data.data);
  },

  getContact: async (id: string | undefined): Promise<any> => {
    return axios
      .get(`${API_BASE_URL}/contacts/${id}`)
      .then((response: any) => response.data.data.Item);
  },

  editContact: async (contactData: any, id: any) => {
    const payload = {
      firstName: contactData.fullName.split(" ")[0],
      lastName: contactData.fullName.split(" ")[1],
      email: [
        {
          address: contactData.email,
          type: "personal",
        },
      ],
      phone: [
        {
          number: contactData && contactData.phone ? contactData.phone : "",
          type: "mobile",
        },
      ],
      ...(contactData.jobTitle && { jobTitle: contactData.jobTitle }),
      ...(contactData.groups && { groups: contactData.groups }),
      ...(contactData.companies && { companies: contactData.companies }),
      ...(contactData.dob && { dob: contactData.dob }),
      ...(contactData.appId && { appId: contactData.appId }),
    };
    return await axios
      .put(`${API_BASE_URL}/contacts/${id}`, payload)
      .then((response) => response.data);
  },

  createContact: async (contactData: any, userId: any) => {
    // Todo (israel-almeida): Need to add address field here.
    // Please follow address specification on API Docs for
    // Create Contact.
    const phone = [];
    if (contactData && contactData.phone) {
      phone.push([
        {
          number: contactData && contactData.phone ? contactData.phone : "",
          type: "mobile",
        },
      ]);
    }

    const payload = {
      firstName: contactData.first_name,
      lastName: contactData.last_name,
      email: [
        {
          address: contactData.email,
          type: "personal",
        },
      ],
      phone: phone,
      ...(contactData.jobTitle && { jobTitle: contactData.jobTitle }),
      ...(contactData.groups && { groups: contactData.groups }),
      ...(contactData.companies && { companies: contactData.companies }),
      ...(contactData.dob && { dob: contactData.dob }),
      ...(contactData.importSource && {
        importSource: contactData.importSource,
      }),
      ...(contactData.appId && { appId: contactData.appId }),
    };
    return await axios
      .post(`${API_BASE_URL}/contacts/${userId}`, payload)
      .then((response) => response.data);
  },

  createContactBulk: async (contactData: any) => {
    return axios
      .post(`${API_BASE_URL}/contacts/import`, contactData)
      .then((response) => response);
  },

  deleteContact: async (id: string | undefined): Promise<any> => {
    return axios
      .delete(`${API_BASE_URL}/contacts/${id}`)
      .then((response: any) => response.data)
      .catch((e) => ({ error: e.message }));
  },

  //   Need to modify
  deleteMultipleContacts: async (id: string[] | undefined): Promise<any> => {
    return axios
      .get(`${API_BASE_URL}/contacts/${id}`)
      .then((response: any) => response.data.data.Item);
  },
};

export default api;
