import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import {  Container,  FlatList } from  './styles';
import api from '../../Services/api';
import Filme from './Components';

const responseApi = async () => {
  try {
    const { data } = await api.get('/trending', {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": "50d94f3366804cfb473124bd2e9a394fee8be82e896042e47c7c3feece0d5bdd"
      }
    });
    return data
  } catch(exception) {
    return exception
  }
}

export function HomePage() {
  const [listMovies, setListMovies] = useState([])

  useEffect(() => {
    responseApi().then((res) => {
      console.log('fechou papai, segue o response', res)
      setListMovies(res)
    })
    .catch((err) => {
      console.log('deu erro papai, segue o erro,', err)
    })
  }, [])

  return (
    <Container>
      {/* <FlatList
        data={listMovies}
        keyExtractor={movie => movie.id}
        renderItem={({movie}) => <Filme movie={movie}/>}
      /> */}
      {
        listMovies?.length ? listMovies.map(({ movie, watchers }) => (
          <Text 
            style={{color: '#ffffff'}}
          > 
            {movie.title}: {watchers} 
          </Text>
        )) : <Text color="#ffffff"> Cargando..... </Text>
      }
    </Container>
  )
}

