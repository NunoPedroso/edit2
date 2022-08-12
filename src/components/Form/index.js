import "./form.css";
import {useEffect, useState} from "react";

import BasicCard from "../BasicCard";
import { Oval } from  'react-loader-spinner'

import fetchApi from "../../store/fetchApi";
import autocomplete from "../../store/autocomplete";
import '../../store/autocomplete.css'

function Form() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [url, setUrl] = useState(`https://dev.to/api/articles?top=7&per_page=5`)
    const [title, setTitle] = useState('This week top 5 Articles')

    const handleSubmit = () =>{
        const input = document.getElementById('inputToAutocomplete').value

        if (input){
            setTitle(`"${input}" results`)
            setUrl(`https://dev.to/api/articles?tag=${input}`)
        } else {
            setTitle('This week top 5 Articles')
            setUrl(`https://dev.to/api/articles?top=7&per_page=5`)
        }
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    useEffect(() => {

        const url = 'https://dev.to/api/articles?top=30&per_page=200'
        const logicalGetTopTags = (articles) => {
            let tagListUnic = []
            for (let i in articles ){
                if (articles[i].tag_list){
                    for (let j in articles[i].tag_list){
                        if (tagListUnic.indexOf(articles[i].tag_list[j]) === -1){
                            tagListUnic.push(articles[i].tag_list[j])
                        }
                    }
                }
            }
            return tagListUnic
        }

        Promise.resolve( fetchApi(url,'','GET','',true) )
            .then( (result) => {
                if (result.success){
                    const element = document.getElementById('inputToAutocomplete')
                    const tagList = logicalGetTopTags(result.results)
                    autocomplete(element,tagList,handleSubmit)
                }
            })

    }, []);

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

            <form className="formData autocomplete" autoComplete="off" >
                <input id="inputToAutocomplete" type="search" onChange={handleChange}/>
            </form>
            <button id="buttonAutocompleteSubmit" className="buttonSearch" type="button" onClick={handleSubmit}>Search</button>
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