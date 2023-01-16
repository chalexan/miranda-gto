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

// отредактировать нового партнера

export const modifyDevices = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/devices`, {
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

//удалить устройство по id
export const removeDeviceById = async (idDevice) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/device`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: idDevice })
    });

    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('Incoming /DELETE: ', result)
    return { code: 3, data: result };

}

// залогиниться

export const loginReq = async (data) => {

    const api = constant.serverAPI;

    try {
        const response = await fetch(`${api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (!response.ok)
            return { code: 1, data: `${response.status} - ${response.statusText}` };

        const result = await response.json();
        console.log('Outcoming /POST: ', result)
        return { code: 3, data: result };
    } catch (error) {
        console.error('Ошибка fetch:', error);
        return { code: 1, data: error }
    };
}

// найти и выдать все категории

export const getTags = async () => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/tags`, {
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

// найти и выдать все категории

export const getOperation = async () => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/operation`, {
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

// добавить новое оборудование

export const saveNewDevice = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/device`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('034: Outcoming /POST: ', result)
    return { code: 3, data: result };

}

// сохранить в истории

export const saveToHistory = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('034: Outcoming /POST: ', result)
    return { code: 3, data: result };

}

// найти и выдать история

export const getHistory = async () => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/history`, {
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

// выдача оборудования - через сущность giveAway
export const purchaseGiveAway = async (data) => {

    const api = constant.serverAPI;

    const response = await fetch(`${api}/purchase`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    if (!response.ok)
        return { code: 1, data: `Ошибка: ${response.status} - ${response.statusText}` };

    const result = await response.json();
    console.log('034: Outcoming /POST: ', result)
    return { code: 3, data: result };

}

// проверка сервера
export const checkServer = async () => {
    const api = constant.serverAPI;
    try {
        const response = await fetch(`${api}/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.statusText;
        console.log('Incoming status: ', result)
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }


}