<template>
    <div class="page row">
        <!-- Ô tìm kiếm độc giả -->
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách Độc giả 
                <i class="fas fa-users"></i>
            </h4>
            
            <!-- Hiển thị danh sách độc giả -->
            <ReaderList
                v-if="filteredReadersCount > 0"
                :readers="filteredReaders"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có đọc giả nào.</p>
            
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddReader">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllReaders"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activeReader">
                <h4>
                    Chi tiết Đọc giả
                    <i class="fas fa-address-card"></i>
                </h4>
                <ReaderCard :reader="activeReader" />
                <!-- <router-link
                    :to="{
                        name: 'reader.edit',
                        params: { id: activeReader.madocgia },
                    }"
                >
                    <button class="mt-2 btn btn-warning btn-sm">
                        <i class="fas fa-edit"></i> Hiệu chỉnh
                    </button>
                </router-link> -->
            </div>
        </div>
    </div>
</template>

<script>
import ReaderCard from "@/components/ReaderCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ReaderList from "@/components/ReaderList.vue";
import ReaderService from "@/services/reader.service";

export default {
    components: {
        ReaderCard,
        InputSearch,
        ReaderList,
    },
    data() {
        return {
            readers: [], // Dữ liệu độc giả
            activeIndex: -1,
            searchText: "", // Từ khóa tìm kiếm
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        readerStrings() {
            return this.readers.map((reader) => {
                const { madocgia, holot, ten, diachi } = reader;
                return [madocgia, holot, ten, diachi].join("");
            });
        },
        filteredReaders() {
            if (!this.searchText) return this.readers;
            return this.readers.filter((_reader, index) =>
                this.readerStrings[index].includes(this.searchText)
            );
        },
        activeReader() {
            if (this.activeIndex < 0) return null;
            return this.filteredReaders[this.activeIndex];
        },
        filteredReadersCount() {
            return this.filteredReaders.length;
        },
    },
    methods: {
        async retrieveReaders() {
            try {
                this.readers = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveReaders();
            this.activeIndex = -1;
        },
        async removeAllReaders() {
            if (confirm("Bạn muốn xóa tất cả Độc giả?")) {
                try {
                    // const readersWithLoans = this.readers.filter(async (reader) => {
                    //     const result = await ReaderService.checkReaderHasLoans(reader.madocgia);
                    //     return result.hasLoans;
                    // });

                    // if (readersWithLoans.length > 0) {
                    //     alert("Một số độc giả đang mượn sách và không thể xóa.");
                    //     return; 
                    // }
                    await ReaderService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddReader() {
            this.$router.push({ name: "reader.add" });
        },
    },
    mounted() {
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
