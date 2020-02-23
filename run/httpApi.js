const axios = require('axios');

exports.buildUrl = (host, query) => {
    const ret = [];
    for (let d in query) {
        if (query[d]) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(query[d]));
        }
    }
    return host + '?' + ret.join('&');
};

exports.get = async (host, query, urls) => {
    try {
        let url = exports.buildUrl(host, query);
        if (urls)
            urls.push(url);
        return (await axios.get(url)).data;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    }

};

// exports.getIncludeError = async (host, query, urls) => {
//     try {
//         let url = exports.buildUrl(host, query);
//         if (urls)
//             urls.push(url);
//         return (await axios.get(url)).data;
//     } catch (e) {
//         // eslint-disable-next-line no-console
//         return e;
//     }
// };

exports.getAll = async (res, host, query, listName) => {
    let list = [];
    let urls = [];
    let error = "Api Get request call fail";
    do {
        // eslint-disable-next-line no-await-in-loop
        let data = await exports.get(host, query, urls);
        if (!data) {
            list = undefined;
            break;
            // return res.status(500).send("Api Get request call fail");
        } else if (!data[listName ? listName : 'items']) {
            error = data;
            list = undefined;
            break;
        } else {
            list = list.concat(data[listName ? listName : 'items']);
            query.pageToken = data.nextPageToken;
        }
    } while (query.pageToken);

    // Debug
    let data = {
        // urls: urls,
        // query: query,
        // host: host,
    };
    data[listName ? listName : 'items'] = list;
    if (!list)
        data.error = error;
    return res.send(data);
};

exports.post = async (host, query, data) => {
    try {
        return (await axios.post(exports.buildUrl(host, query), JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })).data;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    }
};

exports.patch = async (host, query, data) => {
    try {
        return (await axios.patch(exports.buildUrl(host, query), JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
            }
        })).data;
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    }
};

exports.delete = async (host, query) => {
    try {
        let res = await axios.delete(exports.buildUrl(host, query));
        return res.status === 200 || res.status === 204;
    } catch (e) {
        if (e.status === 204)
            return true;
        else
            // eslint-disable-next-line no-console
            console.error(e);
        return false;
    }
};