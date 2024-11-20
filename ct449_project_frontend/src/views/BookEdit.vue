<template>
    <div v-if="book" class="page">
        <h4>Hiệu chỉnh Sách</h4>
        <BookForm :book="book" @submit:book="updateBook" @delete:book="deleteBook" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";  // Service cho sách, cần tạo service tương ứng
import PublisherService from "@/services/publisher.service";
export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await BookService.get(id);
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
        async updateBook(data) {
            try {
                const response = await PublisherService.checkManxb(data.manxb);
                if (!response.exists) {
                    alert("Nhà xuất bản không tồn tại.");
                    return;
                }
                await BookService.update(this.book._id, data);
                alert('Sách được cập nhật thành công.');
                this.$router.push({ name: "book" });  // Điều hướng đến trang danh sách sách
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa Sách này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$router.push({ name: "book" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>
