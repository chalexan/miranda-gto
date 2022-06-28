import * as constant from "./constant";

// найти и выдать всех парнеров

export const getPartners = async () => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/partner`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Incoming /GET: ', result)
    return { code: 3, data: result };

}

// удалить партнера

export const removePartnersById = async (idPartner) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/partner`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idPartner })
    });

    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Incoming /DELETE: ', result)
    return { code: 3, data: result };

}

// добавить нового партнера

export const savePartners = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/partner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Outcoming /POST: ', result)
    return { code: 3, data: result };

}

// отредактировать нового партнера

export const modifyPartners = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/partner`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Outcoming /PATCH: ', result)
    return { code: 3, data: result };

}

// найти и выдать все устройства

export const getDevices = async () => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/devices`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Incoming /GET: ', result)
    return { code: 3, data: result };

}