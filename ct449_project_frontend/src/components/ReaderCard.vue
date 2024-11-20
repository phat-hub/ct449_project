<script>
export default {
    props: {
        reader: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Mã độc giả:</strong>
            {{ reader.madocgia }}
        </div>
        <div class="p-1">
            <strong>Họ và tên:</strong>
            {{ reader.holot }} {{ reader.ten }}
        </div>
        <div class="p-1">
            <strong>Ngày sinh:</strong>
            {{ reader.ngaysinh }}
        </div>
        <div class="p-1">
            <strong>Giới tính:</strong>
            {{ reader.phai }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ reader.diachi }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ reader.dienthoai }}
        </div>
    </div>
</template>
