import createApiClient from "./api.service";
class EmployeeService {
    constructor(baseUrl = "/api/employees") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/register", data)).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async login(msnv, password) {
        return (await this.api.post("/login", { msnv, password })).data;
    }
    // Kiểm tra số điện thoại
    async checkSodienthoai(sodienthoai) {
        return (await this.api.post("/checkSodienthoai", { sodienthoai })).data;
    }

    // Kiểm tra mã số nhân viên
    async checkMsnv(msnv) {
        return (await this.api.post("/checkMsnv", { msnv })).data;
    }
}
export default new EmployeeService();