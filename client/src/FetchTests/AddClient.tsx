//файл описания логики добавления нового клиента
import React, { useState } from "react";
import { ClientProperties, clientPropertyList, clientFieldMetadata } from "./Types";

const initialClientValues: ClientProperties = {
  name: "",
  surname: "",
  adress: "",
  email: "",
  phoneNumber: "",
  company: "",
};

export const AddClient = () => {
  // Введенные данные клиента
  const [client, setClient] = useState<ClientProperties>(initialClientValues); // начальное состояние

  const [id, setId] = useState<string | null>(null);

  const addClient = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client), //джсон стринггифай переводит данные в жсон формат
    });
  };

  const updateClient = async () => {
    await fetch("http://localhost:8080/client", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client),
    });
  };

  return (
    <div className="app-tab">
      <table>
        {clientPropertyList.map((field) => {
          const { label, type } = clientFieldMetadata[field];
          return (
            <tr key={field}>
              <td style={{ textAlign: "right" }}>
                <label htmlFor={field}>{label}:</label>
              </td>
              <td>
                <input
                  type={type}
                  name={field}
                  // Передаем в поле ввода текущее значение
                  value={client[field]}
                  // Подписываемся на изменение значения поля, При изменении значения поля ввода вызывается функция setUser, которая обновляет объект user, заменяя значение под ключом, соответствующим значению переменной field, на новое значение, полученное из события onChange
                  onChange={(ev) => setClient({ ...client, [field]: ev.currentTarget.value })}
                />
              </td>
            </tr>
          );
        })}
      </table>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={addClient}>Создать</button>
        {id && <button onClick={updateClient}>Редактировать</button>}
      </div>
    </div>
  );
};
