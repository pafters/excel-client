import axios from "axios"

async function sendPost(method, body, headers, params = '') {
    const answer = await axios.post(`http://localhost:5000/api/${method}${params}`, body, { headers: headers })
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

export const uploadFile = async (formData) => {
    return await sendPost('files/upload-file',
        formData,
        {
            'Content-Type': 'multipart/form-data',
        }
    );
}

export const getTableNames = async () => {
    return await sendGet(
        'files/get-table-names',
        ''
    );
}

export const getTableJson = async (tableName, main) => {
    return await sendGet(
        'files/get-table',
        `/?tableName=${tableName}&main=${main}`,
    );
}

export const deleteTable = async (tableName, main) => {
    return await sendPost(
        'files/delete-table',
        {
            tableName: tableName,
            main: main
        },
    );
}

export const getFile = async (name) => {
    return await sendGet(
        'files/data',
        `/${name}`,
    )
}

export const mergeTables = async (name) => {
    return await sendPost('files/add-to-main-table',
        {
            tableName: name
        }
    );
}

export const changeMain = async (name) => {
    return sendPost('files/switch-main-table',
        {
            tableName: name
        }
    );
}