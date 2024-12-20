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
    async checkMasach(masach) {
        return (await this.api.post("/checkMasach", { masach })).data;
    }
    async checkManxb(manxb) {
        return (await this.api.post("/checkManxb", { manxb })).data; // Gọi API từ backend
    }
}
export default new BookService();