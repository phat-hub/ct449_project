import createApiClient from "./api.service";
class BookService {
    constructor(baseUrl = "/api/books") {
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
    async checkMsnv(msnv) {
        return (await this.api.post("/checkMsnv", { msnv })).data;
    }
    async checkSodienthoai(sodienthoai) {
        return (await this.api.post("/checkSodienthoai", { sodienthoai })).data;
    }
}
export default new BookService();