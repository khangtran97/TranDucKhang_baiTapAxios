// Lớp đối tượng chứa các phương thức giao tiếp với API
function NhanVienService() {
    //Lay danh sach nguoi dung
    this.layDS = () => {
        var promise = axios({
            method: 'get',
            url: 'https://5fd57dbc66125e0016500534.mockapi.io/NhanVien'
        });

        return promise;
    }

    this.themNV = (nv) => {
        var promise = axios({
            method: 'post',
            url: 'https://5fd57dbc66125e0016500534.mockapi.io/NhanVien',
            data: nv
        });

        return promise;
    }

    this.xoaNV = (id) => {
        var promise = axios({
            method: 'delete',
            url: `https://5fd57dbc66125e0016500534.mockapi.io/NhanVien/${id}`
        });

        return promise;
    }

    this.layChiTiet = (id) => {
        var promise = axios({
            method: 'get',
            url: `https://5fd57dbc66125e0016500534.mockapi.io/NhanVien/${id}`
        });

        return promise;
    }

    this.capNhatNV = (nv,id) => {
        var promise = axios({
            method: 'put',
            url: `https://5fd57dbc66125e0016500534.mockapi.io/NhanVien/${id}`,
            data: nv
        });

        return promise;
    }
}