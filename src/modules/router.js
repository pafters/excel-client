import axios from "axios"

async function sendPost(method, body, headers, params = '') {
    const answer = await axios.post(`http://localhost:5000/api/${method}${params}`, body, { headers: headers })
    if (answer)
        return answer
}

async function sendDelete(method, body, headers, params = '') {
    const answer = await axios.delete(`http://localhost:5000/api/${method}${params}`, body, { headers: headers })
    if (answer)
        return answer
}

async function sendGet(method, params = '', headers) {
    const answer = await axios.get(`http://localhost:5000/api/${method}${params}`, {
        headers: headers
    })
    if (answer)
        return answer
}

export const authorize = async (data) => {
    return await sendPost('users/auth', data)
}

export const checkToken = async (token) => {
    return await sendGet(
        'users/token-life',
        '',
        {
            'AuthorizationToken': `${token}`
        }
    )
}

export const uploadFile = async (formData, token) => {
    return await sendPost('files/upload-file',
        formData,
        {
            'Content-Type': 'multipart/form-data',
            'AuthorizationToken': `${token}`
        }
    );
}

export const getTableNames = async (token) => {
    return await sendGet(
        'files/get-table-names',
        '',
        {
            'AuthorizationToken': `${token}`
        }
    );
}

export const getTableJson = async (tableName, main, token) => {
    return await sendGet(
        'files/get-table',
        `/?tableName=${tableName}&main=${main}`,
        {
            'AuthorizationToken': `${token}`
        }
    );
}

export const deleteTable = async (tableName, main, token) => {
    return await sendPost(
        'files/delete-table',
        {
            tableName: tableName,
            main: main
        },
        {
            'AuthorizationToken': `${token}`
        }
    );
}

export const getFile = async (name, token) => {
    return await sendGet(
        'files/data',
        `/${name}`,
        {
            'AuthorizationToken': `${token}`
        }
    )
}

export const mergeTables = async (name, token) => {
    return await sendPost('files/add-to-main-table',
        {
            tableName: name
        },
        {
            'AuthorizationToken': `${token}`
        }
    );
}

export const changeMain = async (name, token) => {
    return sendPost('files/switch-main-table',
        {
            tableName: name
        },
        {
            'AuthorizationToken': `${token}`
        }
    );
}