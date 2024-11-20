<script>
export default {
    props: {
        publisher: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã nhà xuất bản:</strong>
            {{ publisher.manxb }}
        </div>
        <div class="p-1">
            <strong>Tên nhà xuất bản:</strong>
            {{ publisher.tennxb }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ publisher.diachi }}
        </div>
    </div>
</template>