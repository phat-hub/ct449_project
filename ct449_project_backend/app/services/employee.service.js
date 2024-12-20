const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
class EmployeeService {
    constructor(client) {
        this.Employee = client.db().collection("Employees");
    }

    // Định nghĩa phương thức truy xuất dữ liệu từ payload
    extractEmployeeData(payload) {
        const employee = {
            msnv: payload.msnv,
            hotennv: payload.hotennv,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai
        };

        // Xóa các trường undefined
        Object.keys(employee).forEach(
            (key) => employee[key] === undefined && delete employee[key]
        );
        return employee;
    }

    async create(payload) {
        const employee = this.extractEmployeeData(payload);
        const existingEmployee = await this.Employee.findOne({
            $or: [
                { msnv: employee.msnv },
                { sodienthoai: employee.sodienthoai }
            ]
        });

        if (existingEmployee) {
            if (existingEmployee.msnv === employee.msnv) {
                throw new Error("Mã nhân viên đã tồn tại");
            }
            if (existingEmployee.sodienthoai === employee.sodienthoai) {
                throw new Error("Số điện thoại đã tồn tại");
            }
        }
        const result = await this.Employee.findOneAndUpdate(
            employee,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async findById(id) {
        return await this.Employee.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async findByMsnv(msnv) {
        return await this.Employee.findOne({
            msnv: { $regex: new RegExp(`^${msnv}$`, 'i') } // Tìm msnv không phân biệt hoa thường
        });
    }


    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractEmployeeData(payload);
        // Kiểm tra nếu số điện thoại đã tồn tại trong CSDL và không phải của nhân viên hiện tại
        if (update.sodienthoai) {
            const existingEmployee = await this.Employee.findOne({
                sodienthoai: update.sodienthoai,
                _id: { $ne: filter._id } // Loại trừ nhân viên hiện tại
            });

            if (existingEmployee) {
                throw new Error("Số điện thoại đã được sử dụng bởi nhân viên khác");
            }
        }

        const result = await this.Employee.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async login(msnv, password) {
        const employee = await this.findByMsnv(msnv);
        if (employee && employee.password === password) {
            // Tạo token với payload là thông tin của employee
            const token = jwt.sign({ msnv: employee.msnv }, "SECRET_KEY", { expiresIn: "1h" });
            return { token }; // Trả về token
        } else {
            return null;
        }
    }

    async checkMsnv(msnv) {
        const employee = await this.Employee.findOne({
            msnv: new RegExp('^' + msnv + '$', 'i') // 'i' cho phép tìm kiếm không phân biệt hoa thường
        });
        return employee ? true : false;
    }

    async checkSodienthoai(sodienthoai) {
        const employee = await this.Employee.findOne({ sodienthoai });
        return employee ? true : false;
    }
}

module.exports = EmployeeService;
