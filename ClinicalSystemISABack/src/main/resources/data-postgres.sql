insert into clinic_center (name) values ('Klinicki Centar VNS');

insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 1', 1, 'Novi Sad', '/images/kc1.jpg', 32);
insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 2', 1, 'Beograd', '/images/kc2.jpg', 79);
insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 3', 1, 'Nis', '/images/kc3.jpg', 121);



insert into checkup_type(name) values ('Kardioloski');
insert into checkup_type(name) values ('Stomatoloski');
insert into checkup_type(name) values ('Sistematski');


insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta) values ('Pregled 1', 'Redovan sistematski pregled', 'Sistematski', 5, 120, true, 1, 4);
insert into checkup(name, description, type, duration, price, unapred_definisan, id_lekara, id_pacijenta) values ('Pregled 2', 'Redovan kardioloski pregled srca', 'Kardioloski', 8, 380, true, 2, 4);


insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('Sajlovo1', 'Aleksandar', 'Kosic', 'sickokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06139356, 0297, 'ADMINCC', true, 1, 432);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('detelinara1', 'Jovan', 'Jenjic', 'jovan.jenjic@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Srbija', 'Srbijaa', 069356, 02997, 'DOCTOR', true, 1,  222);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('naselje1', 'Aeesfleksandar', 'Kosdfsic', 'dsidsdsffckokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06, 022397, 'DOCTOR', true, 1,  279);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('Podbara 21', 'Vanja', 'Stanojevic', 'vaksicarina@gmail.com', '123456', 'Banjaluka', 'BIH', 0699, 011397, 'PATIENT', true, 1, 111);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('Sajmise 33', 'Nikolina', 'Ivankovic', 'nikolinaiv07@gmail.com', '654321', 'Zvornik', 'ReoSrpsa', 0655, 022337, 'PATIENT', true, 2, 450);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, likes) values ('Liman 33', 'Stefan', 'Pejakovic', 'pejak021@gmail.com', '22322', 'Mrkonjic', 'SrpskaRep', 0622, 121221, 'PATIENT', true, 1, 78);


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
insert into sick (name, description, sick_number, checkup_id) values ('Dijabetes', 'Nizak rizik', 2929, 1);
insert into sick (name, description, sick_number, checkup_id) values ('Visok pritisak', '140/80', 3737, 2);
insert into sick (name, description, sick_number, checkup_id) values ('Uvecanje prostate', 'ses', 4646, 2);

insert into visit (name, description, date_time) values ('Poseta1', 'Poslovna poseta', '2019-5-16');
insert into visit (name, description, date_time) values ('Poseta2', 'Porodicna poseta', '2019-3-15');


insert into recipe (name) values ('Recept1');
insert into recipe (name) values ('Recept2');

insert into medicine (name, recipe_id) values ('', 1);
insert into medicine (name, recipe_id) values ('Defrinol', 1);
insert into medicine (name, recipe_id) values ('Promazepan', 1);
insert into medicine (name, recipe_id) values ('Amoksicilin', 1);



insert into authority (name) values ('ADMINCC');

DROP TABLE IF EXISTS admin_clinic CASCADE;
DROP TABLE IF EXISTS admin_clinic_center CASCADE;
DROP TABLE IF EXISTS doctor CASCADE;
DROP TABLE IF EXISTS medical_sister CASCADE;

alter sequence users_id_seq restart with 7;
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
alter sequence checkup_id_seq restart with 3;