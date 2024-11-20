<template>
    <div class="page">
        <h4>Thêm mới Sách</h4>
        <BookForm 
            :book="newBook" 
            @submit:book="addBook" 
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import BookService from "@/services/book.service";  // Service cho sách, cần tạo service tương ứng

export default {
    components: {
        BookForm,
    },
    data() {
        return {
            newBook: {  // Khởi tạo đối tượng sách mới
                masach: "",
                tensach: "",
                dongia: "",
                soquyen: "",
                namxuatban: "",
                manxb: "",
                tacgia: "",
            },
            message: "",
        };
    },
    methods: {
        async addBook(bookData) {
            try {
                // Kiểm tra mã sách
                const response = await BookService.checkMasach(bookData.masach);
                if (response.exists) {
                    alert("Mã sách đã tồn tại.");
                    return;
                }
                await BookService.create(bookData); 
                alert("Sách được thêm thành công.");
                this.$router.push({ name: "book" });  // Chuyển hướng về trang danh sách sách
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
