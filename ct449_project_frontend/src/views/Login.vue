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
                const response = await EmployeeService.login(employeeData.msnv, employeeData.password);
                if (response.success) {
                    alert(response.message);
                    // Lưu token vào LocalStorage
                    localStorage.setItem("authToken", response.token);
                    this.$router.push({ name: "book" });
                } else {
                    alert(response.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
