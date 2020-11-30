create table waiters(
	id serial not null primary key,
	waiters_names text not null
);

create table weekdays(
	id serial not null primary key,
	day_name text not null
);

insert into weekdays (day_name) values ('Monday');
insert into weekdays (day_name) values ('Tuesday');
insert into weekdays (day_name) values ('Wednesday');
insert into weekdays (day_name) values ('Thursday');
insert into weekdays (day_name) values ('Friday');
insert into weekdays (day_name) values ('Saturday');
insert into weekdays (day_name) values ('Sunday');

create table admin(
	id serial not null primary key,
    waiters_id int,
	day_id int,
foreign key (waiters_id) references waiters(id),
foreign key (day_id) references weekdays(id)
);


