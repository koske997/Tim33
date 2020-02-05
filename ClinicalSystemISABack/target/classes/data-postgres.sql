insert into clinic_center (name) values ('Klinicki Centar VNS');

insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 1', 1, 'Novi Sad', '', 32);
insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 2', 1, 'Beograd', '', 79);
insert into clinic (name, clinic_center_id, city, picture, likes) values ('Klinika 3', 1, 'Nis', '', 121);

insert into checkup(name, description, type, duration, price) values ('Pregled 1', 'Redovan sistematski pregled', 'Sistematski', 5, 120);
insert into checkup(name, description, type, duration, price) values ('Pregled 2', 'Redovan kardioloski pregled srca', 'Kardioloski', 8, 380);

insert into checkup_type(name) values ('Kardioloski');
insert into checkup_type(name) values ('Stomatoloski');
insert into checkup_type(name) values ('Sistematski');


insert into medical_record (id) values (1);
insert into medical_record (id) values (2);

insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, checkup_id, likes) values ('Sajlovo1', 'Aleksandar', 'Kosic', 'sickokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06139356, 0297, 'ADMINCC', true, 1, 1, 432);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, checkup_id, likes) values ('detelinara1', 'Jovan', 'Jenjic', 'jovan.jenjic@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Srbija', 'Srbijaa', 069356, 02997, 'DOCTOR', true, 1, 1, 222);
insert into users (address, first_name, last_name, email, password, city, country, phone_number, user_id, role, enabled, clinic_id, checkup_id, likes) values ('naselje1', 'Aeesfleksandar', 'Kosdfsic', 'dsidsdsffckokralj4@gmail.com', '$2a$10$PckbyvdiGuU9H9HIzQT8nuMX/n30JwNMCmH/MbK6UWVQbggL55rnm', 'Kula', 'Srbija', 06, 022397, 'DOCTOR', true, 1, 2, 279);



insert into operation (description, date_time, duration_hours) values ('Transplatacija bubrega', '2019-9-8', 7);
insert into operation (description, date_time, duration_hours) values ('Transplatacija srca', '2019-3-25', 12);

insert into room (number, free) values (10, true);
insert into room (number, free) values (11, true);
insert into room (number, free) values (12, true);
insert into room (number, free) values (13, false);

insert into request(posiljalac_id, admin_id, tip,  datum) values (3, 1, 'Kardioloski', '2020-3-5 16:00:00');

insert into sick (name, description, date_start) values ('Prehlada', 'Obicna', '2019-10-5');
insert into sick (name, description, date_start) values ('Dijabetes', 'Nizak rizik', '2019-5-21');
insert into sick (name, description, date_start) values ('Visok pritisak', '140/80', '2019-8-8');
insert into sick (name, date_start) values ('Uvecanje prostate', '2019-11-3');

insert into visit (name, description, date_time, med_record_id) values ('Poseta1', 'Poslovna poseta', '2019-5-16', 1);
insert into visit (name, description, date_time, med_record_id) values ('Poseta2', 'Porodicna poseta', '2019-3-15', 2);

insert into medicine (name) values ('Defrinol');
insert into medicine (name) values ('Promazepan');
insert into medicine (name) values ('Amoksicilin');

insert into recipe (name, medicine_id) values ('Recept1', 2);
insert into recipe (name, medicine_id) values ('Recept2', 3);

insert into authority (name) values ('ADMINCC');

DROP TABLE IF EXISTS admin_clinic CASCADE;
DROP TABLE IF EXISTS admin_clinic_center CASCADE;
DROP TABLE IF EXISTS doctor CASCADE;
DROP TABLE IF EXISTS medical_sister CASCADE;

alter sequence users_id_seq restart with 4;
alter sequence clinic_center_id_seq restart with 2;
alter sequence clinic_id_seq restart with 3;
alter sequence operation_id_seq restart with 3;
alter sequence room_id_seq restart with 5;
alter sequence sick_id_seq restart with 5;
alter sequence visit_id_seq restart with 3;
alter sequence medicine_id_seq restart with 4;
alter sequence recipe_id_seq restart with 3;
alter sequence authority_id_seq restart with 2;
alter sequence medical_record_id_seq restart with 3;
alter sequence checkup_type_id_seq restart with 3;
alter sequence checkup_id_seq restart with 3;