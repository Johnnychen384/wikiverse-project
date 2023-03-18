import React from 'react';
import apiURL from '../api';


export const ArticleDetail = (props) => {

  const deleteArticle = async (slug) => {
    const res = await fetch(`${apiURL}/wiki/${slug}`, {method: "DELETE"})
    const data = await res.json()
    props.setDeletedArticleToTrue()
    props.removeSelectedArticle()
  }


  return <>
    <h3>{props.page.title}</h3>
    <h6>Author: <span>{props.page.author.name}</span></h6>
    <h6>Published: <span>{props.page.createdAt.slice(0, 10)}</span></h6>
    <p>{props.page.content}</p>
    <h6>Tags: <span>{
        props.page.tags.map((tag, indx) => <p key={indx}>{tag.name}</p>)
    }</span>
    </h6>
    <button onClick={() => deleteArticle(props.page.slug)}>DELETE</button>
    <button onClick={() => props.removeSelectedArticle()}>Back to Wiki List</button>
  </>
} 