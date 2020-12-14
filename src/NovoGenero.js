import React, { useState } from 'react'

const NovoGenero = () => {
    const [name, setName] = useState('')
    const onChange = evt => {
        setName(evt.target.value)
    }
    return (
        <div className='container'>
            <h1>Novo Genêro {name}</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' className='form-control'
                    value={name} onChange={onChange}
                    id="name" placeholder='Nome do Genêro'
                    />
                </div>
                <button type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}
export default NovoGenero