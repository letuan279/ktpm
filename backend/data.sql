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

CREATE TABLE `NguoiDung` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userName` VARCHAR(255) NOT NULL,
    `passWord` VARCHAR(255) NOT NULL,
    `role` SMALLINT NOT NULL
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
('HK001', 'Khu phố 1', '87 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '2020-01-01', 1),
('HK002', 'Khu phố 2', '93 Nguyễn Văn Huyên, Quận Cầu Giấy, Hà Nội', '2021-02-01', 5),
('HK003', 'Khu phố 3', '117 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '2020-03-01', 8),
('HK004', 'Khu phố 4', '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '2021-04-01', 12),
('HK005', 'Khu phố 5', '95 Thanh Niên, Quận Tây Hồ, Hà Nội', '2020-05-01', 17);


INSERT INTO NhanKhau (hoTen, soCMND, bietDanh, gioiTinh, thuongTru, ngaySinh, tonGiao, idHoKhau, ngheNghiep, trangThai) VALUES
('Nguyễn Nhật Anh', '966181327', 'Anh', 1, '87 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '1990-01-01', 'Phật giáo', 1, 'Công nhân', 'Bình thường'),
('Võ Mai Ngân', '163485712', 'Ngân', 0, '87 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '1995-02-02', 'Công giáo', 1, 'Nhân viên văn phòng', 'Bình thường'),
('Quách Đức Anh', '884387721', 'ĐAnh', 1, '87 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '1998-03-03', 'Không', 2, 'Sinh viên', 'Bình thường'),
('Nguyễn Thị Hồng Hạnh', '435226463', 'Hạnh', 0, '87 Lê Thanh Nghị, Quận Hai Bà Trưng, Hà Nội', '2000-04-04', 'Hòa hảo', 2, 'Giáo viên', 'Bình thường'),
('Trần Minh Tuấn', '657491556', 'Tuấn', 1, '93 Nguyễn Văn Huyên, Quận Cầu Giấy, Hà Nội', '1992-05-05', 'Phật giáo', 3, 'Kỹ sư', 'Bình thường'),
('Lê Hà Thảo Vy', '459376186', 'Vy', 0, '93 Nguyễn Văn Huyên, Quận Cầu Giấy, Hà Nội', '1997-06-06', 'Công giáo', 3, 'Y tá', 'Bình thường'),
('Phạm Văn Toàn', '860630854', 'Toàn', 1, '93 Nguyễn Văn Huyên, Quận Cầu Giấy, Hà Nội', '1993-07-07', 'Không', 4, 'Bác sĩ', 'Bình thường'),
('Phạm Thị Hồng Anh', '639792796', 'HAnh', 0, '117 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '1999-08-08', 'Hòa hảo', 4, 'Kỹ thuật viên', 'Bình thường'),
('Nguyễn Tử Xuân Công', '318050678', 'Công', 1, '117 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '1991-09-09', 'Phật giáo', 5, 'Kỹ sư', 'Bình thường'),
('Nguyễn Thanh Huyền', '942640781', 'Huyền', 0, '117 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '1996-10-10', 'Công giáo', 5, 'Giáo viên', 'Bình thường'),
('Trần Trung Đức', '704941493', 'Đức', 1, '117 Phạm Hùng, Quận Nam Từ Liêm, Hà Nội', '1994-11-11', 'Không', 1, 'Bán hàng', 'Bình thường'),
('Trần Mai Linh', '636754745', 'Linh', 0, '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '1995-12-12', 'Hòa hảo', 1, 'Nhân viên văn phòng', 'Bình thường'),
('Lê Quang Duy', '056649942', 'Duy', 1, '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '1993-01-13', 'Phật giáo', 2, 'Công nhân', 'Bình thường'),
('Trần Minh Thúy', '279583787', 'Thúy', 0, '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '1997-02-14', 'Công giáo', 2, 'Y tá', 'Bình thường'),
('Phạm Minh Hoàng', '969364669', 'Hoàng', 1, '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '1996-03-15', 'Không', 3, 'Bác sĩ', 'Bình thường'),
('Nguyễn Minh Ngọc', '174409865', 'Ngọc', 0, '223 Giải Phóng, Quận Hai Bà Trưng, Hà Nội', '1992-04-16', 'Hòa hảo', 3, 'Kỹ thuật viên', 'Bình thường'),
('Nguyễn Quang Long', '960357991', 'Long', 1, '95 Thanh Niên, Quận Tây Hồ, Hà Nội', '1990-05-17', 'Phật giáo', 4, 'Kỹ sư', 'Bình thường'),
('Ngô Thị Tố Uyên', '048689501', 'Uyên', 0, '95 Thanh Niên, Quận Tây Hồ, Hà Nội', '1994-06-18', 'Công giáo', 4, 'Giáo viên', 'Bình thường'),
('Hà Văn Đức', '790467351', 'Đức', 1, '95 Thanh Niên, Quận Tây Hồ, Hà Nội', '1999-07-19', 'Không', 5, 'Bán hàng', 'Bình thường'),
('Nguyễn Thị Hồng Vy', '186980141', 'Vy', 0, '95 Thanh Niên, Quận Tây Hồ, Hà Nội', '1991-08-20', 'Hòa hảo', 5, 'Nhân viên văn phòng', 'Bình thường');


INSERT INTO KhaiBaoYTe (idNhanKhau, hanhTrinh, trieuChung, ngayKhaiBao, doiTuongTiepXuc) VALUES
(1, 'Hà Nội', 'Sốt, ho', '2022-01-15', 'Người nhiễm COVID-19'),
(7, 'Đà Nẵng', 'Khó thở, đau ngực', '2022-02-16', 'Người tiếp xúc gần'),
(9, 'Hồ Chí Minh', 'Mệt mỏi, nhức đầu', '2022-03-17', 'Người nhiễm COVID-19'),
(13, 'Quảng Ninh', 'Sốt, ho', '2022-04-18', 'Người tiếp xúc gần'),
(17, 'Hải Phòng', 'Mệt mỏi, đau họng', '2022-05-19', 'Người tiếp xúc gần'),
(12, 'Hà Tĩnh', 'Sốt, ho', '2022-06-17', 'Người nhiễm COVID-19'),
(17, 'Quảng Bình', 'Khó thở, đau ngực', '2022-07-16', 'Người tiếp xúc gần'),
(19, 'Hưng Yên', 'Mệt mỏi, nhức đầu', '2022-08-17', 'Người nhiễm COVID-19'),
(13, 'Hồ Chí Minh', 'Sốt, ho', '2022-06-18', 'Người tiếp xúc gần'),
(17, 'Hải Phòng', 'Mệt mỏi, đau họng', '2022-07-19', 'Người tiếp xúc gần');

INSERT INTO TamVang (soGiayTamVang, noiTamTru, tuNgay, denNgay, idNhanKhau) VALUES
('TV001', 'TP.HCM', '2022-06-15', '2022-12-18', 6),
('TV002', 'Hà Nội', '2022-02-16', '2022-06-19', 7),
('TV003', 'Đà Nẵng', '2022-01-17', '2022-05-20', 8),
('TV004', 'Hải Phòng', '2022-01-18', '2022-06-21', 9),
('TV005', 'Quảng Ninh', '2022-06-19', '2022-10-22', 10);

INSERT INTO ThayDoiNhanKhau (ngayChuyen, noiChuyen, ghiChu, idNhanKhau) VALUES
('2023-06-15', 'Hà Nội', 'Chuyển đến Hà Nội', 11),
('2023-06-16', 'Đà Nẵng', 'Chuyển đến Đà Nẵng', 12),
('2023-06-17', 'TP.HCM', 'Chuyển đến TP.HCM', 13),
('2023-06-18', 'Hải Phòng', 'Chuyển đến Hải Phòng', 14),
('2023-06-19', 'Quảng Ninh', 'Chuyển đến Quảng Ninh', 15);

INSERT INTO CachLy (idNhanKhau, hinhThucTest, thoiDiem, mucDoCovid, trangThaiTest) VALUES
(16, 'PCR', '2022-06-15', 'F1', 'Âm tính'),
(17, 'Rapid test', '2022-06-16', 'F2', 'Dương tính'),
(18, 'PCR', '2022-03-20', 'F0', 'Âm tính'),
(19, 'Rapid test', '2022-03-22', 'F1', 'Dương tính'),
(20, 'PCR', '2022-02-21', 'F0', 'Âm tính'),
(6, 'PCR', '2022-09-15', 'F1', 'Âm tính'),
(7, 'Rapid test', '2022-01-16', 'F2', 'Dương tính'),
(8, 'PCR', '2022-03-17', 'F0', 'Âm tính');

INSERT INTO ThayDoiHoKhau (thongTinThayDoi, thayDoiTu, thayDoiThanh, ngayThayDoi, idHoKhau) VALUES
('Chuyển đến Khu phố 1000', 'Khu phố 2000', 'Khu phố 1000', '2023-06-15', 1),
('Chuyển đến Khu phố 2001', 'Khu phố 2000', 'Khu phố 2001', '2023-06-16', 2),
('Chuyển đến Khu phố 3002', 'Khu phố 2000', 'Khu phố 3002', '2023-06-17', 3),
('Chuyển đến Khu phố 4003', 'Khu phố 2000', 'Khu phố 4003', '2023-06-18', 4),
('Chuyển đến Khu phố 5004', 'Khu phố 2000', 'Khu phố 5004', '2023-06-19', 5);

INSERT INTO TamTru (soGiayTamTru, lyDo, thoiGianTamTru, HoTen, soCMND, ngaySinh, gioiTinh, ngheNghiep) VALUES
('TT001', 'Công tác', '2023-06-15', 'Nguyễn Hoàng Minh', '388909469', '1990-01-01', 1, 'Kỹ sư'),
('TT002', 'Du lịch', '2023-06-16', 'Trần Ngọc Khánh', '654844673', '1995-02-02', 0, 'Sinh viên'),
('TT003', 'Công tác', '2023-06-17', 'Lê Xuân Bảo', '150234227', '1988-03-03', 1, 'Giáo viên'),
('TT004', 'Du lịch', '2023-06-18', 'Phạm Thị Hoài Thương', '070507996', '1992-04-04', 0, 'Nhân viên văn phòng'),
('TT005', 'Công tác', '2023-06-19', 'Đỗ Tiến Dũng', '496638939', '1997-05-05', 1, 'Công nhân');
