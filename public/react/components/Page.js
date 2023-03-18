import React from 'react';

export const Page = (props) => {

  return <>
    <button onClick={() => props.getOneArticle(props.page.slug)}>{props.page.title}</button>
  </>
} 
	