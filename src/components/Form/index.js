import "./form.css";
import {useEffect, useState} from "react";

import BasicCard from "../BasicCard";
import { Oval } from  'react-loader-spinner'

import fetchApi from "../../functions/fetchApi";

function Form() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [url, setUrl] = useState(`https://dev.to/api/articles?top=7&per_page=3`)
    const [title, setTitle] = useState('This week top 3 Articles')

    const handleSubmit = (event) =>{
        event.preventDefault()
        if (inputValue){
            setTitle(`"${inputValue}" results`)
            setUrl(`https://dev.to/api/articles?tag=${inputValue}`)
        } else {
            setTitle('This week top 3 Articles')
            setUrl(`https://dev.to/api/articles?top=7&per_page=3`)
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {

       setLoading (true)
       Promise.resolve( fetchApi(url,'','GET','',true) )
           .then( (result) => {
                if (result.success){
                    setData(result.results)
                    setError(false)
                } else {
                    setError(result.results);
                    setData([]);
                };
            })
           .then( () => setLoading (false) )

    }, [url]);

    const articlesArray = data?.map((article) => (
        <BasicCard
            key={article.id}
            id={article.id}
            title={article.title}
            alt={article.title}
            imgPath={article.cover_image}
            imgSocial={article.social_image}
            date={article.published_at}
            description={article.description}
            link="Read More"
            url={article.url}
        />
    ));

    return (
        <>
            <h2>Article warehouse</h2>

            <form className="formData" onSubmit={handleSubmit}>
                <input onChange={handleChange}/>
                <button type="submit">Search</button>
            </form>

            {(!loading) &&
                <>
                    {(data.length>0 && !error) && <h3 >{title}</h3>}

                    {data && <div className="articles">{articlesArray}</div>}

                    {(data.length===0 && !error) && <h3 className="articles">No results for "{inputValue}"</h3>}

                    {error && <span>{error}</span>}
                </>
            }

            {(loading) &&
                <div className="spinner">
                    <Oval
                        height = "200"
                        width = "200"
                        radius = "9"
                        color = 'green'
                        ariaLabel = 'three-dots-loading'
                    />
                </div>
            }
        </>
    );
}

export default Form;