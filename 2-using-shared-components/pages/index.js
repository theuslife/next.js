import React from 'react'
import Layout from '../components/MyLayout';
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

//Component para nos levar a tela de posts
const PostLink = ({ name, id }) => (
  <li>
    <Link
      href={{
        //Pasta P, arquivo javascript [post].js
        pathname: `/p/[post]`, //Post é variável
        query: {
          name,
          id
        }
      }}
      as={`/p/${id}`}
    >
      <a style={{ color: 'blue' }}>{name}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }
      a {
        text-decoration: none;
        color: blue;
        font-family: 'Arial';
      }
      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
)

//Index recebe postlist através do getInicialProps
const Index = ({ postlist }) => {
  return (
    <div>
      {/* Layout é o nosso header */}
      <Layout>
        <h1>Meu blog</h1>
        <ul>
          {postlist.map(({ name, id }) =>
            <div key={name}>
              <PostLink name={name} id={id} />
            </div>
          )}
        </ul>
        <style jsx>
          {`
          h1,
          a {
            font-family: 'Arial';
          }
          ul {
            padding: 0;
          }
          `}
        </style>
      </Layout>
    </div >
  )
}

/**
 * getInitalProps é uma função estática do next.js no qual ele passa props antes da inicialização do componente chamado,
 * ou seja ele renderiza no servidor e retorna para o react
 * Porém quando getInitalProps é chamado após uma navegação de rota, logo ele passa a ser iniciado na renderização inicial do componente (sem conexão com  o servidor)
 * @returns {object} - Props para o componente que irá ser renderizado
 */

Index.getInitialProps = async () => {

  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  return {
    postlist: data.map(entry => entry.show)
  }

}

export default Index
