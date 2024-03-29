-- Запросы для инициализации базы

CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  name CHAR(300),
  surname CHAR(300),
  adress CHAR(300),
  phoneNumber CHAR(15),
  email CHAR(300),
  company CHAR(100)
);

INSERT INTO clients (id, name, surname, adress, phoneNumber, email, company)
VALUES
  ('0d067d44-fe99-450f-9044-2a7cb915f78c', 'София',    'Матвеева', 'ул. Андрюшкина 23',  '123456789', 'sofia@mail.ru',  'sofiaCO'),
  ('05a7fae3-26c5-4bf9-81f3-5885b330ba3c', 'Виктория', 'Пирогова', 'ул. Пушника 36',     '23567891',  'vika@mail.ru',   'vikaCO'),
  ('68d8b2f6-b7ee-4899-b399-5c3f414a98b7', 'Кирилл',   'Иванов',   'ул. Победы 78',      '345678912', 'kirill@mail.ru', 'kiraCO'),
  ('3568ef37-1d9a-4cb2-abee-7d92e32451e4', 'Вероника', 'Сорокина', 'ул. Грибоедова 253', '456789123', 'veron@mail.ru',  'veraCO'),
  ('ce5636f3-c29e-4ad7-999c-068ec2fc923f', 'Ярослав',  'Шишкин',   'ул. Восстания 2',    '567891234', 'yarod@mail.ru',  'yaroCO')
ON CONFLICT (id) DO NOTHING;


CREATE TABLE IF NOT EXISTS contracts (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  clientID UUID REFERENCES clients(ID) ON DELETE CASCADE NOT NULL,
  contractNumber SERIAL,
  dateBegin DATE,
  dateEnd DATE,
  price NUMERIC
);

INSERT INTO contracts (id, clientId, dateBegin, dateEnd, price) 
VALUES 
  ('76a2255b-72aa-4d2f-b559-1c67094de1df', '0d067d44-fe99-450f-9044-2a7cb915f78c', '1999-01-08', '1999-01-29',	15000),
  ('d7d7f715-4bf2-47b0-a4bc-72ba222d15aa', '05a7fae3-26c5-4bf9-81f3-5885b330ba3c', '1999-01-08', '1999-02-15',	15004),
  ('75bfba39-e760-4c6e-b3f2-16a451ac650d', '68d8b2f6-b7ee-4899-b399-5c3f414a98b7', '1999-01-08', '1999-03-29',	15005),
  ('a5c0be17-e0f4-43f9-a616-06fc30d7409a', '3568ef37-1d9a-4cb2-abee-7d92e32451e4', '1999-01-08', '1999-04-29',	15006),
  ('76e537b6-06aa-45a9-8f9e-5e9d9e0d5196', 'ce5636f3-c29e-4ad7-999c-068ec2fc923f', '1999-01-08', '1999-05-29',	15007)
ON CONFLICT (id) DO NOTHING;
--= ඞ =--