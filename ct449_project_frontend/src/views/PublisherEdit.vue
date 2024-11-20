<template>
    <div v-if="publisher" class="page">
        <h4>Hiệu chỉnh Nhà Xuất Bản</h4>
        <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher" @delete:publisher="deletePublisher" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import PublisherForm from "@/components/PublisherForm.vue";  // Import PublisherForm tương ứng
import PublisherService from "@/services/publisher.service";  // Service cho nhà xuất bản, cần tạo service tương ứng

export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await PublisherService.get(id);
            } catch (error) {
                console.log(error);
                // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updatePublisher(data) {
            try {
                await PublisherService.update(this.publisher._id, data);
                alert('Nhà xuất bản được cập nhật thành công.');
                this.$router.push({ name: "publisher" });  // Điều hướng đến trang danh sách nhà xuất bản
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher() {
            if (confirm("Bạn muốn xóa Nhà Xuất Bản này?")) {
                try {
                    // Kiểm tra mã nhà xuất bản có tồn tại trong mã sách hay không
                    const result = await PublisherService.checkManxb(this.publisher.manxb);

                    if (result.exists) {
                        alert("Mã nhà xuất bản này không thể xóa vì đang được sử dụng cho các sách.");
                        return;  // Nếu manxb đang được sử dụng, không cho xóa
                    }

                    // Nếu manxb không tồn tại trong mã sách, tiếp tục xóa
                    await PublisherService.delete(this.publisher._id);
                    this.$router.push({ name: "publisher" });  // Điều hướng đến trang danh sách nhà xuất bản
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
};
</script>
