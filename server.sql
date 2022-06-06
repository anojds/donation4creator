use smc;

create table sendmoneycreator_user(
	`user_id` varchar(15) not null,
    `user_password` char(128) not null,
    `user_email` varchar(50) not null,
    `salt` char(200) not null,
    `user_icon_link` varchar(150),
    `user_header_link` varchar(150),
    `short_description` varchar(30) default 0,
    `create_account_time` char(10) not null,
	`user_description` varchar(500) default 0,
    `tag` varchar(100) default 0,
    `desired_amount` varchar(10) default 0,
	`kakao_payment_url` varchar(50) default 0,
    `toss_payment_url` varchar(50) default 0,
    `paypal_payment_url` varchar(50) default 0,
	PRIMARY KEY(user_id)
);



select * From sendmoneycreator_user;

select user_id, salt, user_password From sendmoneycreator_user where user_id = 'kerbalturbo102';

insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,desired_amount,kakao_payment_url) values('anojds','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'2000','www.anojds.com');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url) values('khjcide','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'www.anojds.com');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url) values('khjcide','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'www.anojds.com');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url,toss_payment_url,paypal_payment_url) values('test_user1','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'https://qr.kakaopay.com/FMkgMcV1I','toss.me/anojds','playpal.me/anojds');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url,toss_payment_url,paypal_payment_url) values('test_user3','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'https://qr.kakaopay.com/FMkgasdasdasdMcV1I','toss.me/anojdsdasdasdasdsdfsdfsdfsdfsdfasds','playpal.me/anojdasdasdassdfsdfsdfsdfdasds');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url,user_description) values('khjcode','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'www.anojds.com','heeloasdaskdalkdhausda,sbdkajbdkasdbakjzsdbkuasdu');
insert into sendmoneycreator_user(user_id,user_password,user_email,salt,short_description,create_account_time,tag,kakao_payment_url,user_description) values('coral','1234','anojds@gmail.com','1','개발자','2022-01-01',1,'www.anojds.com','안녕하세교 저는 buymecofft ㅂ,ㄹ로거이자 개발자입니다 저는 지금 지금의 삶을 포기하고 다시 일어나 새로운 삶을 살아보려고합니다 제가 좋아하는 게임개발도 해보고 에섹을 팔면서 이사이트로 후원을 박아보려고합니다 포하하ㅏ하하ㅏ하ㅏ하하하하 여코 너무 재밌다 진짜 예전이 레전드렸는데 지금은 가요느낌이 나서 별ㄹ로임') 