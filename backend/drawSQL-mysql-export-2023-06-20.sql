CREATE TABLE `KhaiBaoYTe`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idNhanKhau` INT UNSIGNED NOT NULL,
    `hanhTrinh` VARCHAR(255) NOT NULL,
    `trieuChung` VARCHAR(255) NOT NULL,
    `ngayKhaiBao` DATE NOT NULL,
    `doiTuongTiepXuc` VARCHAR(255) NOT NULL
);
CREATE TABLE `TamVang`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soGiayTamVang` CHAR(255) NOT NULL,
    `noiTamTru` CHAR(255) NOT NULL,
    `tuNgay` DATE NOT NULL,
    `denNgay` DATE NOT NULL,
    `idNhanKhau` INT UNSIGNED NOT NULL
);
CREATE TABLE `NhanKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `hoTen` VARCHAR(255) NOT NULL,
    `soCMND` CHAR(255) UNIQUE NULL,
    `bietDanh` VARCHAR(255) NOT NULL,
    `gioiTinh` SMALLINT NOT NULL,
    `thuongTru` VARCHAR(255) NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `tonGiao` CHAR(255) NOT NULL,
    `idHoKhau` INT UNSIGNED NOT NULL,
    `ngheNghiep` VARCHAR(255) NOT NULL,
    `trangThai` VARCHAR(255) NOT NULL
);
CREATE TABLE `ThayDoiNhanKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `ngayChuyen` DATE NOT NULL,
    `noiChuyen` VARCHAR(255) NOT NULL,
    `ghiChu` VARCHAR(255) NOT NULL,
    `idNhanKhau` INT UNSIGNED NOT NULL
);
CREATE TABLE `HoKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soHoKhau` CHAR(255) NOT NULL,
    `khuVuc` VARCHAR(255) NOT NULL,
    `diaChi` VARCHAR(255) NOT NULL,
    `ngayLap` DATE NOT NULL,
    `idChuHo` INT UNSIGNED NOT NULL
);
CREATE TABLE `CachLy`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idNhanKhau` INT UNSIGNED NOT NULL,
    `hinhThucTest` CHAR(100) NOT NULL,
    `thoiDiem` DATE NOT NULL,
    `mucDoCovid` CHAR(10) NOT NULL,
    `trangThaiTest` VARCHAR(255) NOT NULL
);

CREATE TABLE `ThayDoiHoKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `thongTinThayDoi` VARCHAR(255) NOT NULL,
    `thayDoiTu` VARCHAR(255) NOT NULL,
    `thayDoiThanh` VARCHAR(255) NOT NULL,
    `ngayThayDoi` DATE NOT NULL,
    `idHoKhau` INT UNSIGNED NOT NULL
);

CREATE TABLE `TamTru`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `soGiayTamTru` CHAR(255) NOT NULL,
    `lyDo` VARCHAR(255) NOT NULL,
    `thoiGianTamTru` DATE NOT NULL,
    `HoTen` VARCHAR(255) NOT NULL,
    `soCMND` VARCHAR(255) UNIQUE NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `gioiTinh` SMALLINT NOT NULL,
    `ngheNghiep` VARCHAR(255) NOT NULL
);

ALTER TABLE
    `NhanKhau` ADD CONSTRAINT `nhankhau_idhokhau_foreign` FOREIGN KEY(`idHoKhau`) REFERENCES `HoKhau`(`id`);
ALTER TABLE
    `KhaiBaoYTe` ADD CONSTRAINT `khaibaoyte_idnhankhau_foreign` FOREIGN KEY(`idNhanKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `CachLy` ADD CONSTRAINT `cachly_id_foreign` FOREIGN KEY(`id`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `ThayDoiHoKhau` ADD CONSTRAINT `thaydoihokhau_idhokhau_foreign` FOREIGN KEY(`idHoKhau`) REFERENCES `HoKhau`(`id`);
ALTER TABLE
    `TamVang` ADD CONSTRAINT `tamvang_idnhaukhau_foreign` FOREIGN KEY(`idNhanKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `ThayDoiNhanKhau` ADD CONSTRAINT `thaydoinhankhau_idnhaukhau_foreign` FOREIGN KEY(`idNhanKhau`) REFERENCES `NhanKhau`(`id`);
ALTER TABLE
    `CachLy` ADD CONSTRAINT `cachly_idnhankhau_foreign` FOREIGN KEY(`idNhanKhau`) REFERENCES `NhanKhau`(`id`);


INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES
('HK001', 'Khu A', 'Số 1, đường ABC', '2020-01-01', 1),
('HK002', 'Khu B', 'Số 2, đường XYZ', '2021-05-10', 2),
('HK003', 'Khu C', 'Số 3, đường LMN', '2019-11-11', 3);

INSERT INTO NhanKhau (hoTen, soCMND, bietDanh, gioiTinh, thuongTru, ngaySinh, tonGiao, idHoKhau, ngheNghiep, trangThai) VALUES
('Nguyen Van A', '123456789', 'A', 1, 'Số 1, đường ABC', '1990-01-01', 'Không', 1, 'Nhân viên văn phòng', 'Đang ở'),
('Tran Thi B', '234567890', 'B', 0, 'Số 1, đường ABC', '1995-05-05', 'Không', 1, 'Sinh viên', 'Đang ở'),
('Pham Van C', '345678901', 'C', 1, 'Số 2, đường XYZ', '1980-12-25', 'Công giáo', 2, 'Kỹ sư', 'Đang ở'),
('Le Thi D', '456789012', 'D', 0, 'Số 2, đường XYZ', '1975-10-10', 'Phật giáo', 2, 'Giáo viên', 'Đang ở'),
('Hoang Van E', '567890123', 'E', 1, 'Số 3, đường LMN', '1988-03-20', 'Không', 3, 'Bác sĩ', 'Tạm vắng'),
('Nguyen Thi F', '678901234', 'F', 0, 'Số 3, đường LMN', '1998-07-07', 'Công giáo', 3, 'Sinh viên', 'Đang ở');

INSERT INTO ThayDoiHoKhau (thongTinThayDoi, thayDoiTu, thayDoiThanh, ngayThayDoi, idHoKhau) VALUES
('Chuyển đến số 1, đường XYZ', 'Số 1, đường ABC', 'Số 1, đường XYZ', '2022-01-01', 1),
('Chuyển đến số 3, đường LMN', 'Số 2, đường XYZ', 'Số 3, đường LMN', '2021-08-01', 2),
('Chuyển đến số 2, đường XYZ', 'Số 3, đường LMN', 'Số 2, đường XYZ', '2023-06-01', 3);

INSERT INTO TamVang (soGiayTamVang, noiTamTru, tuNgay, denNgay, idNhanKhau) VALUES
('TV001', 'Số 1, đường ABC', '2022-01-01', '2022-01-15', 1),
('TV002', 'Số 2, đường XYZ', '2021-08-01', '2021-08-14', 3),
('TV003', 'Số 3, đường LMN', '2023-06-01', '2023-06-15', 5);

INSERT INTO KhaiBaoYTe (idNhanKhau, hanhTrinh, trieuChung, ngayKhaiBao, doiTuongTiepXuc) VALUES
(1, 'Đi làm về', 'Sốt, ho', '2022-01-01', 'Người nhiễm COVID-19'),
(2, 'Đi học về', 'Đau đầu', '2022-10-10', 'Người tiếp xúc với người nhiễm COVID-19'),
(4, 'Đi chơi về', 'Đau bụng', '2023-05-07', 'Người nhiễm COVID-19');

INSERT INTO CachLy (idNhanKhau, hinhThucTest, thoiDiem, mucDoCovid, trangThaiTest) VALUES
(1, 'Test PCR', '2022-01-02', 'F0', 'Âm tính'),
(2, 'Test nhanh', '2021-08-02', 'F1', 'Dương tính'),
(4, 'Test PCR', '2023-06-01', 'F0', 'Âm tính');

INSERT INTO ThayDoiNhanKhau (ngayChuyen, noiChuyen, ghiChu, idNhanKhau) VALUES
('2022-01-01', 'Chuyển đến số 1, đường XYZ', 'Chuyển nhà', 1),
('2021-08-01', 'Chuyển đến số 3, đường LMN', 'Chuyển nhà', 3),
('2023-06-01', 'Chuyển đến số 2, đường XYZ', 'Chuyển nhà', 5);

INSERT INTO TamTru (soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh, ngheNghiep) VALUES
('TT001', 'Công tác', '2022-01-01', 'Nguyen Van A', '123456789', '1990-01-01', 1, 'Kỹ sư'),
('TT002', 'Học tập', '2021-08-01', 'Pham Van C', '345678901', '2002-12-25', 1, 'Sinh viên'),
('TT003', 'Khám bệnh', '2023-06-01', 'Hoang Van E', '567890123', '1988-03-20', 1, 'Nhà văn');
