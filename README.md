# Chatify

Aplicación de chat en tiempo real organizada por canales, al estilo Discord. Este repositorio contiene la interfaz en React. El servidor está en [Server-chatify](https://github.com/diegodelgadog6/Server-chatify).

**Demo:** https://chatify.diegodelgadogontes.com

## Funcionalidades

- Elegir un nombre de usuario antes de entrar al chat.
- Cuatro canales: `#general`, `#random`, `#tech talk` y `#gaming`.
- Mensajes en tiempo real con Socket.IO.
- Historial del canal al entrar, guardado en PostgreSQL por el servidor.
- Lista de usuarios conectados en el canal, con avisos de quién entra y sale.
- Indicador de "está escribiendo…".
- Burbujas que distinguen los mensajes propios de los de los demás.
- Botones para conectar y desconectar el socket manualmente.

## Tecnologías

React 19 · Vite · Socket.IO Client · Vercel

## Estructura

```text
src/
  App.jsx                    Estado principal: usuario, canal y eventos del socket
  socket.js                  Cliente de Socket.IO
  components/
    UsernamePrompt.jsx       Pantalla para elegir el nombre de usuario
    Channels.jsx             Lista de canales
    Chats.jsx                Historial y mensajes nuevos
    MyForm.jsx               Envío de mensajes e indicador de escritura
    Users.jsx                Usuarios conectados en el canal
    ManageConnection.jsx     Conectar y desconectar
```

## Desarrollo local

Requiere Node.js 20 o superior y el [servidor](https://github.com/diegodelgadog6/Server-chatify) corriendo.

```bash
npm install
npm run dev
```

La app queda en http://localhost:5173 y se conecta por defecto a `http://localhost:3000`. Para usar otro servidor, crea un archivo `.env`:

```bash
VITE_SOCKET_URL=https://tu-servidor.com
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build localmente |
| `npm run lint` | Ejecuta ESLint |

## Videos de los tickets

El desarrollo se dividió en tickets. Cada video explica uno:

| Ticket | Video |
| --- | --- |
| 1 | [Ticket-01.mp4](Ticket-01.mp4) |
| 2 | [Ticket2 - Explicacion.mp4](Ticket2%20-%20Explicacion.mp4) |
| 3 | [Ticket3 - Explicacion.mp4](Ticket3%20-%20Explicacion.mp4) |
| 4 | [Ticket4- Explicacion.mp4](Ticket4-%20Explicacion.mp4) |
| 5 | [Ticket5 - Explicacion.mp4](Ticket5%20-%20Explicacion.mp4) |

## Equipo

Proyecto en equipo del Tecnológico de Monterrey. Repositorio mantenido por [Diego Delgado](https://github.com/diegodelgadog6).
