import { fetchJSON } from "https://code4sabae.github.io/js/fetchJSON.js";

const WebPush = {};
WebPush.getID = () => {
    const uuid = localStorage.getItem("subscription");
    if (uuid) {
        return uuid;
    }
    return null; // WebPush.subscribe();
};
WebPush.subscribe = async () => {
    try {
        if (!window.PushManager) {
            console.log("not supported WebPush");
            return;
        }
        //localStorage.removeItem("subscription")
        const uuid = WebPush.getID();
        console.log(uuid);
        if (uuid) {
            return;
        }
        Notification.requestPermission(async permission => {
            console.log(permission); // 'default', 'granted', 'denied'
            if (permission !== "granted") {
                return;
            }
            //const vapidPublicKey = new Uint8Array(await (await fetch("./vapidPublicKey.bin")).arrayBuffer());
            const vapidPublicKeyTxt = await (await fetch("./vapidPublicKey.txt")).text();
            const vapidPublicKey = WebPush.base64ToUint8Array(vapidPublicKeyTxt);
            const registration = await navigator.serviceWorker.register("./WebPushWorker.js", { scope: "/" });
            console.log(registration, vapidPublicKey);
            await navigator.serviceWorker.ready;

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey
            });
            //console.log(JSON.stringify(subscription, null, 2));
            console.log(JSON.stringify(subscription));
            //const uuid = await (await fetchPost("./api/registSubscription", subscription)).json();
            const res = await fetchJSON("./api/subscribe", subscription);
            console.log(res);
            localStorage.setItem("subscription", res.uuid);
            return res.uuid;
        });
    } catch (e) {
        console.log(e);
    }
    return null;
};
WebPush.unsubscribe = async () => {
    try {
        if (!window.PushManager) {
            console.log("not supported WebPush");
            return;
        }
        Notification.requestPermission(async permission => {
            console.log(permission); // 'default', 'granted', 'denied'
            if (permission !== "granted") {
                return;
            }
            //const vapidPublicKey = new Uint8Array(await (await fetch("./vapidPublicKey.bin")).arrayBuffer());
            const vapidPublicKeyTxt = await (await fetch("./vapidPublicKey.txt")).text();
            const vapidPublicKey = WebPush.base64ToUint8Array(vapidPublicKeyTxt);
            const registration = await navigator.serviceWorker.register("./WebPushWorker.js", { scope: "/" });
            console.log(registration, vapidPublicKey);

            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey
            });
            const res = await subscription.unsubscribe();
            console.log(res);
            const uuid = WebPush.getID();
            if (uuid) {
                localStorage.removeItem("subscription");
                await fetchJSON("./api/unsubscribe", { uuid });
            }
        });
    } catch (e) {
        console.log(e);
    }
}
WebPush.base64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    //const rawData = new Buffer(base64, "base64").toString("ascii");
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
WebPush.push = async (data) => {
    const uuid = WebPush.getID();
    if (!uuid) {
        return { err: "no subscription"}
    }
    return await fetchJSON("./api/push", { uuid, data });
};

export { WebPush };