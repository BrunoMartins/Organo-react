import { AiFillCloseCircle,AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import './Colaborador.css'

const Colaborador = ({ nome, imagem, cargo, corDeFundo, deletar, id,favorito,verificaFavorito }) => {//alternativa para não utilizar props
    return (
        <div className='colaborador'>
            <AiFillCloseCircle size={25} className="deletar" onClick={() => deletar(id)} />
            <div className='cabecalho' style={{ backgroundColor: corDeFundo }}>
                <img src={imagem} alt={nome} />
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <h5>{cargo}</h5>
                <div className='favoritar'>
                    {favorito ? <AiFillHeart color='#ff0000' size={25} onClick={()=>verificaFavorito(id)}/>: <AiOutlineHeart size={25} color='#ff0000' onClick={()=>verificaFavorito(id)}/>}
                </div>
            </div>
        </div>
    )

}

export default Colaborador