<template>
    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="msnv">Mã số nhân viên</label>
            <Field name="msnv" type="text" class="form-control" v-model="employee.msnv" />
            <ErrorMessage name="msnv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="hotennv">Họ tên</label>
            <Field name="hotennv" type="text" class="form-control" v-model="employee.hotennv" />
            <ErrorMessage name="hotennv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="employee.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="confirmPassword">Nhập lại mật khẩu</label>
            <Field name="confirmPassword" type="password" class="form-control" v-model="employee.confirmPassword" />
            <ErrorMessage name="confirmPassword" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="chucvu">Chức vụ</label>
            <Field name="chucvu" type="text" class="form-control" v-model="employee.chucvu" />
            <ErrorMessage name="chucvu" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="sodienthoai">Số điện thoại</label>
            <Field name="sodienthoai" type="text" class="form-control" v-model="employee.sodienthoai" />
            <ErrorMessage name="sodienthoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="diachi">Địa chỉ</label>
            <Field name="diachi" type="text" class="form-control" v-model="employee.diachi" />
            <ErrorMessage name="diachi" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                Đăng ký
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
    emits: ["submit:employee"],
    props: {
        employee: { type: Object, required: true }
    },
    data() {
        const employeeFormSchema = yup.object().shape({
                msnv: yup
                    .string()
                    .required("Mã số nhân viên không được để trống.")
                    .min(5, "Mã số nhân viên ít nhất 5 ký tự.")
                    .max(6, "Mã số nhân viên tối đa 6 ký tự.")
                    .matches(/^NV\d{3}$/, "Mã số nhân viên phải theo định dạng NVxxx, trong đó xxx là 3 chữ số."),
                hotennv: yup
                    .string()
                    .required("Họ tên không được để trống."),
                password: yup
                    .string()
                    .required("Mật khẩu không được để trống.")
                    .min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
                confirmPassword: yup
                    .string()
                    .required("Mật khẩu xác nhận không khớp.")
                    .oneOf([yup.ref('password'), null], "Mật khẩu xác nhận không khớp."),
                chucvu: yup
                    .string()
                    .required("Chức vụ không được để trống."),
                sodienthoai: yup
                    .string()
                    .required("Số điện thoại không được để trống.")
                    .matches(/^(03|05|07|08|09|04)\d{8}$/, "Số điện thoại phải đúng định dạng số Việt Nam và có 10 chữ số."),
                diachi: yup
                    .string()
                    .required("Địa chỉ không được để trống."),
            });

            return {
                employeeLocal: this.employee,
                employeeFormSchema,
            };
        },
    methods: {
        async submitEmployee() {
           this.$emit("submit:employee", this.employeeLocal);
        }
    }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
