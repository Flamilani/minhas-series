import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    const [data, setData] = useState({})

    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])

    useEffect(() => {
        axios.get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const encontrado = genres.find(value => data.genre === value.name)

                if (encontrado) {
                    setGenreId(encontrado.id)
                }
            })
    }, [data])

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        })
            .then(res => {
                setSuccess(true)
            })
    }
    if (success) {
        return <Redirect to='/series' />
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img className='img-fuild img-thumbnail' src={data.poster} alt={data.name} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <p className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para assistir</Badge>}
                                    <span className='ml-3'>Genêro: {data.genre}</span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container mt-3'>
                <button className='btn btn-info mb-3' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&

                <div className='container mb-5'>
                    <h1>Editar Série {form.name}</h1>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input autoComplete="off" type='text' className='form-control'
                                value={form.name} onChange={onChange('name')}
                                id="name" placeholder='Nome da Série'
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentários</label>
                            <input autoComplete="off" type='text' className='form-control'
                                value={form.comments} onChange={onChange('comments')}
                                id="comments" placeholder='Comentários'
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Genêros</label>
                            <select className="form-control" onChange={onChangeGenre} value={genreId}>
                                {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'ASSISTIDO'} name="status" id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="assistido">Assistido</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" checked={form.status === 'PARA_ASSISTIR'} name="status" id="paraAssistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="paraAssistir">Para Assistir</label>
                        </div>
                        <button onClick={save} type='button' className='btn btn-primary mt-3'>Salvar</button>
                        <button className='btn btn-info mt-3 ml-3' onClick={() => setMode('INFO')}>Cancelar Edição</button>
                    </form>
                </div>
            }
        </div >
    )
}

export default InfoSerie