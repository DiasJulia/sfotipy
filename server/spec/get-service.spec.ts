import http = require('http');

describe('Route Tests', () => {
    let server: http.Server;

    beforeAll(() => {
        server = http.createServer((req, res) => {
            if (req.url === '/users' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify([{ id: 1, name: 'Angel', picture: '', email: 'angel@gmail.com', password: '1234', followers: 0, artist: false, playlists: [] }]));
                res.end();
            } else if (req.url === '/users/1' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ id: 1, name: 'Angel', picture: '', email: 'angel@gmail.com', password: '1234', followers: 0, artist: false, playlists: [] }));
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ error: 'User not found.' }));
                res.end();
            }
        });

    });

    afterAll(() => {
        server.close();
    });

    it('Should return the user which has the same ID', (done) => {
        http.get('http://localhost:3000/users/1', (response: http.IncomingMessage) => {
            expect(response.statusCode).toBe(200);
            let data = '';
            response.on('data', (chunk: string) => {
                data += chunk;
            });
            response.on('end', () => {
                expect(JSON.parse(data)).toEqual({ id: 1, name: 'Angel', picture: '', email: 'angel@gmail.com', password: '1234', followers: 0, artist: false, playlists: [] });
                done();
            });
        });
    });
    it('return error 444 when trying to search for a non-existent user', (done) => {
        http.get('http://localhost:3000/users/999', (response: http.IncomingMessage) => {
            expect(response.statusCode).toBe(404);
            let data = '';
            response.on('data', (chunk: string) => {
                data += chunk;
            });
            response.on('end', () => {
                expect(JSON.parse(data)).toEqual({ error: 'User not found.' });
                done();
            });
        });
    });
});