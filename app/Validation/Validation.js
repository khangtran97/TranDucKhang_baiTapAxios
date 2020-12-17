function Validation() {
    this.checkEmpty = (inputVal, spanELE, message) => {
        if (inputVal.trim() === "") {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        } else {
            spanELE.innerHTML = "";
            return true;
        }
    }
    this.checkTaiKhoan = (inputVal, spanELE, message, mangNV) => {
        var isExist = false;

        //item dai dien cho 1 sinh vien
        isExist = mangNV.some((item, index) => {
            return inputVal.trim() === item.taiKhoan;
        });

        //neu ma bi trung
        if (isExist) {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            //du lieu nhap vao khong hop le
            return false;
        } else {
            spanELE.innerHTML = "";
            return true;
        }
    }
    this.checkLetters = (inputVal, spanELE, message) => {
        //Doi tuong tao san cua JS giup chuyen tu kieu chuoi(string) sang kieu RegExp
        var letters = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if (letters.test(inputVal)) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkEmail = (inputVal, spanELE, message) => {
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        //match: ham co san cua string giup so sanh string vaf bieu thuc
        if (inputVal.match(emailPattern)) {
            //hop le
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkLength = (inputVal, spanELE, message, min, max) => {
        if (inputVal.length >= min && inputVal.length <= max) {
            //hop le
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkFormatPass = (inputVal, spanELE, message) => {
        var formatPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (inputVal.match(formatPass)) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkDate = (inputVal, spanELE, message) => {
        var datePattern = /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/;
        if (inputVal.match(datePattern)) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkDropDown = (selectELE, spanELE, message) => {
        if (selectELE.selectedIndex != 0) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
    this.checkNum = (inputVal, spanELE, message, min, max) => {
        if (inputVal >= min && inputVal <= max) {
            spanELE.innerHTML = "";
            return true;
        } else {
            spanELE.style.display = "block";
            spanELE.innerHTML = message;
            return false;
        }
    }
}