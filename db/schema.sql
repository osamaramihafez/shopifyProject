
CREATE TABLE Item (
    item_id SERIAL PRIMARY KEY, 
    item_title VARCHAR(50),
    item_description TEXT,
    item_quantity INTEGER,
    sale_date DATE,
    item_tag VARCHAR(50)
);
