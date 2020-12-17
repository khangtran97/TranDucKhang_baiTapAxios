//Khai bao the hien cua lop doi tuong (class)
var nvService = new NhanVienService();
var dsnv = [];
var validation = new Validation();
var id = -1;

function getELE(id) {
    return document.getElementById(id);
}

layDSNV();
//Ham lay danh sach
function layDSNV() {
    var promise = nvService.layDS();
    promise.then((result) => {
        var mangNV = result.data;
        //Neu thanh cong
        mangNV.map((item) => {
            dsnv.push(item);
        })
        hienThi(mangNV);
    })
        .catch((err) => {
            //Neu that bai
            console.log(err);
        });
    console.log(dsnv);
}

function hienThi(mangDS) {
    var tbody = getELE('tableDanhSach');
    var content = "";

    mangDS.map((item) => {
        content += `
            <tr>
                <td>${item.taiKhoan}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngayLam}</td>
                <td>${item.chucVu}</td>
                <td>${item.tongLuong}</td>
                <td>${item.loaiNV}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaNhanVien('${item.id}')">Xoá</button>
                    <button class="btn btn-info" onclick="suaNV('${item.id}')" data-toggle="modal"
                    data-target="#myModal">Sửa</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = content;
}

getELE('btnThemNV').addEventListener('click', () => {
    themNhanVien(true);
})

//Hàm thêm 
function themNhanVien(isAdd) {
    var taiKhoan = getELE('tknv').value;
    var hoTen = getELE('name').value;
    var matKhau = getELE('password').value;
    var email = getELE('email').value;
    var ngayLam = getELE('datepicker').value;
    var luongCB = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    console.log(taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);
    isValid = true;

    if (isAdd) {
        isValid &= validation.checkEmpty(taiKhoan, getELE("tbTKNV"), "Tài khoản không được để trống!") && validation.checkLength(taiKhoan, getELE("tbTKNV"), "Độ dài 4-6 ký tự!", 4, 6) && validation.checkTaiKhoan(taiKhoan, getELE("tbTKNV"), "Tài khoản không được trùng!", dsnv);
    }

    isValid &= validation.checkEmpty(hoTen, getELE("tbTen"), "Tên không được để trống!") && validation.checkLetters(hoTen, getELE("tbTen"), "Tên chỉ được nhập chữ!");

    isValid &= validation.checkEmpty(email, getELE("tbEmail"), "Email không được để trống!") && validation.checkEmail(email, getELE("tbEmail"), "Email không đúng định dạng!");

    isValid &= validation.checkEmpty(matKhau, getELE("tbMatKhau"), "Mật khẩu không được để trống!") && validation.checkLength(matKhau, getELE("tbMatKhau"), "Mật khẩu phải có độ dài 8-12!", 6, 10) && validation.checkFormatPass(matKhau, getELE("tbMatKhau"), "Mật khẩu không hợp lệ!");

    isValid &= validation.checkDate(ngayLam, getELE("tbNgay"), "Ngày làm không hợp lệ!");

    isValid &= validation.checkEmpty(luongCB, getELE("tbLuongCB"), "Lương cơ bản không được để trống!") && validation.checkNum(luongCB, getELE("tbLuongCB"), "Lương cơ bản từ 1.000.000 - 20.000.000", 1000000, 20000000);

    isValid &= validation.checkDropDown(getELE("chucvu"), getELE("tbChucVu"), "Chức vụ không hợp lệ!");

    isValid &= validation.checkEmpty(gioLam, getELE("tbGiolam"), "Giờ làm không được để trống!") && validation.checkNum(gioLam, getELE("tbGiolam"), "Giờ làm từ 80 - 200 giờ", 80, 200);


    var nv = new NhanVien(taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);

    nv.tinhLuong(parseFloat(luongCB), chucVu);
    nv.xepLoai(gioLam);

    if (isValid) {
        nvService.themNV(nv)
            .then((result) => {
                console.log(result);
                layDSNV();
                getELE('formQLNV').reset();
                document.getElementById('btnDong').click();
            })
            .catch((err) => {
                //Neu that bai
                console.log(err);
            });
    }
}

function xoaNhanVien(id) {
    nvService.xoaNV(id)
        .then((result) => {
            layDSNV();
        })
        .catch((err) => {
            console.log(err);
        });
}

function resetForm() {
    getELE('tknv').removeAttribute("disabled");
    getELE('formQLNV').reset();
}

function clearAllValidation() {
    var thongBao = document.getElementsByClassName('sp-thongbao');
    for(var i =0; i < thongBao.length; i++) {
        thongBao[i].innerHTML = "";
    }
}

function suaNV(id) {
    var modalHeader = document.querySelector('#myModal #header-title');
    modalHeader.innerHTML = "Cập nhật Nhân Viên";
    getELE("tknv").setAttribute("disabled", true);
    clearAllValidation();
    var modalFooter = document.querySelector('#myModal #modal-footer');
    modalFooter.innerHTML = `
        <button id="btnCapNhat" type="button" class="btn btn-success" onclick="capNhat('${id}',${false})">Cập nhật</button>
        <button id="btnDong" type="button" class="btn btn-danger" onclick="resetForm()" data-dismiss="modal">Đóng</button>
    `;

    nvService.layChiTiet(id)
        .then((result) => {
            getELE('tknv').value = result.data.taiKhoan;
            getELE('name').value = result.data.hoTen;
            getELE('password').value = result.data.matKhau;
            getELE('email').value = result.data.email;
            getELE('datepicker').value = result.data.ngayLam;
            getELE('luongCB').value = result.data.luongCB;
            getELE('chucvu').value = result.data.chucVu;
            getELE('gioLam').value = result.data.gioLam;
        }).catch((err) => {
            console.log(err);
        })

}


function capNhat(id, isAdd) {
    var taiKhoan = getELE('tknv').value;
    var hoTen = getELE('name').value;
    var matKhau = getELE('password').value;
    var email = getELE('email').value;
    var ngayLam = getELE('datepicker').value;
    var luongCB = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    var isValid = true;

    if(isAdd) {
        isValid &= validation.checkEmpty(taiKhoan, getELE("tbTKNV"), "Tài khoản không được để trống!") && validation.checkLength(taiKhoan, getELE("tbTKNV"), "Độ dài 4-6 ký tự!", 4, 6) && validation.checkTaiKhoan(taiKhoan, getELE("tbTKNV"), "Tài khoản không được trùng!", dsnv);
    }

    isValid &= validation.checkEmpty(hoTen, getELE("tbTen"), "Tên không được để trống!") && validation.checkLetters(hoTen, getELE("tbTen"), "Tên chỉ được nhập chữ!");

    isValid &= validation.checkEmpty(email, getELE("tbEmail"), "Email không được để trống!") && validation.checkEmail(email, getELE("tbEmail"), "Email không đúng định dạng!");

    isValid &= validation.checkEmpty(matKhau, getELE("tbMatKhau"), "Mật khẩu không được để trống!") && validation.checkLength(matKhau, getELE("tbMatKhau"), "Mật khẩu phải có độ dài 8-12!", 6, 10) && validation.checkFormatPass(matKhau, getELE("tbMatKhau"), "Mật khẩu không hợp lệ!");

    isValid &= validation.checkDate(ngayLam, getELE("tbNgay"), "Ngày làm không hợp lệ!");

    isValid &= validation.checkEmpty(luongCB, getELE("tbLuongCB"), "Lương cơ bản không được để trống!") && validation.checkNum(luongCB, getELE("tbLuongCB"), "Lương cơ bản từ 1.000.000 - 20.000.000", 1000000, 20000000);

    isValid &= validation.checkDropDown(getELE("chucvu"), getELE("tbChucVu"), "Chức vụ không hợp lệ!");

    isValid &= validation.checkEmpty(gioLam, getELE("tbGiolam"), "Giờ làm không được để trống!") && validation.checkNum(gioLam, getELE("tbGiolam"), "Giờ làm từ 80 - 200 giờ", 80, 200);


    var nv = new NhanVien(taiKhoan, hoTen, matKhau, email, ngayLam, luongCB, chucVu, gioLam);

    nv.tinhLuong(parseFloat(luongCB), chucVu);
    nv.xepLoai(gioLam);

    if (isValid) {
        nvService.capNhatNV(nv, id)
            .then((result) => {
                layDSNV();
                document.getElementById('btnDong').click();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

function timKiemNV(dsnv, loaiNV) {
        var mangTK = [];
        dsnv.map(function(item){
            if(item.loaiNV.toLowerCase().indexOf(loaiNV.toLowerCase()) > -1){
                mangTK.push(item);
            }
        });
    
        return mangTK;
}

// getELE("searchName").onkeypress = function(){
//     var loaiNV = getELE("searchName").value;
//     var mangTK = timKiemNV(dsnv, loaiNV);
//     console.log(mangTK);
//     hienThi(mangTK);
// }
getELE("searchName").addEventListener('keypress', () => {
    var loaiNV = getELE("searchName").value;
    var mangTK = timKiemNV(dsnv, loaiNV);
    console.log(mangTK);
    hienThi(mangTK);
})