const baseURL = process.env.REACT_APP_BASE_URL;

// AUTHENTICATION API

export const adminLoginAPI = `${baseURL}/api/auth/login`;
export const createAdminAPI = `${baseURL}/api/admin/admin`;
export const clientLoginAPI = `${baseURL}/api/auth/login`;
export const createClientAPI = `${baseURL}/api/admin/client`;
export const resetPasswordAPI = `${baseURL}/api/auth/change-password`;
export const getAllAdminAPI = `${baseURL}/api/admin/admin`;
export const getAllClientAPI = `${baseURL}/api/admin/client`;
export const deleteAdminAPI = `${baseURL}/api/admin/admin`;
export const deleteClientAPI = `${baseURL}/api/admin/client`;
export const forgetPasswordAPI = `${baseURL}/api/auth/reset-password`;
export const getAdminAPI = `${baseURL}/api/admin/admin`;
export const getClientAPI = `${baseURL}/api/admin/client`;
export const updateAdminAPI = `${baseURL}/api/admin/admin`;
export const updateClientAPI = `${baseURL}/api/admin/client`;

// DASHBOARD APIs
export const driversManagmentAPI = `${baseURL}/api/user/driver_management`;
export const occupancyJournalAPI = `${baseURL}/api/user/occupancy_journal`;
export const maintenanceAPI = `${baseURL}/api/user/maintenance_report`;
export const monthlyAvaliablityAPI = `${baseURL}/api/user/monthly_availability_refined`;
export const allTruckAPI = `${baseURL}/api/user/GetClientTrucks`;
export const allCitiyAPI = `${baseURL}/api/user/GetClientCities`;
export const shockSensingTableAPI = `${baseURL}/api/user/shock_sensing_table`;
export const shockSensingBarAPI = `${baseURL}/api/user/shock_sensing`;
export const allCompanyAPI = `${baseURL}/api/user/get_all_companies`;
export const switchCompanyAPI = `${baseURL}/api/user/switch_company`;
export const truckUsageAPI = `${baseURL}/api/user/truck_usage`;
export const exportCSVAPI = `${baseURL}/api/user/export`;
export const generalDashboardAPI = `${baseURL}/api/user/dashboard`;
export const updateWidgetAPI = `${baseURL}/api/user/update_widget`;
export const co2ReductionAPI = `${baseURL}/api/user/co2_reduction`;
export const truckManagementAPI = `${baseURL}/api/user/truck_management`;
export const batteryEnergyAPI = `${baseURL}/api/user/battery_management`;
export const uploadMonthlyAvailabilityAPI = `${baseURL}/api/user/upload_monthly_availability`;
export const uploadBatteryAPI = `${baseURL}/api/user/upload_battery_management`;