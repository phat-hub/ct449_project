<template>
    <Form @submit="submitPublisher" :validation-schema="publisherFormSchema">
        <div class="form-group">
            <label for="manxb">Mã nhà xuất bản</label>

            <Field name="manxb" type="text" class="form-control" v-model="publisherLocal.manxb" :disabled="publisherLocal._id !== undefined"/>

            <ErrorMessage name="manxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="tennxb">Tên nhà xuất bản</label>

            <Field name="tennxb" type="text" class="form-control" v-model="publisherLocal.tennxb" />

            <ErrorMessage name="tennxb" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>

            <Field name="diachi" type="text" class="form-control" v-model="publisherLocal.diachi" />

            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary"><i class="fas fa-save"></i> Lưu</button>
            <button v-if="publisherLocal._id" type="button" class="btn btn-danger" style="margin-left: 8px;"
            @click="deletePublisher">
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
    emits: ["submit:publisher", "delete:publisher"],
    props: {
        publisher: { type: Object, required: true }
    },
    data() {
        const publisherFormSchema = yup.object().shape({
            manxb: yup
                .string()
                .required("Mã nhà xuất bản là bắt buộc.")
                .min(6, "Mã nhà xuất bản phải ít nhất 6 ký tự.")
                .matches(/^NXB\d{3}$/, "Mã nhà xuất bản phải theo định dạng NXBxxx.")
                .max(6, "Mã nhà xuất bản tối đa 6 ký tự."),
            tennxb: yup
                .string()
                .required("Tên nhà xuất bản là bắt buộc.")
                .min(2, "Tên nhà xuất bản phải ít nhất 2 ký tự.")
                .max(100, "Tên nhà xuất bản tối đa 100 ký tự."),
            diachi: yup
                .string()
                .required("Địa chỉ nhà xuất bản là bắt buộc.")
                .max(255, "Địa chỉ tối đa 255 ký tự."),
        });
        return {
            // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
            // publisherLocal để liên kết với các input trên form
            publisherLocal: this.publisher,
            publisherFormSchema,
        };
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.publisherLocal);
        },
        deletePublisher() {
            this.$emit("delete:publisher", this.publisherLocal.id);
        },
        Cancel() {
            const reply = window.confirm('Bạn có thay đổi chưa lưu! Bạn có muốn rời khỏi trang không?')

            if (!reply) {
                // stay on the page if user clicks 'Cancel'
                return false
            } else {
                this.$router.push({ name: "publisher" });
            }
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
