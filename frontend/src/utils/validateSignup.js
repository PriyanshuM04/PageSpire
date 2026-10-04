export function validateSignup(f) {
    const e = {};
    if (f.fullname.trim().length < 2) e.fullname = "Enter your full name";
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(f.username))
        e.username = "3-30 characters: letters, numbers, underscore";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) 
        e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(f.phone))
        e.phone = "Enter a 10-digit phone number";
    if (f.password.length < 8 || f.password.length > 64)
        e.password = "Password must be 8-64 characters";
    if (f.confirm_password !== f.password)
        e.confirm_password = "Passwords do not match";
    if (!f.dob) 
        e.dob = "Select your date of birth";
    else if (new Date(f.dob) > new Date())
        e.dob = "Date of birth can't be in the future";
    if (f.country.trim().length < 2)
        e.country = "Enter your country";
    for (const n of ["social_link_1", "social_link_2", "social_link_3"]) {
        if (f[n] && !/^https?:\/\/.+/.test(f[n]))
            e[n] = "Must start with http:// or https://";
    }
    return e;
}