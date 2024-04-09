import Colaborador from '../Colaborador'
import './Time.css'
import hexToRgba from 'hex-to-rgba';
import { FaSave } from "react-icons/fa";

const Time = (props) => {
    return (
        //operador ternário para veriricar caso o time esteja vazio, não renderiza, caso tenha algum colaborador, renderiza
        (props.colaboradores.length > 0) ? <section className='time' style={{ backgroundColor: hexToRgba(props.corPrimaria,'0.4'), backgroundImage: 'url(/imagens/fundo.png)' }}>
             <input onChange={evento=> props.mudarCor(evento.target.value,props.nome)} value={props.corPrimaria} type='color' className='input-cor' />
             <FaSave size={25} className='botao-salvar' onClick={props.botaoSalvar}/>
            <h3 style={{ borderColor: props.corPrimaria }}>{props.nome}</h3>
            <div className='colaboradores'>
                {props.colaboradores.map(colaborador => {
                    return <Colaborador corDeFundo={props.corPrimaria} key={colaborador.nome} nome={colaborador.nome} cargo={colaborador.cargo} imagem={colaborador.imagem} deletar={props.deletar} />
                })}
            </div>
        </section>
        : ''
    )

}

export default Time