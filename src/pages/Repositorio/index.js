import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Loading, Container, Owner, BackButton, IssuesList, PageActions, FilterList } from './styles';
import api from '../../services/api'
import { useEffect, useState } from 'react';

export default function Repositorio(match){
    
    const { repositorio } = useParams();

    const [repo, setRepo] = useState({})
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [stateFilter, setStateFilter] = useState('all')

    useEffect(() => {
        async function loadPageIssue(){
            const nomeRepo = repositorio

            const response = await api.get(`/repos/${nomeRepo}/issues`,{
                params: {
                    state: stateFilter,
                    per_page: 5,
                    page
                }
            })

            setIssues(response.data)
        }

        loadPageIssue()
    }, [repositorio, stateFilter, page])

    useEffect(() => {
        async function load(){
            const nomeRepo = repositorio

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`), 
                api.get(`/repos/${nomeRepo}/issues`,{
                    params: {
                        state: 'open',
                        per_page: 5
                    }
                })
            ])

            setRepo(repositorioData.data)
            setIssues(issuesData.data)
            setLoading(false)
        }

        load()

    }, [repositorio])

    function handlePage (action){
        setPage(action === 'back' ? page - 1 : page + 1)
    }

    function handleState (action){
        setPage(1)
        setStateFilter(action)
    }

    if(loading){
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }
   
    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color='#000' size={30}></FaArrowLeft>
            </BackButton>
            <Owner>
                <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                <h1>{repo.name}</h1>
                <p>{repo.description}</p>
            </Owner>
            <FilterList>
                <button 
                    type='button' 
                    onClick={()=> handleState('all')}
                    disabled={stateFilter === 'all'}
                >
                    Todas
                </button>
                <button 
                    type='button' 
                    onClick={()=> handleState('open')}
                    disabled={stateFilter === 'open'}
                >
                    Abertas
                </button>
                <button 
                    type='button' 
                    onClick={()=> handleState('closed')}
                    disabled={stateFilter === 'closed'}
                >
                    Fechadas
                </button>
            </FilterList>
            <IssuesList>
                {issues.map(issue => (
                    <li key={String(issue.id)}>
                        <img src={issue.user.avatar_url} alt={issue.user.login} />
                        <div>
                            <strong>
                                <a href={issue.html_url} target='_blank'>
                                    {issue.title}
                                </a>
                                {issue.labels.map(label => (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssuesList>
            <PageActions>
                <button 
                    type='button' 
                    onClick={()=> handlePage('back')}
                    disabled={page < 2}
                >
                    Voltar
                </button>
                <button type='button' onClick={()=> handlePage('next')}>
                    Próxima
                </button>
            </PageActions>
        </Container>
    )
}