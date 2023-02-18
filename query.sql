
DROP TABLE IF EXISTS clients CASCADE;
CREATE TABLE clients (
  id int identity(1,1) PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  passowrd VARCHAR(255) NOT NULL
);

INSERT INTO clients (name, email, passowrd) VALUES ('Alice', 'email1@mail.com', '123');
INSERT INTO clients (name, email, passowrd) VALUES ('Kira', 'email2@mail.com', '123');
INSERT INTO clients (name, email, passowrd) VALUES ('Three', 'email2@mail.com', '123');