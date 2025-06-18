import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../infra/db/drizzle";
import {
    username,
    magicLink,
    apiKey,
    admin,
    organization,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    appName: "quartonext",
    plugins: [
        organization(),
        admin(),
        apiKey(),
        magicLink({
            sendMagicLink({ email, token, url }, request) {
                // Send email with magic link
                console.log(`Enviar link mágico para ${email}: ${url}`);
            },
        }),
        username(),
        nextCookies(),
    ],
});
