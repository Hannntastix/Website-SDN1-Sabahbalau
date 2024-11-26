"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAuthStatus = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
        throw new Error("Invalid user data");
    }

    // Kembalikan informasi user jika diperlukan
    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
        },
    };
};
