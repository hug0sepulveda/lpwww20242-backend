import { WebSocketServer } from 'ws';

export const startWebSocketServer = (httpServer) => {
    const wss = new WebSocketServer({ server: httpServer });

    // Estado inicial de la temperatura y el ventilador
    let currentTemperature = 25; // Temperatura inicial
    let ventiladorStatus = 'apagado'; // Estado inicial del ventilador

    wss.on('connection', (socket) => {
        console.log('Cliente WebSocket conectado');

        // Función para generar cambios en la temperatura
        const generateTemperature = () => {
            if (ventiladorStatus === 'encendido') {
                // Si el ventilador está encendido, disminuye la temperatura lentamente
                currentTemperature += (-Math.random() * 0.35) + 0.1; 
            } else {
                // Si el ventilador está apagado, la temperatura sube o fluctúa
                currentTemperature += Math.random() * 0.75 - 0.25; 
            }

            // Asegurar que la temperatura no sea negativa
            currentTemperature = Math.max(currentTemperature, 0);

            // Redondear a dos decimales
            return currentTemperature.toFixed(2);
        };

        // Función para manejar el estado del ventilador
        const controlVentilator = () => {
            if (currentTemperature >= 30) {
                ventiladorStatus = 'encendido';
            } else if (currentTemperature <= 20) {
                ventiladorStatus = 'apagado';
            }
            return ventiladorStatus;
        };

        // Enviar datos periódicamente
        const interval = setInterval(() => {
            const randomValue = generateTemperature();
            const ventiladorStatus = controlVentilator();

            const responseObject = {
                randomValue,
                ventiladorStatus,
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
