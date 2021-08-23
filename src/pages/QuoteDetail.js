import {Fragment, useEffect } from 'react'
import {useParams, Route, Link, useRouteMatch} from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React'},
    { id: 'q2', author: 'Bob', text: 'Cheese Curds'}
]

const QuoteDetail = () =>{
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params

    const {sendRequest, status, data:loadedQuote , error } = useHttp(getSingleQuote, true)

    useEffect((quoteId)=>{
        sendRequest
    },[sendRequest])

    if(status === 'pending'){
        return (
            <div className="centered">
                <LoadingSpinner/>
            </div>
        )
    }
    if(error){
        return(
            <div className="centered">
                {error}
            </div>
        )
    }
    if(!loadedQuote){
        return <p>No Quote Found</p>
    }
    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments/>
            </Route>
        </Fragment>
    )
    }
export default QuoteDetail