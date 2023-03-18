import React, {useState} from 'react';
import apiURL from '../api';

export const Form = (props) => {
    const [articleData, setArticleData] = useState({title: "", content: "", name: "", email: ""})

    const handleChange = (e) => {
        setArticleData({...articleData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${apiURL}/wiki`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(articleData),
            })
            const data = res.json()
            setArticleData({})
            props.setIsArticleToFalse()

        } catch (err) {
            console.log("SUBMIT FAILED" + err)
        }
    }

    const checkForm = () => {
        const formDataArr = Object.values(articleData)
        
        if(formDataArr.length < 4) return false
        else return true
    }


    return <>
        <form onSubmit={handleSubmit}>
            <h3>Add a Page</h3>
            <input type="text" placeholder='Title' name='title' onChange={handleChange}/>
            <input type="text" placeholder='Content' name='content' onChange={handleChange}/>
            <input type="text" placeholder='Author name' name='name' onChange={handleChange}/>
            <input type="text" placeholder='Author email' name='email' onChange={(e) => {
                handleChange(e)
                if(checkForm()) document.getElementById("btn").disabled = false;
            }}/>
            <button type="submit" id="btn" disabled>Create Page</button>
        </form>
    </>
} 