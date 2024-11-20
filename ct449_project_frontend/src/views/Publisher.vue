<template>
    <div class="page row">
        <!-- Ô tìm kiếm nhà xuất bản -->
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        
        <div class="mt-3 col-md-6">
            <h4>
                Danh sách Nhà xuất bản 
                <i class="fas fa-building"></i>
            </h4>
            
            <!-- Hiển thị danh sách nhà xuất bản -->
            <PublisherList
                v-if="filteredPublishersCount > 0"
                :publishers="filteredPublishers"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có nhà xuất bản nào.</p>
            
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddPublisher">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllPublishers"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>

        <div class="mt-3 col-md-6">
            <div v-if="activePublisher">
                <h4>
                    Chi tiết Nhà xuất bản
                    <i class="fas fa-address-card"></i>
                </h4>
                <PublisherCard :publisher="activePublisher" />
                <router-link
                    :to="{
                        name: 'publisher.edit',
                        params: { id: activePublisher._id },
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
import PublisherCard from "@/components/PublisherCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import PublisherList from "@/components/PublisherList.vue";
import PublisherService from "@/services/publisher.service";

export default {
    components: {
        PublisherCard,
        InputSearch,
        PublisherList,
    },
    data() {
        return {
            publishers: [], // Dữ liệu nhà xuất bản
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
        publisherStrings() {
            return this.publishers.map((publisher) => {
                const { manxb, tennxb, diachi } = publisher;
                return [manxb, tennxb, diachi].join("");
            });
        },
        filteredPublishers() {
            if (!this.searchText) return this.publishers;
            return this.publishers.filter((_publisher, index) =>
                this.publisherStrings[index].includes(this.searchText)
            );
        },
        activePublisher() {
            if (this.activeIndex < 0) return null;
            return this.filteredPublishers[this.activeIndex];
        },
        filteredPublishersCount() {
            return this.filteredPublishers.length;
        },
    },
    methods: {
        async retrievePublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublishers();
            this.activeIndex = -1;
        },
        async removeAllPublishers() {
            if (confirm("Bạn muốn xóa tất cả Nhà xuất bản?")) {
                try {
                    // Kiểm tra tất cả nhà xuất bản có mã nhà xuất bản nào đang được sử dụng trong sách không
                    const usedPublishers = this.publishers.filter(async (publisher) => {
                        const result = await PublisherService.checkManxbInBooks(publisher.manxb);
                        return result.isUsed;
                    });

                    if (usedPublishers.length > 0) {
                        alert("Một số mã nhà xuất bản đang được sử dụng trong sách và không thể xóa.");
                        return; // Nếu có mã nhà xuất bản đang được sử dụng, không cho xóa
                    }
                    await PublisherService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddPublisher() {
            this.$router.push({ name: "publisher.add" });
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
