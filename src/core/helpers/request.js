export const API_HOST = process.env.REACT_APP_API_HOST;

export const makeGetParam = (objParam = {}) => {
    let result = '';
    let arrArgs = Object.keys(objParam);

    arrArgs.forEach((x, y) => {
        result += y < 1 ? '&' : '';

        const val = objParam[x];

        if (!val) {
            return;
        } else if (Array.isArray(val)) {
            if (!val.length) {
                return;
            }
            val.forEach((a, b) => {
                result += `${x}[${b}]=${a}`;
                result += b < val.length - 1 ? '&' : '';
            });
        } else {
            result += `${x}=${encodeURIComponent(val)}`;
        }

        result += y < arrArgs.length - 1 ? '&' : '';
    });

    return result;
};

export const reqGet = async (url) => {
    const req = await fetch(url);
    return req;
};

export const handleRequest = async (params) => {
    let { body } = params;
    let error = null;
    let result = null;
    let status = false;
    let data = null;
    let dataError = null;
    let statusCode = null;

    try {
        result = await body();

        if (!result.ok) {
            throw new Error(result.statusText);
        }
        statusCode = result.status;
        data = await result.json();
        status = true;
    } catch (e) {
        dataError = await result.json();
        statusCode = result.status;
        error = e.message;
        result = false;
    }

    return {
        result,
        data,
        error,
        status,
        dataError,
        statusCode
    };
};
