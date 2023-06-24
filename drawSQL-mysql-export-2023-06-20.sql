CREATE TABLE `KhaiBaoYTe`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idNhanKhau` INT UNSIGNED NOT NULL,
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
    `idNhanKhau` INT UNSIGNED NOT NULL
);
CREATE TABLE `NhanKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `hoTen` VARCHAR(255) NOT NULL,
    `soCMND` CHAR(255) UNIQUE NOT NULL,
    `bietDanh` VARCHAR(255) NOT NULL,
    `gioiTinh` SMALLINT NOT NULL,
    `thuongTru` BIGINT NOT NULL,
    `ngaySinh` DATE NOT NULL,
    `tonGiao` CHAR(255) NOT NULL,
    `idHoKhau` INT UNSIGNED NOT NULL,
    `ngheNghiep` VARCHAR(255) NOT NULL
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
    `hinhThuc` SMALLINT NOT NULL,
    `thoiDiem` DATE NOT NULL,
    `mucDoCovid` SMALLINT NOT NULL,
    `trangThaiTest` VARCHAR(255) NOT NULL
);
CREATE TABLE `ThayDoiHoKhau`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nguoiThayDoi` VARCHAR(255) NOT NULL,
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
    `gioiTinh` SMALLINT NOT NULL
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


INSERT INTO HoKhau (soHoKhau, khuVuc, diaChi, ngayLap, idChuHo) VALUES
('HK001', 'Khu phố 1', 'Đường Hoàng Văn Thụ, Phường 1, Thành phố Hồ Chí Minh', '2022-01-01', 1),
('HK002', 'Khu phố 2', 'Đường Nguyễn Thị Minh Khai, Phường 2, Thành phố Hồ Chí Minh', '2022-01-01', 4),
('HK003', 'Khu phố 3', 'Đường Nguyễn Văn Linh, Thành phố Hồ Chí Minh', '2022-01-01', 7);

INSERT INTO NhanKhau (hoTen, soCMND, bietDanh, gioiTinh, thuongTru, ngaySinh, tonGiao, idHoKhau, ngheNghiep) VALUES
('Nguyễn Văn A', '123456789', 'A', 1, '123456789', '2000-01-01', 'Không', 1, 'Sinh viên'),
('Nguyễn Thị B', '987654321', 'B', 0, '987654321', '2002-01-01', 'Không', 1, 'Học sinh'),
('Trần Văn C', '456789123', 'C', 1, '456789123', '1990-01-01', 'Không', 1, 'Kỹ sư'),
('Lê Thị D', '789123456', 'D', 0, '789123456', '1995-01-01', 'Không', 2, 'Giáo viên'),
('Phạm Văn E', '147258369', 'E', 1, '147258369', '1980-01-01', 'Không', 2, 'Nhân viên văn phòng'),
('Đỗ Thị F', '258369147', 'F', 0, '258369147', '1998-01-01', 'Không', 2, 'Bác sĩ'),
('Nguyễn Văn G', '369147258', 'G', 1, '369147258', '1975-01-01', 'Không', 3, 'Công nhân'),
('Trần Thị H', '951753456', 'H', 0, '951753456', '1960-01-01', 'Không', 3, 'Nội trợ'),
('Lê Văn I', '753951456', 'I', 1, '753951456', '1950-01-01', 'Không', 3, 'Tài xế');

INSERT INTO ThayDoiHoKhau (nguoiThayDoi, thongTinThayDoi, thayDoiTu, thayDoiThanh, ngayThayDoi, idHoKhau) VALUES
('Nguyễn Văn A', 'Chuyển vào', 'Quận 1', 'Phường 1', '2022-08-01', 1),
('Lê Thị D', 'Chuyển vào', 'Quận 2', 'Phường 2', '2022-08-01', 2),
('Trần Thị H', 'Chuyển vào', 'Quận 3', 'Phường 3', '2022-08-01', 3);

INSERT INTO TamTru (soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh) VALUES
('TT001', 'Lý do A', '2022-01-01', 'Nguyễn Văn A', '123456789', '1990-01-01', 1),
('TT002', 'Lý do B', '2022-02-02', 'Trần Thị B', '987654321', '1995-02-02', 0),
('TT003', 'Lý do C', '2022-03-03', 'Lê Văn C', '111222333', '2000-03-03', 1);

INSERT INTO ThayDoiNhanKhau (ngayChuyen, noiChuyen, ghiChu, idNhanKhau) VALUES
('2022-08-01', 'Quận 1', 'Chuyển vào', 2),
('2022-08-01', 'Quận 2', 'Chuyển vào', 5),
('2022-08-01', 'Quận 3', 'Chuyển vào', 8);

INSERT INTO KhaiBaoYTe (idNhanKhau, hanhTrinh, trieuChung, doiTuongTiepXuc) VALUES
(1, 'Hồ Chí Minh - Hà Nội', 'Sốt, ho, khó thở', 'Người nghi nhiễm COVID-19'),
(4, 'Hồ Chí Minh - Đà Nẵng', 'Đau họng, sốt nhẹ', 'Đang cách ly tại khu vực có dịch'),
(7, 'Hồ Chí Minh - Phú Quốc', 'Mệt mỏi, đau đầu', 'Tiếp xúc với người nghi nhiễm COVID-19');

INSERT INTO TamVang (soGiayTamVang, noiTamTru, tuNgay, denNgay, idNhanKhau) VALUES
('TV001', 'Tỉnh Bình Dương', '2022-08-01', '2022-08-14', 1),
('TV002', 'Tỉnh Vũng Tàu', '2022-08-01', '2022-08-14', 4),
('TV003', 'Tỉnh Cà Mau', '2022-08-01', '2022-08-14', 7);

INSERT INTO CachLy (hinhThuc, thoiDiem, mucDoCovid, trangThaiTest) VALUES
(1, '2022-08-01', 2, 'Âm tính'),
(2, '2022-08-01', 1, 'Dương tính'),
(1, '2022-08-01', 3, 'Âm tính');
