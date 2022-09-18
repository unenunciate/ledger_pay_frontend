import { strapiHeaders } from "./headers";

const getMe = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`, strapiHeaders());

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

const getUserFromStytch = async (stytchUUID) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/getUser?stytches=[${stytchUUID}]`, strapiHeaders());

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export {
    getMe,
    getUserFromStytch
}