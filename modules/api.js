export const get = async (url) => {
    try {
        const result = await fetch(url);
        if (!result) return;
        return result.json();
    } catch(err) {
        throw err;
    }
}

export const post = async (url, data) => {
    try {
        const result = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!result) return;
        return result.json();
    } catch(err) {
        throw err;
    }
}

export const patch = async (url, data) => {
    try {
        const result = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!result) return;
        return result.json();
    } catch(err) {
        throw err;
    }
}

export const del = async (url) => {
    try {
        const result = await fetch(url, {
            method: "DELETE",
        });
        if (!result) return;
        return result.json();
    } catch(err) {
        throw err;
    }
}