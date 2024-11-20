import createApiClient from "./api.service";
class ReaderService {
    constructor(baseUrl = "/api/readers") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async checkManxb(manxb) {
        return (await this.api.post("/checkManxb", { manxb })).data;
    }
    async checkMadocgia(madocgia) {
        return (await this.api.post("/checkMadocgia", { madocgia })).data;
    }
    async checkDienthoai(dienthoai) {
        return (await this.api.post("/checkDienthoai", { dienthoai })).data;
    }
}
export default new ReaderService();