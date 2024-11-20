<template>
    <div class="page">
        <h4>Đăng nhập</h4>
        <LoginForm :employee="newEmployee" @submit:employee="login"/>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";  
import EmployeeService from "@/services/employee.service";

export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            newEmployee: {  
                msnv: "",
                password: ""
            },
            message: "",
        };
    },
    methods: {
        async login(employeeData) {
            try {
                const status = await EmployeeService.login(employeeData.msnv, employeeData.password); 
                console.log(status);
                if (status.exists) {
                    alert("Đăng nhập thành công");
                    this.$router.push({ name: "book" }); 
                } else {
                    alert("Tài khoản hoặc mật khẩu không chính xác.");
                }
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
