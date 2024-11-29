// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

// Print a greeting in the terminal.
// FIXME: logs on both client and server. weird. (only want client)

async function getGreeting(event: { fetch: Function }) {

    const response = await event.fetch('/greeting.txt');

    if (!response.ok) {
        throw new Error('Failed to fetch greeting.txt');
    }

    return await response.text();
}

export const load = async (event: { fetch: Function }) => {

    const greetingContent = await getGreeting(event);

    console.log(greetingContent);

    return {
        greeting: greetingContent
    };
};