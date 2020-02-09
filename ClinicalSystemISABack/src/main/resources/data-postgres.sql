insert into clinic_center (name) values ('Klinicki Centar VNS');

insert into clinic (name, clinic_center_id, city, picture, likes, ocena, br_puta_ocenjivanja, x, y) values ('dr Jovan Jovanovic Zmaj', 1, 'Novi Sad', '/images/kc1.jpg', 32, 5, 1, 45.26, 19.87);
insert into clinic (name, clinic_center_id, city, picture, likes, ocena, br_puta_ocenjivanja, x, y) values ('Dragisa Misovic', 1, 'Beograd', '/images/kc2.jpg', 79, 7, 1, 45.25, 19.82);
insert into clinic (name, clinic_center_id, city, picture, likes, ocena, br_puta_ocenjivanja, x, y) values ('Milutin Milankovic', 1, 'Nis', '/images/kc3.jpg', 121, 9, 1, 45.27, 19.9);



insert into checkup_type(name) values ('Kardioloski');
insert into checkup_type(name) values ('Stomatoloski');
insert into checkup_type(name) values ('Sistematski');


insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 1', 'Redovan sistematski pregled', 'Sistematski', 5, 120, false , 3, 4, false, false, '2012-01-27T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 2', 'Redovan kardioloski pregled srca', 'Kardioloski', 8, 380, false, 2, 4, false, false, '2020-01-27T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 3', 'Redocan stomatoloski pregled', 'Stomatoloski', 1, 1999, false, 3, 2, false, false, '2020-01-10T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 4', 'Redocan zubarski pregled', 'Stomatoloski', 2, 899, false, 3, 2, false, false, '2020-01-10T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 5', 'A', 'Stomatoloski', 1, 1000, false, 3, 4, false, false, '2020-02-10T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 6', 'B', 'Stomatoloski', 2, 0, false, 2, 4, false, false, '2020-02-11T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 7', 'C', 'Stomatoloski', 1, 1200, false, 2, 4, false, false, '2020-02-20T16:25:52.000Z');
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta, ocenjena_klinika, ocenjen_lekar, date_time) values ('Pregled 8', 'D', 'Stomatoloski', 2, 1000, false, 2, 4, false, false, '2020-02-06T16:25:52.000Z');




insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('Sajlovo1', 'Aleksandar', 'Kosic', 'sickokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06139356, 0297, 'ADMINCC', true, 1, 43, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('detelinara1', 'Jovan', 'Jenjic', 'jovan.jenjic@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Srbija', 'Srbijaa', 069356, 02997, 'DOCTOR', true, 1,  222, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('naselje1', 'Aeesfleksandar', 'Kosdfsic', 'dsidsdsffckokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06, 022397, 'DOCTOR', true, 2,  279, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('Podbara 21', 'Vanja', 'Stanojevic', 'vaksicarina@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Banjaluka', 'BIH', 0699, 011397, 'PATIENT', true, 1, 111, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('Sajmise 33', 'Nikolina', 'Ivankovic', 'nikolinaiv07@gmail.com', '654321', 'Zvornik', 'ReoSrpsa', 0655, 022337, 'PATIENT', true, 2, 450, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('Liman 33', 'Stefan', 'Pejakovic', 'pejak021@gmail.com', '22322', 'Mrkonjic', 'SrpskaRep', 0622, 121221, 'PATIENT', true, 3, 78, 6, 1, false);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes, ocena, br_puta_ocenjivanja, prva_prijava) values ('Ruma', 'MMilos', 'Milos', 'milos@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Srbija', 'Srbijaa', 111, 22, 'DOCTOR', true, 1,  12, 9, 1, false);


insert into medical_record (user_id) values (1);
insert into medical_record (user_id) values (2);
insert into medical_record (user_id) values (3);
insert into medical_record (user_id) values (4);
insert into medical_record (user_id) values (5);
insert into medical_record (user_id) values (6);




insert into operation (description, date_time, duration_hours) values ('Transplatacija bubrega', '2019-9-8', 7);
insert into operation (description, date_time, duration_hours) values ('Transplatacija srca', '2019-3-25', 12);

insert into room (number, free, checkup_id) values (10, true, 1);
insert into room (number, free, checkup_id) values (11, true, 2);
insert into room (number, free, checkup_id) values (12, true, 2);
insert into room (number, free, checkup_id) values (13, false, 1);

insert into sick (name, description, sick_number, checkup_id) values ('', '', 0, 1);
insert into sick (name, description, sick_number, checkup_id) values ('Prehlada', 'Obicna', 1818, 1);
insert into sick (name, description, sick_number, checkup_id) values ('Dijabetes', 'Nizak rizik', 2929, 2);
insert into sick (name, description, sick_number, checkup_id) values ('Visok pritisak', '140/80', 3737, 3);
insert into sick (name, description, sick_number, checkup_id) values ('Upala grla', 'ses', 5555, 4);
insert into sick (name, description, sick_number, checkup_id) values ('Uapala uva', 'Upala srednjeg uva', 6565, 5);
insert into sick (name, description, sick_number, checkup_id) values ('Glavobolja', 'Migrena na promenu vremena', 8298, 6);
insert into sick (name, description, sick_number, checkup_id) values ('Posekotina', 'Mala posekotina', 7198, 7);


insert into visit (name, description, date_time) values ('Poseta1', 'Poslovna poseta', '2019-5-16');
insert into visit (name, description, date_time) values ('Poseta2', 'Porodicna poseta', '2019-3-15');


insert into recipe (name) values ('Recept1');
insert into recipe (name) values ('Recept2');

insert into medicine (name, recipe_id) values ('', 1);
insert into medicine (name, recipe_id) values ('Defrinol', 1);
insert into medicine (name, recipe_id) values ('Bromazepan', 1);
insert into medicine (name, recipe_id) values ('Amoksicilin', 1);



insert into authority (name) values ('ADMINCC');

DROP TABLE IF EXISTS admin_clinic CASCADE;
DROP TABLE IF EXISTS admin_clinic_center CASCADE;
DROP TABLE IF EXISTS doctor CASCADE;
DROP TABLE IF EXISTS medical_sister CASCADE;

alter sequence users_id_seq restart with 8;
alter sequence clinic_center_id_seq restart with 2;
alter sequence clinic_id_seq restart with 3;
alter sequence operation_id_seq restart with 3;
alter sequence room_id_seq restart with 5;
alter sequence sick_id_seq restart with 5;
alter sequence visit_id_seq restart with 3;
alter sequence medicine_id_seq restart with 4;
alter sequence recipe_id_seq restart with 3;
alter sequence authority_id_seq restart with 2;
alter sequence medical_record_id_seq restart with 7;
alter sequence checkup_type_id_seq restart with 3;
alter sequence checkup_id_seq restart with 9;