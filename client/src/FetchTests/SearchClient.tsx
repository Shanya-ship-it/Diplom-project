//файл описания логики добавления нового клиента
import React, { useState } from "react";
import { ClientProperties, clientPropertyList, clientFieldMetadata, Client } from "./Types";
import { useParams } from "react-router-dom";

const initialClientValues: ClientProperties = {
  firstname: "",
  lastname: "",
  secondname: "",
  email: "",
  phoneNumber: "",
};

export const SearchClient = () => {
  // Введенные данные клиента
  const [client, setClient] = useState<ClientProperties>(initialClientValues); // начальное состояние

  const [id, setId] = useState<string | null>(null);
  const { srchcl } = useParams();
  /*
  const searchClient = async () => {
    // Передаем данные в бэк
    await fetch("http://localhost:8080/clientS", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(client), //джсон стринггифай переводит данные в жсон формат
    });
  };*/

  const getClient = async () => {
    const res = await fetch(`http://localhost:8080/client/${srchcl}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    // Парсим полученный JSON
    const json: Client = await res.json();
    // Обновляем список клиентов
    setClient(json); //?
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
        <button onClick={getClient}>Поиск</button>
      </div>
    </div>
  );
};
