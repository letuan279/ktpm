CREATE TABLE `KhaiBaoYTe`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idNhanKhau` INT NULL,
    `idCachLy` INT NULL,
    `hanhTrinh` VARCHAR(255) NOT NULL,
    `trieuChung` VARCHAR(255) NOT NULL,
    `doiTuongTiepXuc` VARCHAR(255) NOT NULL
);
CREATE TABLE `TamVang`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soGiayTamVang` CHAR(255) NOT NULL,
    `noiTamTru` CHAR(255) NOT NULL,
    `tuNgay` DATE NOT NULL,
    `denNgay` DATE NOT NULL,
    `idNhauKhau` INT NOT NULL
);
CREATE TABLE `NhanKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `hoTen` VARCHAR(255) NOT NULL,
    `soCMND` CHAR(255) NOT NULL,
    `bietDanh` VARCHAR(255) NOT NULL,
    `gioiTinh` SMALLINT NOT NULL,
    `thuongTru` BIGINT NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `tonGiao` CHAR(255) NOT NULL,
    `idHoKhau` INT NOT NULL,
    `quanHeVoiChuHo` VARCHAR(255) NOT NULL
);
CREATE TABLE `KhaiTu`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soGiayKhaiTu` CHAR(255) NOT NULL,
    `nguoiKhaiTu` VARCHAR(255) NOT NULL,
    `ngayKhaiTu` DATE NOT NULL,
    `nguyenNhan` VARCHAR(255) NOT NULL,
    `idNhauKhauQuaDoi` INT NOT NULL,
    `ngayQuaDoi` DATE NOT NULL
);
CREATE TABLE `HoKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soHoKhau` CHAR(255) NOT NULL,
    `khuVuc` VARCHAR(255) NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `ngayLap` DATE NOT NULL,
    `idChuHo` INT NOT NULL
);
CREATE TABLE `CachLy`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `hinhThuc` SMALLINT NOT NULL,
    `thoiDiem` DATE NOT NULL,
    `mucDoCovid` SMALLINT NOT NULL,
    `trangThaiTest` VARCHAR(255) NOT NULL
);
CREATE TABLE `ThayDoi`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nguoiThayDoi` VARCHAR(255) NOT NULL,
    `thongTinThayDoi` VARCHAR(255) NOT NULL,
    `thayDoiTu` VARCHAR(255) NOT NULL,
    `thayDoiThanh` VARCHAR(255) NOT NULL,
    `ngayThayDoi` DATE NOT NULL,
    `idHoKhau` INT NOT NULL
);
CREATE TABLE `TamTru`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soGiayTamTru` CHAR(255) NOT NULL,
    `lyDo` VARCHAR(255) NOT NULL,
    `thoiGianTamTru` DATE NOT NULL,
    `idNhauKhau` INT NOT NULL
);
ALTER TABLE
    `KhaiBaoYTe` ADD CONSTRAINT `khaibaoyte_idcachly_foreign` FOREIGN KEY(`idCachLy`) REFERENCES `CachLy`(`id`);
ALTER TABLE
    `HoKhau` ADD CONSTRAINT `hokhau_idchuho_foreign` FOREIGN KEY(`idChuHo`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `NhanKhau` ADD CONSTRAINT `nhankhau_idhokhau_foreign` FOREIGN KEY(`idHoKhau`) REFERENCES `HoKhau`(`id`);
ALTER TABLE
    `TamTru` ADD CONSTRAINT `tamtru_idnhaukhau_foreign` FOREIGN KEY(`idNhauKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `KhaiBaoYTe` ADD CONSTRAINT `khaibaoyte_idnhankhau_foreign` FOREIGN KEY(`idNhanKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `ThayDoi` ADD CONSTRAINT `thaydoi_idhokhau_foreign` FOREIGN KEY(`idHoKhau`) REFERENCES `HoKhau`(`id`);
ALTER TABLE
    `TamVang` ADD CONSTRAINT `tamvang_idnhaukhau_foreign` FOREIGN KEY(`idNhauKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `KhaiTu` ADD CONSTRAINT `khaitu_idnhaukhauquadoi_foreign` FOREIGN KEY(`idNhauKhauQuaDoi`) REFERENCES `NhanKhau`(`id`);