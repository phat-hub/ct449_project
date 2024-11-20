<template>
    <div class="page">
        <h4>Thêm mới Nhà xuất bản</h4>
        <PublisherForm 
            :publisher="newPublisher" 
            @submit:publisher="addPublisher" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service";  // Service cho nhà xuất bản, cần tạo service tương ứng

export default {
    components: {
        PublisherForm,
    },
    data() {
        return {
            newPublisher: {  // Khởi tạo đối tượng nhà xuất bản mới
                manxb: "",
                tennxb: "",
                diachi: "",
            },
            message: "",
        };
    },
    methods: {
        async addPublisher(publisherData) {
            try {
                // Kiểm tra mã nhà xuất bản
                const response = await PublisherService.checkManxb(publisherData.manxb);
                if (response.exists) {
                    alert("Mã nhà xuất bản đã tồn tại.");
                    return;
                }
                await PublisherService.create(publisherData); 
                alert("Nhà xuất bản được thêm thành công.");
                this.$router.push({ name: "publisher" });  // Chuyển hướng về trang danh sách nhà xuất bản
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
