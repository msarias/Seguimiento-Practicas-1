const Notificacion = require("../Models/Notificacion");

const notificacionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on("registrar_usuario", ({ userId, tipo }) => {
      const room = `${tipo}_${userId}`;
      socket.join(room);
      console.log(` Usuario unido a la sala ${room}`);
    });
  });
};

module.exports = notificacionSocket;
