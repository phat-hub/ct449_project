<template>
    <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <div class="form-group">
            <label for="masach">Mã sách</label>
            <Field name="masach" type="text" class="form-control" v-model="bookLocal.masach" :disabled="bookLocal._id !== undefined"/>
            <ErrorMessage name="masach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tensach">Tên sách</label>
            <Field name="tensach" type="text" class="form-control" v-model="bookLocal.tensach" />
            <ErrorMessage name="tensach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="dongia">Đơn giá</label>
            <Field name="dongia" type="number" class="form-control" v-model="bookLocal.dongia" />
            <ErrorMessage name="dongia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="soquyen">Số quyển</label>
            <Field name="soquyen" type="number" class="form-control" v-model="bookLocal.soquyen" />
            <ErrorMessage name="soquyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="namxuatban">Năm xuất bản</label>
            <Field name="namxuatban" type="number" class="form-control" v-model="bookLocal.namxuatban" />
            <ErrorMessage name="namxuatban" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="manxb">Mã nhà xuất bản</label>
            <Field name="manxb" type="text" class="form-control" v-model="bookLocal.manxb" />
            <ErrorMessage name="manxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tacgia">Tác giả</label>
            <Field name="tacgia" type="text" class="form-control" v-model="bookLocal.tacgia" />
            <ErrorMessage name="tacgia" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
            <button v-if="bookLocal._id" type="button" class="btn btn-danger" style="margin-left: 8px;" @click="deleteBook">
                <i class="fas fa-trash-alt"></i> Xóa
            </button>
            <button type="button" class="btn btn-danger" style="margin-left: 8px;" @click="Cancel">
                <i class="fas fa-times"></i> Thoát
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:book", "delete:book"],
    props: {
        book: { type: Object, required: true }
    },
    data() {
        const bookFormSchema = yup.object().shape({
            masach: yup
                .string()
                .required("Mã sách là bắt buộc.")
                .matches(/^S\d{3}$/, "Mã sách phải theo định dạng Sxxx, với x là chữ số.")
                .min(2, "Mã sách phải ít nhất 4 ký tự.")
                .max(4, "Mã sách có nhiều nhất 4 ký tự."),
            tensach: yup
                .string()
                .required("Tên sách là bắt buộc.")
                .min(2, "Tên sách phải ít nhất 2 ký tự.")
                .max(100, "Tên sách có nhiều nhất 100 ký tự."),
            dongia: yup
                .number()
                .transform(value => (isNaN(value) ? 0 : Number(value)))  // Nếu giá trị không hợp lệ, chuyển thành 0
                .required("Đơn giá là bắt buộc.")
                .positive("Đơn giá phải là một số dương."),
            soquyen: yup
                .number()
                .transform(value => (isNaN(value) ? 0 : Number(value)))  // Nếu giá trị không hợp lệ, chuyển thành 0
                .required("Số quyển là bắt buộc.")
                .positive("Số quyển phải là một số dương."),
            namxuatban: yup
                .number()
                .transform(value => (isNaN(value) ? 0 : Number(value)))  // Nếu giá trị không hợp lệ, chuyển thành 0
                .required("Năm xuất bản là bắt buộc.")
                .min(1900, "Năm xuất bản không hợp lệ.")
                .max(new Date().getFullYear(), "Năm xuất bản không thể lớn hơn năm hiện tại."),
            manxb: yup
                .string()
                .required("Mã nhà xuất bản là bắt buộc."),
            tacgia: yup
                .string()
                .required("Tác giả là bắt buộc.")
                .min(2, "Tên tác giả phải ít nhất 2 ký tự.")
                .max(100, "Tên tác giả có nhiều nhất 100 ký tự."),
        });

        return {
            bookLocal: this.book,
            bookFormSchema,
        };
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.bookLocal);
        },
        deleteBook() {
            this.$emit("delete:book", this.bookLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn có thay đổi chưa lưu. Bạn có muốn rời khỏi trang?')

            if (!reply) {
                // Stay on the page if user clicks 'Cancel'
                return false;
            } else {
                this.$router.push({ name: "booklist" });
            }
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
