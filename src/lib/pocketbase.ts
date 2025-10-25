import PocketBase from 'pocketbase';

const pb = new PocketBase('');


export function setAuthToken(token: string) {
    if (token) {
        pb.authStore.save(token);
    }
}


export default pb;