export function validateInput(name, value) {
    console.log("validating ", name, "...")
    let valid = true;

    const y = new Date().getFullYear();

    switch (name) {
        case "year":
            if (!value || value < 1900 || value > y) {
                valid = false;
            }
            break;
        case "month":
            if (value < 1 || value > 12) {
                valid = false;
            }
            break;
        case "date":
            if (value < 1 || value > 31) {
                valid = false;
            }
            break;
        default:
    }
    return valid;
}