export const services = {
    baseUrl: 'http://localhost:3000',
    projectList: '/nodebackend/project/get',
    reqList: '/nodebackend/reqtype/get',
    historyList: '/nodebackend/request/get',
    roles: '/nodebackend/role/get',
    createRequest: '/nodebackend/request/post',
    updateRequest: '/nodebackend/request/put',
    categoryList: '/nodebackend/req-cat-map/req-wise-cat',
    login: '/nodebackend/user/login',
    signUp: '/nodebackend/user/signup',
    subscribe: '/nodebackend/subscribe/post',
    getById: '/nodebackend/request/getById',
    submitComment: '/nodebackend/tour/post',
    getTour: '/nodebackend/tour/getWeeklyTours',
    getTraining: '/nodebackend/training/get',
    getEquipments: '/nodebackend/equipment/get',
    getActions: '/nodebackend/action/get',
    getSeverity: '/nodebackend/severity/get',
    submitIncident: '/nodebackend/incident/post',
    getIncident: '/nodebackend/incident/get',
    monthWise: '/nodebackend/incident/monthlyCount',
    getStatus: '/nodebackend/status/get',
    getLearning: '/nodebackend/user/training/get',
    getContactUser: '/nodebackend/incident/contactUsers',
    getUsersList: '/nodebackend/user/list',
    changeTrainingStatus: '/nodebackend/user/training/updateStatus',
    tourDelete: '/nodebackend/tour/delete'
}