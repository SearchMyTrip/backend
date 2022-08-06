create table favourites (
    uid int,
    image varchar(255) not null,
    name varchar(100) not null,
    description text not null,
    location varchar(100) not null,
    visited boolean default false
)

