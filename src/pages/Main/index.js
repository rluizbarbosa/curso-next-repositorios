import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import {Container, Form, SubmitButton, List, DeleteButton} from './styles'
import { useCallback, useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function Main(){
    const [novoRepositorio, setNovoRepositorio] = useState('')
    const [repositorios, setRepositorios] = useState(() => {
        const repoStorage = localStorage.getItem("repos");
        return repoStorage ? JSON.parse(repoStorage) : [];
    });
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        const repoStorage = localStorage.getItem('repos')
        if(repoStorage){
            setRepositorios(JSON.parse(repoStorage))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios))
    }, [repositorios])
    
    const  handleSubmit = useCallback ((e) => {
        e.preventDefault()
        async function submit(){
            setLoading(true)
            setAlert(null)
            try {
                if(novoRepositorio === ''){
                    throw new Error('Você precisa indicar um repositório!')
                }
                const response = await api.get(`repos/${novoRepositorio}`)

                const hasRepo = repositorios.find(repo => repo.name  === novoRepositorio)
                
                if(hasRepo){
                    throw new Error('Repositório duplicado!')
                }

                const data = {
                    name: response.data.full_name
                }
                setRepositorios([...repositorios, data])
                setNovoRepositorio('')
            } catch (error) {
                setAlert(true)
            }finally{
                setLoading(false)
            }
        }
        submit()
    }, [novoRepositorio, repositorios])

    function handleInputChange(e) {
        setNovoRepositorio(e.target.value)
        setAlert(null)
    }

    const handleDelete = useCallback((repo) => {
        const find = repositorios.filter(r => r.name !== repo)
        setRepositorios(find)
    }, [repositorios])

    return (
        <Container>
            
            <h1><FaGithub size={25}></FaGithub>Meus repositórios</h1>
            <Form onSubmit={handleSubmit} error={alert}>
                <input 
                    type='text' 
                    placeholder='Adicionar repositório'
                    value={novoRepositorio}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner size={14} color='#fff'></FaSpinner>
                    ) : (
                        <FaPlus size={14} color='#fff'></FaPlus>
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositorios.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14}></FaTrash>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`/repositorio/${ encodeURIComponent(repo.name)}`}>
                            <FaBars size={20}></FaBars>
                        </Link>
                    </li>
                ))}
            </List>
            
        </Container>
    )
}