import React from 'react'
import { useRouter } from 'next/router';
import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch'
import Markdown from 'react-markdown';

/**
 * Mostra os detalhes de um post escolhido pelo usuário
 * @param {object} props - Propriedades react
 * @returns {component}
 */

function Post({ show: { summary, name, image } }) {

    // const router = useRouter();

    return (
        <Layout>
            <h1>{name}</h1>
            <p>{summary.replace(/<[/]?p>/g, '')}</p>
            <img src={image.medium} />
            <div className="markdown">
            </div>
        </Layout>
    );

}

/**
 * @param {object} - 
 * @return {object} - Props obtidas pelo servidor
 */

Post.getInitialProps = async ({ query: { id, post } }) => {

    const res = await fetch(`https://api.tvmaze.com/shows/${id === undefined ? post : id}`)

    const show = await res.json()

    return {
        show
    }

}

export default Post
