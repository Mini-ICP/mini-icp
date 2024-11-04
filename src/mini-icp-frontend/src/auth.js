import { AuthClient } from "@dfinity/auth-client";

export const createAuthClient = async () => {
    return await AuthClient.create();
};

export const IILogin = async () => {
    const authClient = await createAuthClient();

    return await new Promise((resolve, reject) => {
        const existingIdentity = authClient.getIdentity();
        if(
            existingIdentity &&
            existingIdentity.getPrincipal().toString() !== "2vxsx-fae"
        ){
            return resolve(existingIdentity.getPrincipal().toString());
        }

        authClient.login({
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                const identity = await authClient.getIdentity();
                resolve(identity.getPrincipal().toString());
            },
            onError: (err) => {
                reject(err);
            },
        });
    });
};

export const IILogout = async () => {
    const authClient = await createAuthClient();
    return await authClient.logout({ returnTo: "/" });
}