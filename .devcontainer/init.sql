CREATE DATABASE IF NOT EXISTS `5700braydencorbridge`;
CREATE DATABASE IF NOT EXISTS `5700braydencorbridge_bistro`;
CREATE DATABASE IF NOT EXISTS `5700braydencorbridge_bistrosequelize`;
CREATE DATABASE IF NOT EXISTS `5700braydencorbridge_examproject`;

-- Create devuser with full permissions
CREATE USER IF NOT EXISTS 'devuser'@'%' IDENTIFIED BY 'devpassword';
GRANT ALL PRIVILEGES ON *.* TO 'devuser'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;