import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import './style.css';
import luz from '../images/luz.png';
import tv from '../images/tv.png';
import arCondicionado from '../images/ar.png';
import abajur from '../images/abajur.png';
import somOnIcone from '../images/som.png';
import somOffIcone from '../images/som_off.png';

export default function Quarto() {
    const socket = io('http://localhost:4000');

    interface EstadoInicial {
        luzOn: boolean;
        ventiladorOn: boolean;
        cortinaOn: boolean;
        tvOn: boolean;
        arCondicionadoOn: boolean;
        abajurOn: boolean;
        somOn: boolean;
    }

    const [estadoInicial, setEstadoInicial] = useState<EstadoInicial>({
        luzOn: false,
        ventiladorOn: false,
        cortinaOn: false,
        tvOn: false,
        arCondicionadoOn: false,
        abajurOn: false,
        somOn: false,
    });

    const somAudio = useRef<HTMLAudioElement | null>(null); // Referência ao áudio

    // Conectar ao backend e receber o estado inicial
    useEffect(() => {
        socket.on('estadoInicialQuarto', (estadoInicial: EstadoInicial) => {
            setEstadoInicial(estadoInicial);
        });

        const eventos = [
            'ligarLuzQuarto',
            'ligarVentiladorQuarto',
            'ligarTvQuarto',
            'ligarArCondicionadoQuarto',
            'ligarAbajurQuarto',
            'ligarSomQuarto'
        ];

        eventos.forEach(evento => {
            socket.on(evento, (novoEstado: Partial<EstadoInicial>) => {
                setEstadoInicial(prev => ({ ...prev, ...novoEstado }));
                if (evento === 'ligarSomQuarto') {
                    if (novoEstado.somOn) {
                        somAudio.current?.play();
                    } else {
                        somAudio.current?.pause();
                        somAudio.current!.currentTime = 0; // Reset para o início
                    }
                }
            });
        });

        return () => {
            eventos.forEach(evento => socket.off(evento));
        };
    }, []);

    // Função para alternar estados
    const toggleDispositivo = (dispositivo: string) => {
        socket.emit(dispositivo);
    };

    return (
        <div className='quarto'>
            <h2>Quarto</h2>
            <div className="componentes">
                <div className='luz'>
                    <img src={luz} className={`status ${estadoInicial.luzOn ? 'on' : 'off'}`} />
                    <button onClick={() => toggleDispositivo('ligarLuzQuarto')}>
                        {estadoInicial.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                    </button>
                </div>
                <div className='tv'>
                    <img src={tv} className={`status ${estadoInicial.tvOn ? 'on' : 'off'}`} />
                    <button onClick={() => toggleDispositivo('ligarTvQuarto')}>
                        {estadoInicial.tvOn ? 'Desligar TV' : 'Ligar TV'}
                    </button>
                </div>
                <div className='ar-condicionado'>
                    <img src={arCondicionado} className={`status ${estadoInicial.arCondicionadoOn ? 'on' : 'off'}`} />
                    <button onClick={() => toggleDispositivo('ligarArCondicionadoQuarto')}>
                        {estadoInicial.arCondicionadoOn ? 'Desligar Ar-Condicionado' : 'Ligar Ar-Condicionado'}
                    </button>
                    <br />
                    <label className={`status ${estadoInicial.arCondicionadoOn ? 'on' : 'off'}`}>Temperatura:</label>
                    <input id="temp" className={`status ${estadoInicial.arCondicionadoOn ? 'on' : 'off'}`} type="number" disabled={!estadoInicial.arCondicionadoOn} />
                </div>
                <div className='abajur'>
                    <img src={abajur} className={`status ${estadoInicial.abajurOn ? 'on' : 'off'}`} />
                    <button onClick={() => toggleDispositivo('ligarAbajurQuarto')}>
                        {estadoInicial.abajurOn ? 'Desligar Abajur' : 'Ligar Abajur'}
                    </button>
                </div>
                <div className='som'>
                    <img
                        src={estadoInicial.somOn ? somOnIcone : somOffIcone}
                        alt="Som"
                        className={`status ${estadoInicial.somOn ? 'on' : 'off'}`}
                    />
                    <button onClick={() => toggleDispositivo('ligarSomQuarto')}>
                        {estadoInicial.somOn ? 'Parar Música' : 'Tocar Música'}
                    </button>
                    <audio ref={somAudio} loop>
                        <source src={`${process.env.PUBLIC_URL}/musica/music.mp3`} type="audio/mpeg" />
                        <source src={`${process.env.PUBLIC_URL}/musica/music.ogg`} type="audio/ogg" />
                    </audio>
                </div>
            </div>
        </div>
    );
}
