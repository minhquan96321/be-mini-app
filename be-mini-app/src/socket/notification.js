import { Hono } from 'hono'
import { upgradeWebSocket, serveStatic } from 'hono/cloudflare-workers'
// import { createWebSocketServer } from 'hono/cloudflare-workers';
const message = new Hono()
// const rooms = new Map(); //
let rooms = []; // Use

// message.get('/ws', upgradeWebSocket(async (socket) => {

//     return {
//         onMessage: (event, ws) => {
//             ws.send("okok")
//         },
//         onClose: (event, ws) => {
//             // console.log('ws :', ws);
//             console.log('WebSocket connection closed')
//         }

//     }
// }))

message.get('/ws/room', upgradeWebSocket(async (ws) => {
    const req = ws.req.path;
    const res = req.split('/')[2];

    // Create room if it doesn't exist


    // const clients = rooms.get(room);
    // clients.add(ws);


    return {
        onMessage: (event, w) => {
            console.log(event.data)
            if (rooms.length === 0) {
                rooms.push(w);
                console.log('rooms :', rooms);
                // console.log('rooms :', rooms);
            } else {

                for (let i = 0; i < rooms.length; i++) {
                    if (w != rooms[i]) {
                        rooms.push(w)
                        console.log('rooms :', rooms);
                    }
                }
            }

            // console.log('rooms :', rooms)
        },

        onClose: (event, w) => {
            rooms = rooms.filter(ws => ws !== w);
            console.log('WebSocket connection removed from rooms.');
        }
    }
}));



export default message

