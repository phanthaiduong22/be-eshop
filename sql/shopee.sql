DROP TABLE IF EXISTS "Comments";
DROP TABLE IF EXISTS "OrderDetails";
DROP TABLE IF EXISTS "Orders";
DROP TABLE IF EXISTS "Coupons";
DROP TABLE IF EXISTS "ShippingAgency";
DROP TABLE IF EXISTS "Ratings";
DROP TABLE IF EXISTS "Follow";
DROP TABLE IF EXISTS "CartItem";
DROP TABLE IF EXISTS "Cart";
DROP TABLE IF EXISTS "Messages";
DROP TABLE IF EXISTS "Product_Deal";
DROP TABLE IF EXISTS "Deal";
DROP TABLE IF EXISTS "Product_Image";
DROP TABLE IF EXISTS "Products";
DROP TABLE IF EXISTS "Category";
DROP TABLE IF EXISTS "Store";
DROP TABLE IF EXISTS "User";
DROP TABLE IF EXISTS "Address";

CREATE TABLE "Address"(
	ID serial PRIMARY KEY ,
	Street varchar(255) NOT NULL ,
	Ward varchar(255) NOT NULL ,
	District varchar(255) NOT NULL ,
	City varchar(255) NOT NULL
);
CREATE TABLE "User"(
	ID serial PRIMARY KEY ,
	Username varchar(255) UNIQUE NOT NULL ,
	Password varchar(255) NOT NULL ,
	Phone varchar(20),
	Name varchar(255),
	Email varchar(255),
	Sex boolean,
	BirthDate date,
	AddressID int,
	CONSTRAINT fk_address FOREIGN KEY(AddressID) REFERENCES "Address"(ID)
);
CREATE TABLE "Store"(
	USER_ID int PRIMARY KEY,
	Name varchar(255),
	stars int,
	description TEXT,
	CONSTRAINT fk_user FOREIGN KEY(USER_ID) REFERENCES "User"(ID)
);
CREATE TABLE "Category"(
	ID int PRIMARY KEY,
	Image_url varchar(255),
	Name varchar(255) NOT NULL
);
CREATE TABLE "Products"(
	ID serial UNIQUE PRIMARY KEY,
	STORE_ID int NOT NULL,
	CAT_ID int NOT NULL,
	Stock int NOT NULL,
	Price int NOT NULL,
	Origin varchar(255),
	Product_name varchar(255),
	Description TEXT,
	Date_created TIMESTAMP NOT NULL,
	CONSTRAINT fk_store 
		FOREIGN KEY(STORE_ID) 
			REFERENCES "Store"(USER_ID),
	CONSTRAINT fk_cat
		FOREIGN KEY(CAT_ID) 
			REFERENCES "Category"(ID)
);
CREATE TABLE "Product_Image"(
	Product_ID int,
	Image_no SERIAL,
	Image_Url varchar(255),
	PRIMARY KEY (Image_no),
	CONSTRAINT fk_product
		FOREIGN KEY(Product_ID) 
			REFERENCES "Products"(ID)
);
CREATE TABLE "Cart"(
	USER_ID int PRIMARY KEY,
	price int,
	CONSTRAINT fk_user 
		FOREIGN KEY(USER_ID) 
			REFERENCES "User"(ID)
);
CREATE TABLE "CartItem"(
	CART_ID int,
	PRODUCT_ID int,
	Counting int,
	Checked boolean,
	price int,
	CONSTRAINT fk_cart 
		FOREIGN KEY(CART_ID) 
			REFERENCES "Cart"(USER_ID),
	CONSTRAINT fk_product
		FOREIGN KEY(PRODUCT_ID) 
			REFERENCES "Products"(ID),
	PRIMARY KEY(CART_ID,PRODUCT_ID)
);


CREATE TABLE "Follow"(
	USER_ID int,
	STORE_ID int,
	CONSTRAINT fk_user
		FOREIGN KEY(USER_ID) 
			REFERENCES "User"(ID),
	CONSTRAINT fk_store 
		FOREIGN KEY(STORE_ID) 
			REFERENCES "Store"(USER_ID),
	PRIMARY KEY(USER_ID,STORE_ID)
);
CREATE TABLE "Comments"(
	PRODUCT_ID int,
	No serial,
	USER_ID int  NOT NULL,
	Comment TEXT  NOT NULL,
	Timestamp TIMESTAMP NOT NULL,
	
	CONSTRAINT fk_user
		FOREIGN KEY(USER_ID) 
			REFERENCES "User"(ID),
	CONSTRAINT fk_product
		FOREIGN KEY(PRODUCT_ID) 
			REFERENCES "Products"(ID),
	PRIMARY KEY(PRODUCT_ID,No)
);
CREATE TABLE "Ratings"(
	PRODUCT_ID int,
	USER_ID int  NOT NULL,
	Stars int,
	PRIMARY KEY(PRODUCT_ID,USER_ID),
	CONSTRAINT fk_user
		FOREIGN KEY(USER_ID) 
			REFERENCES "User"(ID),
	CONSTRAINT fk_product
		FOREIGN KEY(PRODUCT_ID) 
			REFERENCES "Products"(ID)
);

CREATE TABLE "Coupons"(
	ID int PRIMARY KEY,
	Name varchar(255),
	Percent float,
	Condition int,
	Description TEXT,
	StartDay time,
	EndDay time
);
CREATE TABLE "ShippingAgency"(
	ID int PRIMARY KEY,
	Name varchar(255) NOT NULL,
	Location varchar(255) NOT NULL
);


CREATE TABLE "Orders"(
	ID serial PRIMARY KEY,
	Code int,
	Transport int,
	Status int NOT NULL,
	Payment varchar(255) NOT NULL,
	USER_ID int NOT NULL,
	TotalPrice int NOT NULL,
	CONSTRAINT fk_user
		FOREIGN KEY(USER_ID) 
			REFERENCES "User"(ID),
	CONSTRAINT fk_coupon
		FOREIGN KEY(Code) 
			REFERENCES "Coupons"(ID),
	CONSTRAINT fk_ship
		FOREIGN KEY(Transport) 
			REFERENCES "ShippingAgency"(ID)
);

<<<<<<< HEAD

=======
>>>>>>> origin/phuc2
CREATE TABLE "OrderDetails"(
	ORDER_ID int,
	No serial,
	PRODUCT_ID int,
	Counting int,
	PRIMARY KEY(ORDER_ID,No),
	CONSTRAINT fk_order
		FOREIGN KEY(ORDER_ID) 
			REFERENCES "Orders"(ID),
	CONSTRAINT fk_product
		FOREIGN KEY(PRODUCT_ID) 
			REFERENCES "Products"(ID)
);

CREATE TABLE "Messages"(
	ID serial PRIMARY KEY,
	SENDER_ID int,
	RECEIVER_ID int,
	Message text,
	Timestamp time,
	CONSTRAINT fk_se
		FOREIGN KEY(SENDER_ID) 
			REFERENCES "User"(ID),
	CONSTRAINT fk_re
		FOREIGN KEY(RECEIVER_ID) 
			REFERENCES "User"(ID)
);
CREATE TABLE "Deal"(
	ID int PRIMARY KEY,
	Name varchar(255),
	StartDay time,
	EndDay time
);
CREATE TABLE "Product_Deal"(
	PRODUCT_ID int PRIMARY KEY,
	DEAL_ID int,
	Percent float,
	CONSTRAINT fk_deal
		FOREIGN KEY(DEAL_ID) 
			REFERENCES "Deal"(ID),
	CONSTRAINT fk_product
		FOREIGN KEY(PRODUCT_ID) 
			REFERENCES "Products"(ID)
);

INSERT INTO "Address" VALUES
(DEFAULT, '5 Ap Rach Mieu', 'Xa Hung Thinh', 'Huyen Chau Thanh', 'Tinh Dong Thap'),
(DEFAULT, '122 Ngo Quyen', 'Phuong 11', 'Quan 5', 'TP. Ho Chi Minh'),
(DEFAULT, '12 Nguyen Trai', 'Phuong 3', 'Quan 3', 'TP. Ho Chi Minh'),
(DEFAULT, '2 Pham Van Dong', 'Phuong 6', 'Quan 1', 'TP. Ho Chi Minh'),
(DEFAULT, '43A Le Loi', 'Phuong 1', 'Quan Cau Giay', 'TP. Ha Noi');

INSERT INTO "User" VALUES 
(DEFAULT,'baoanh','password','0903871321','Nguyen Bao Anh','baoanh@email.com', FALSE, '1990-11-10', 1),
(DEFAULT,'hoailinh','password','0903871321','Vo Hoai Linh','hoailinh@email.com',  TRUE, '1990-11-10', 3),
(DEFAULT,'thanhhai','password','0903871321','Tran Thanh Hai','thanhai@email.com', TRUE, '1990-11-10', 0),
(DEFAULT,'hoanganh','password','0903871321','Gia Hoang Anh','example@email.com', TRUE, '1990-11-10', 2),
(DEFAULT,'minhtri','password','0903871321','Nguyen Minh Tri','example2@email.com', TRUE, '1990-11-10', 4);


INSERT INTO "ShippingAgency" VALUES
(DEFAULT, 'Giao hang tiet kiem', 'TP. Ho Chi Minh'),
(DEFAULT, 'Giao hang nhanh', 'Ha Noi'),
(DEFAULT, 'Giao hang D&A', 'Ha Noi');


INSERT INTO "Store"
VALUES (1,'Bao Anh Shop',5,'Chuyên kinh doanh mỹ phẩm các loại.'),
(2,'Sieu thi dien may',4,'Chuyên laptop, di động'),
(3,'Mens Wear',5,'Dan ong lich lam');

INSERT INTO "Category"
VALUES (0,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Thời trang nam'),
(1,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Thời trang nữ'),
(2,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Điện tử'),
(3,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Gia dụng'),
(4,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Thể thao & du lịch'),
(5,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Mẹ và bé'),
(6,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Phụ kiện thời trang'),
(7,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Voucher & dịch vụ'),
(8,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Nhà sách'),
(9,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Đồ chơi'),
(10,'https://cdn.iconscout.com/icon/free/png-256/cloth-clothing-wearing-fashion-skirt-fancy-dress-9023.png','Thú cưng');

INSERT INTO "Cart" VALUES
(0, 200000),
(1, 200000),
(2, 200000),
(3, 200000),
(4, 200000)
