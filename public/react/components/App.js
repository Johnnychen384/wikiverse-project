import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetail } from './ArticleDetail';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [article, setArticle] = useState({});
	const [selectedArticle, setSelectedArticle] = useState(false)

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	const getOneArticle = async (title) => {
		try{

			const res = await fetch(`${apiURL}/wiki/${title}`)
			const data = await res.json()
			setArticle(data)
			setSelectedArticle(true)
			console.log(data)
		} catch (err) {
			console.log("ERROR" + err)
		}
	}

	const removeSelectedArticle = () => {
		setSelectedArticle(false)
	}

	useEffect(() => {
		fetchPages();
		
	}, []);

	return (
		<main>	
      		
			{
				selectedArticle ?
				<ArticleDetail page={article} removeSelectedArticle={removeSelectedArticle}/>
				:
				<>
					<h1>WikiVerse</h1>
					<h2>An interesting 📚</h2>
					<PagesList pages={pages} getOneArticle={getOneArticle}/>
				</>
			}
		</main>
	)
}