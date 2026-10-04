import { API_URL } from "./client";

export async function createUser(data) {
    let res;
    try {
        res = await fetch(`${API_URL}/users/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    } catch {
        return{ ok: false, status: 0, data: null };
    }
    let body = null;
    try {
        body = await res.json();
    } catch {
    }
    return { ok: res.ok, status: res.status, data: body };
}

export function mapValidationErrors(detail) {
    const errs = {};
    for (const d of detail) {
        const field = d.loc.length > 1 ? d.loc[1] : "confirm_password";
        if (!errs[field])
            errs[field] = d.msg.replace(/^Value error, / , "");
    }
    return errs;
}