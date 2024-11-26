import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Criar servidor HTTP
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL do Front-End React
        methods: ["GET", "POST"],
    }
});

// Estado inicial dos dispositivos
let dispositivosSala = {
    luzOn: false,
    tvOn: false,
    arOn: false
};

let dispositivosCozinha = {
    luzOn: false,
    geladeiraOn: false,
    fogaoOn: false
};

let dispositivosQuarto = {
    luzOn: false,
    cortinaOn: false,
    tvOn: false,
    arCondicionadoOn: false,
    abajurOn: false,
    somOn: false
};

// Escuta os eventos de conexão do socket
io.on('connection', (socket) => {
    console.log('Cliente conectado', socket.id);

    // Enviar estado inicial dos dispositivos para o cliente
    socket.emit('estadoInicialSala', dispositivosSala);
    socket.emit('estadoInicialCozinha', dispositivosCozinha);
    socket.emit('estadoInicialQuarto', dispositivosQuarto);

    // Sala
    socket.on('acenderLuzSala', () => {
        dispositivosSala.luzOn = !dispositivosSala.luzOn;
        io.emit('acenderLuzSala', dispositivosSala);
    });
    socket.on('ligarTvSala', () => {
        dispositivosSala.tvOn = !dispositivosSala.tvOn;
        io.emit('ligarTvSala', dispositivosSala);
    });
    socket.on('ligarArSala', () => {
        dispositivosSala.arOn = !dispositivosSala.arOn;
        io.emit('ligarArSala', dispositivosSala);
    });

    // Cozinha
    socket.on('acenderLuzCozinha', () => {
        dispositivosCozinha.luzOn = !dispositivosCozinha.luzOn;
        io.emit('acenderLuzCozinha', dispositivosCozinha);
    });
    socket.on('ligarGeladeiraCozinha', () => {
        dispositivosCozinha.geladeiraOn = !dispositivosCozinha.geladeiraOn;
        io.emit('ligarGeladeiraCozinha', dispositivosCozinha);
    });
    socket.on('ligarFogaoCozinha', () => {
        dispositivosCozinha.fogaoOn = !dispositivosCozinha.fogaoOn;
        io.emit('ligarFogaoCozinha', dispositivosCozinha);
    });

    // Quarto
    socket.on('ligarLuzQuarto', () => {
        dispositivosQuarto.luzOn = !dispositivosQuarto.luzOn;
        io.emit('ligarLuzQuarto', { luzOn: dispositivosQuarto.luzOn });
    });
    socket.on('ligarTvQuarto', () => {
        dispositivosQuarto.tvOn = !dispositivosQuarto.tvOn;
        io.emit('ligarTvQuarto', { tvOn: dispositivosQuarto.tvOn });
    });
    socket.on('ligarArCondicionadoQuarto', () => {
        dispositivosQuarto.arCondicionadoOn = !dispositivosQuarto.arCondicionadoOn;
        io.emit('ligarArCondicionadoQuarto', { arCondicionadoOn: dispositivosQuarto.arCondicionadoOn });
    });
    socket.on('ligarAbajurQuarto', () => {
        dispositivosQuarto.abajurOn = !dispositivosQuarto.abajurOn;
        io.emit('ligarAbajurQuarto', { abajurOn: dispositivosQuarto.abajurOn });
    });
    socket.on('ligarSomQuarto', () => {
        dispositivosQuarto.somOn = !dispositivosQuarto.somOn;
        io.emit('ligarSomQuarto', { somOn: dispositivosQuarto.somOn });
    });
});

// Iniciar Servidor
const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
