<template>
    <div class="page row">
        <!-- Ô tìm kiếm sách -->
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách Sách
                <i class="fas fa-book"></i>
            </h4>
            
            <!-- Hiển thị danh sách sách -->
            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có sách nào.</p>
            
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddBook">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllBooks"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activeBook">
                <h4>
                    Chi tiết Sách
                    <i class="fas fa-address-card"></i>
                </h4>
                <BookCard :book="activeBook" />
                <router-link
                    :to="{
                        name: 'book.edit',
                        params: { id: activeBook._id },
                    }"
                    >
                    <button class="mt-2 btn btn-warning btn-sm">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BookCard from "@/components/BookCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import BookList from "@/components/BookList.vue";
import BookService from "@/services/book.service";

export default {
    components: {
        BookCard,
        InputSearch,
        BookList,
    },
    data() {
        return {
            books: [],  // Dữ liệu sách
            activeIndex: -1,
            searchText: "",  // Từ khóa tìm kiếm
        };
    },
    watch: {
        // Khi thay đổi từ khóa tìm kiếm, bỏ chọn sách đang được chọn
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng sách thành chuỗi để tìm kiếm dễ dàng
        bookStrings() {
            return this.books.map((book) => {
                const { tensach, tacgia, manxb, masach, namxuatban } = book;
                return [tensach, tacgia, manxb, masach, namxuatban].join("");
            });
        },
        // Lọc sách theo từ khóa tìm kiếm
        filteredBooks() {
            if (!this.searchText) return this.books;
            return this.books.filter((_book, index) =>
                this.bookStrings[index].includes(this.searchText)
            );
        },
        activeBook() {
            if (this.activeIndex < 0) return null;
            return this.filteredBooks[this.activeIndex];
        },
        filteredBooksCount() {
            return this.filteredBooks.length;
        },
    },
    methods: {
        // Lấy tất cả danh sách sách
        async retrieveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        // Làm mới danh sách sách
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        // Xóa tất cả sách
        async removeAllBooks() {
            if (confirm("Bạn muốn xóa tất cả Sách?")) {
                try {
                    await BookService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Chuyển đến trang thêm sách mới
        goToAddBook() {
            this.$router.push({ name: "book.add" });
        },
    },
    mounted() {
        // Lấy danh sách sách khi trang được tải
        this.refreshList();
    },
};
</script>

<style scoped>
    .page {
        text-align: left;
        max-width: 750px;
    }
</style>
