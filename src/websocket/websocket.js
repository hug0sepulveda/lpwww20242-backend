import { WebSocketServer } from 'ws';

export const startWebSocketServer = (httpServer) => {
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (socket) => {
        console.log('Cliente WebSocket conectado');

        // Enviar datos periódicamente
        const interval = setInterval(() => {
            // Generamos un valor aleatorio de temperatura entre 20 y 35 grados
            const randomValue = (Math.random() * (6) + 20).toFixed(2); // Temperatura entre 20°C y 35°C
            
            // Lógica de control del ventilador
            let ventiladorStatus = 'apagado';
            if (randomValue >= 30) {
                ventiladorStatus = 'encendido'; // Temperatura alta, ventilador encendido
            } else if (randomValue >= 25) {
                ventiladorStatus = 'bajo'; // Temperatura media, ventilador a baja velocidad
            }

            const responseObject = {
                randomValue: randomValue,
                ventiladorStatus: ventiladorStatus
            };

            // Serializa el objeto antes de enviarlo
            socket.send(JSON.stringify(responseObject)); // Enviar al cliente
        }, 1000); // Cada 1 segundo

        // Manejo de cierre de conexión
        socket.on('close', () => {
            console.log('Cliente WebSocket desconectado');
            clearInterval(interval);
        });

        // Manejo de errores
        socket.on('error', (error) => {
            console.error('Error en WebSocket:', error);
        });
    });

    console.log('Servidor WebSocket iniciado');
};
