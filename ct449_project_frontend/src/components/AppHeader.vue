<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Điều hướng -->
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/publishers">Nhà xuất bản</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/books">Sách</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/readers">Đọc giả</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/follows">Theo dõi mượn sách</router-link>
        </li>
      </ul>

      <!-- Avatar và menu xổ xuống (nếu đã đăng nhập) -->
      <div v-if="isLoggedIn" class="dropdown">
        <img
          src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
          alt="Avatar"
          class="rounded-circle"
          width="40"
          height="40"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <router-link class="dropdown-item" to="#" @click="goToProfile">Thông tin nhân viên</router-link>
          </li>
          <li>
            <router-link class="dropdown-item" to="#" @click="logout">Đăng xuất</router-link>
          </li>
        </ul>
      </div>

      <!-- Nút đăng nhập và đăng ký (nếu chưa đăng nhập) -->
      <div v-else>
        <router-link class="btn btn-outline-light me-2 btn-custom" to="/">Đăng nhập</router-link>
        <router-link class="btn btn-outline-light btn-custom" to="/register">Đăng ký</router-link>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Trạng thái đăng nhập
    };
  },
  methods: {
    checkAuthStatus() {
      // Kiểm tra token trong localStorage
      this.isLoggedIn = !!localStorage.getItem("authToken");
    },
    logout() {
      // Xóa token khỏi localStorage
      localStorage.removeItem("authToken");

      // Hiển thị thông báo đăng xuất thành công (tuỳ chọn)
      alert("Đăng xuất thành công");

      // Cập nhật trạng thái đăng nhập
      this.checkAuthStatus();

      // Chuyển hướng đến trang đăng nhập
      this.$router.push({ name: "login" });
    },
    goToProfile() {
      // Điều hướng đến trang thông tin nhân viên
      this.$router.push({ name: "profile" });
    },
  },
  created() {
    // Kiểm tra trạng thái đăng nhập khi component được tạo
    this.checkAuthStatus();
  },
  watch: {
    // Theo dõi thay đổi của route, cập nhật trạng thái đăng nhập
    $route() {
      this.checkAuthStatus();
    },
  },
};
</script>


<style scoped>
.navbar {
  margin-bottom: 20px;
}

.navbar-nav .nav-link {
  font-size: 18px; 
  margin-right: 20px;
  color: white; 
}

/* Hiệu ứng hover cho các liên kết */
.navbar-nav .nav-link:hover {
  color: #ffcc00; 
}

.dropdown-menu {
  min-width: 200px; /* Đặt chiều rộng menu xổ xuống */
}

.dropdown-item {
  font-size: 16px; /* Chữ lớn cho menu xổ xuống */
}

/* Thêm hiệu ứng hover cho items trong dropdown */
.dropdown-item:hover {
  background-color: #007bff; /* Màu nền xanh khi hover */
  color: white; /* Màu chữ trắng khi hover */
}
.btn-custom {
  width: 120px; /* Đặt chiều rộng cố định */
  text-align: center; /* Căn giữa nội dung */
}
</style>
