CREATE USER 'djangouser'@'%' IDENTIFIED BY 'pass123#';
GRANT DBA TO 'djangouser'@'%';
FLUSH PRIVILEGES;