echo "*********** Truncate table process *********** "
docker exec -it db_redlion mysql -u root -p -e "use redlion; SET FOREIGN_KEY_CHECKS=0;
truncate table comment;
truncate table language;
truncate table project;
truncate table project_language;
truncate table project_role;
truncate table role;
truncate table status;
truncate table task;
truncate table user;
truncate table user_project;
SET FOREIGN_KEY_CHECKS=1;"
echo "Database redlion cleaned"
docker exec -it back_redlion npm run make:fixtures
