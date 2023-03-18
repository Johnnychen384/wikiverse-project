import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetail } from './ArticleDetail';
import { Form } from './Form';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [article, setArticle] = useState({});
	const [selectedArticle, setSelectedArticle] = useState(false)
	const [isAddingArticle, setIsAddingArticle] = useState(false)

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

	const setIsArticleToFalse = () => {
		setIsAddingArticle(false)
	}

	useEffect(() => {
		fetchPages();
		
	}, [isAddingArticle]);


	return (
		<main>	
      		
			{
				selectedArticle ?
				<ArticleDetail page={article} removeSelectedArticle={removeSelectedArticle}/>
				:
				<>
					<h1>WikiVerse</h1>
					{
						isAddingArticle ? 
						<Form setIsArticleToFalse={setIsArticleToFalse}/> :
						<>
							<h2>An interesting 📚</h2>
							<PagesList pages={pages} getOneArticle={getOneArticle}/>
							<br/>
							<button onClick={() => setIsAddingArticle(true)}>Add a Page</button>
						</>
					}
				</>
			}
		</main>
	)
}