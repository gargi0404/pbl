-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS police_records;

-- Use the database
USE police_records;

-- Drop the table if it exists
DROP TABLE IF EXISTS persons;

-- Create the persons table
CREATE TABLE IF NOT EXISTS persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('M', 'F', 'Other'),
    address TEXT,
    phone VARCHAR(20),
    aadhaar_number VARCHAR(20),
    image_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO persons (name, age, gender, address, phone, aadhaar_number) VALUES
('Maithilee', 28, 'F', 'House No. 23, Gali No. 5, Laxmi Nagar, New Delhi – 110092', '+91-9876543210', '1234-5678-9012'),
('Maithilii', 42, 'F', 'Flat No. 12B, Krishna Apartments, MG Road, Jaipur, Rajasthan – 302001', '+91-8765432109', '2345-6789-0123'),
('Maithelee', 31, 'F', '56, Patel Nagar, Near Hanuman Mandir, Ahmedabad, Gujarat – 380001', '+91-7654321098', '3456-7890-1234'),
('Maethilee', 45, 'F', 'Flat No. 204, Sai Residency, T. Nagar, Chennai, Tamil Nadu – 600017', '+91-6543210987', '4567-8901-2345'),
('Juii', 22, 'F', 'House No. 78, Sector 22, Chandigarh – 160022', '+91-9876543211', '5678-9012-3456'),
('Jui', 24, 'F', 'Plot No. 45, Jubilee Hills, Hyderabad, Telangana – 500033', '+91-8765432110', '6789-0123-4567'),
('Juui', 32, 'F', 'H.No. 112, Civil Lines, Near Clock Tower, Ludhiana, Punjab – 141001', '+91-7654321099', '7890-1234-5678'),
('Jhui', 26, 'F', 'Flat No. 302, Shree Ganesha Heights, FC Road, Pune, Maharashtra – 411004', '+91-6543210988', '8901-2345-6789'),
('Gargi', 28, 'F', '27, Green Park, Kowdiar, Thiruvananthapuram, Kerala – 695003', '+91-9876543212', '9012-3456-7890'),
('Gargii', 34, 'F', 'House No. 89, Shyam Nagar, Near Raj Bhavan, Bhopal, Madhya Pradesh – 462002', '+91-8765432111', '0123-4567-8901'),
('Gargiii', 46, 'F', 'Flat No. 14C, Lake View Apartments, Salt Lake City, Kolkata, West Bengal – 700064', '+91-7654321100', '1122-3344-5566'),
('Gaargi', 52, 'F', 'House No. 36, Rajendra Path, Kankarbagh, Patna, Bihar – 800020', '+91-6543210989', '2233-4455-6677'),
('Gaargii', 23, 'F', 'Village Rampur, PO Solan, Near Mall Road, Solan, Himachal Pradesh – 173212', '+91-9876543213', '3344-5566-7788'),
('Yamini', 21, 'F', 'Flat No. 507, Sunrise Towers, Gomti Nagar, Lucknow, Uttar Pradesh – 226010', '+91-8765432112', '4455-6677-8899'),
('Yaminii', 39, 'F', 'House No. 21, Shastri Nagar, Near Kali Mandir, Ranchi, Jharkhand – 834002', '+91-7654321101', '5566-7788-9900'),
('Yaamini', 41, 'F', 'Flat No. 8, Shanti Enclave, Dharampeth, Nagpur, Maharashtra – 440010', '+91-6543210990', '6677-8899-0011'),
('Yamminii', 54, 'F', 'Bungalow No. 34, Ashok Vihar, Near ISKCON Temple, Gandhinagar, Gujarat – 382010', '+91-9876543214', '7788-9900-1122');
