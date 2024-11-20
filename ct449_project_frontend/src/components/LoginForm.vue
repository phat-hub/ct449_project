<template>
    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="msnv">Mã số nhân viên</label>
            <Field name="msnv" type="text" class="form-control" v-model="employee.msnv" />
            <ErrorMessage name="msnv" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu</label>
            <Field name="password" type="password" class="form-control" v-model="employee.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">
                Đăng nhập
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
                password: yup
                    .string()
                    .required("Mật khẩu không được để trống.")
                    .min(8, "Mật khẩu phải có ít nhất 8 ký tự."),
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
