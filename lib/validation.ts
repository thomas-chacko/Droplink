// email validation function
export function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// username validation function
export function validateUsername(username: string) {
    const re = /^[a-zA-Z0-9_]{3,30}$/;
    return re.test(username);
}
