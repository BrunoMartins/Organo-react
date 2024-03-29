import './ListaSuspensa.css'

const ListaSuspensa = (props) =>{
    return(
        <div className='lista-suspensa'>
            <label>{props.label}</label>
            <select defaultValue="" required={props.obrigatorio}>
            <option value="" disabled hidden>Escolha uma opção</option>
            {props.itens.map(item => {
        return <option key={item}>{item}</option>
    })}
            </select>
        </div>
    )

}

export default ListaSuspensa