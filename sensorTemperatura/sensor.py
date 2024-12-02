import asyncio
import websockets
import json
import random

# Estado inicial de la temperatura y el ventilador
current_temperature = 25  # Temperatura inicial
ventilador_status = 'apagado'  # Estado inicial del ventilador

# Función para generar cambios en la temperatura
def generate_temperature():
    global current_temperature
    if ventilador_status == 'encendido':
        # Si el ventilador está encendido, disminuye la temperatura lentamente
        current_temperature += (-random.random() * 0.35) + 0.1
    else:
        # Si el ventilador está apagado, la temperatura sube o fluctúa
        current_temperature += random.random() * 0.75 - 0.25

    # Asegurarse de que la temperatura no sea negativa
    current_temperature = max(current_temperature, 0)

    # Redondear la temperatura a dos decimales
    return round(current_temperature, 2)

# Función para manejar el estado del ventilador
def control_ventilator():
    global ventilador_status
    if current_temperature >= 30:
        ventilador_status = 'encendido'
    elif current_temperature <= 20:
        ventilador_status = 'apagado'
    return ventilador_status

# Función para manejar las conexiones WebSocket
async def handle_connection(websocket):
    print("Cliente WebSocket conectado")

    try:
        while True:
            # Generar temperatura y controlar el ventilador
            temperature = generate_temperature()
            ventilador_status = control_ventilator()

            # Crear el objeto de respuesta
            response_object = {
                "randomValue": temperature,
                "ventiladorStatus": ventilador_status,
            }

            # Enviar el objeto al cliente
            await websocket.send(json.dumps(response_object))

            # Esperar 1 segundo antes de enviar el siguiente valor
            await asyncio.sleep(1)

    except websockets.exceptions.ConnectionClosed:
        print("Cliente WebSocket desconectado")
    except Exception as e:
        print(f"Error en WebSocket: {e}")

# Función para iniciar el servidor WebSocket
async def start_server():
    # Iniciar el servidor WebSocket en localhost y puerto 4003
    server = await websockets.serve(handle_connection, "localhost", 4003)
    print('Servidor WebSocket iniciado en ws://localhost:4003')
    await server.wait_closed()

# Iniciar el servidor WebSocket
if __name__ == "__main__":
    asyncio.run(start_server())
