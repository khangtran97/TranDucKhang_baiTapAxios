// function NguoiDung(_taiKhoan,_hoTen,_matKhau,_email,_soDT,_maLoaiNguoiDung) {
//     this.taiKhoan = _taiKhoan;
//     this.hoTen = _hoTen;
//     this.matKhau = _matKhau;
//     this.email = _email;
//     this.soDT = _soDT;
//     this.maLoaiNguoiDung = _maLoaiNguoiDung;
// }
function NhanVien(_taiKhoan,_hoTen,_matKhau,_email,_ngayLam,_luongCB,_chucVu,_gioLam,_tongLuong,_loaiNV) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.matKhau = _matKhau;
    this.email = _email;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = _tongLuong;
    this.loaiNV = _loaiNV;

    this.tinhLuong = (luongCB, chucVu) => {
        switch(chucVu) {
            case 'Giám đốc':
                this.tongLuong = luongCB * 3;
                break;
            case 'Trưởng phòng':
                this.tongLuong = luongCB * 2;
                break;
            case 'Nhân viên':
                this.tongLuong = luongCB * 1;
                break;
            default:
                this.tongLuong = 1;
                break;
        }
    }

    this.xepLoai = (gioLam) => {
        if(gioLam >= 192) {
            this.loaiNV = 'Xuất sắc';
        } else if(gioLam >= 176 && gioLam < 192) {
            this.loaiNV = 'Giỏi';
        } else if(gioLam >=160 && gioLam < 176) {
            this.loaiNV = 'Khá';
        } else {
            this.loaiNV = 'Trung bình';
        }
    }
}