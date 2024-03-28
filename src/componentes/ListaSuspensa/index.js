import './ListaSuspensa.css'

const ListaSuspensa = (props) =>{
    return(
        <div className='lista-suspensa'>
            <label>{props.label}</label>
            <select required={props.obrigatorio}>
            <option value="" disabled selected hidden>Escolha uma opção</option>
            {props.itens.map(item => {
        return <option key={item}>{item}</option>
    })}
            </select>
        </div>
    )

}

export default ListaSuspensa