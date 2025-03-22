-- Insert first person
INSERT INTO persons (
    name, 
    age, 
    gender, 
    address, 
    phone, 
    aadhaar_number, 
    image_path, 
    created_at, 
    updated_at
) VALUES (
    'John Doe',  -- Replace with actual name
    30,         -- Replace with actual age
    'Male',     -- Replace with actual gender
    '123 Main St, City',  -- Replace with actual address
    '1234567890',        -- Replace with actual phone
    '1234-5678-9012',    -- Replace with actual Aadhaar number
    '/uploads/photos/WhatsApp Image 2025-03-22 at 17.30.53.jpeg',
    NOW(),
    NOW()
);

-- Insert second person
INSERT INTO persons (
    name, 
    age, 
    gender, 
    address, 
    phone, 
    aadhaar_number, 
    image_path, 
    created_at, 
    updated_at
) VALUES (
    'Jane Smith',  -- Replace with actual name
    25,           -- Replace with actual age
    'Female',     -- Replace with actual gender
    '456 Oak St, Town',  -- Replace with actual address
    '9876543210',        -- Replace with actual phone
    '9876-5432-1098',    -- Replace with actual Aadhaar number
    '/uploads/photos/WhatsApp Image 2025-03-22 at 16.46.12.jpeg',
    NOW(),
    NOW()
); 