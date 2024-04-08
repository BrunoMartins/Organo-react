import Colaborador from '../Colaborador'
import './Time.css'

const Time = (props) => {
    return (
        //operador ternário para veriricar caso o time esteja vazio, não renderiza, caso tenha algum colaborador, renderiza
        (props.colaboradores.length > 0) ? <section className='time' style={{ backgroundColor: props.corSecundaria, backgroundImage: 'url(/imagens/fundo.png)' }}>
             <input value={props.corPrimaria} type='color' className='input-cor' />
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