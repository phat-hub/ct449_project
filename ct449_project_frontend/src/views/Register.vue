<template>
    <div class="page">
        <h4>Đăng ký Nhân viên Mới</h4>
        <RegisterForm :employee="newEmployee" @submit:employee="addEmployee"/>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";  
import EmployeeService from "@/services/employee.service";

export default {
    components: {
        RegisterForm,
    },
    data() {
        return {
            newEmployee: {  
                msnv: "",
                sodienthoai: "",
                chucvu: "",
                diachi: "",
                hotennv: "",
                password: ""
            },
            message: "",
        };
    },
    methods: {
        async addEmployee(employeeData) {
            try {
                const responseMsnv = await EmployeeService.checkMsnv(employeeData.msnv);
                if (responseMsnv.exists) {
                    alert("Mã số nhân viên đã tồn tại.");
                    return;
                }
                const responseSdt = await EmployeeService.checkSodienthoai(employeeData.sodienthoai);
                if (responseSdt.exists) {
                    alert("Số điện thoại đã tồn tại.");
                    return;
                }
                await EmployeeService.create(employeeData); 
                alert("Đăng ký thành công.");
                this.$router.push({ name: "book" }); 
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
