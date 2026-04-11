insert into roles (name, description)
values ('admin', 'Platform administrator with elevated access.')
on conflict (name) do nothing;
