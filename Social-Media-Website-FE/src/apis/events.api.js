import { api, apiDefault, apiDefaultUpload } from '.'
import { ApiConstants } from '../constants/api.constant'

const eventsApi = () => ({
  getAllEvents: async (params) => api.get(ApiConstants.events.getAllEvents, { params }),
  // getDetaiEvents: async (id) => api.get(`${ApiConstants.events.getDetaiEvents}${id}`),
  getDetaiEvents: async (id) => api.get(`${ApiConstants.events.getDetaiEvents}?eventId=${id}`),
  createEvents: async (eventData) =>
    apiDefaultUpload.post(
      ApiConstants.events.createEvents,
      eventData, // du lieu gui len
    ),
  updateEvents: async (id, eventData) =>
    api.put(`${ApiConstants.events.updateEvents}${id}`, eventData),
  deleteEvents: async (id) => api.delete(`${ApiConstants.events.deleteEvents}?id=${id}`),
})

export const { getAllEvents, createEvents, getDetaiEvents, updateEvents, deleteEvents } =
  eventsApi()
