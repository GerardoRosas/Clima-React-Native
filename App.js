import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import { StyleSheet, Keyboard, View, Text, 
  TouchableWithoutFeedback, Alert } from 'react-native';


const App = () => {

  const [ busqueda, guardarBusqueda ] = useState({
    cuidad: '',
    pais: ''
  })

  const [ consultar, guardarConsultar ] = useState(false);
  const [ resultado, guardarResultado ] = useState({});
  const [ bgcolor, guardarBgcolor ] = useState("rgb(71, 149, 212)");

  const {cuidad, pais} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if(consultar){
        const apiKey = "3b44aa32add72e6f3e4bb8a73ccc7c82";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${apiKey}`

        try {
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            guardarResultado(resultado);
            guardarConsultar(false);

            //modifica los coleres de fondo basado en la temperaturua
            const kelvin = 273.15;
            const { main }= resultado;
            const actual = main.temp - kelvin;

            if(actual < 10 ){
              guardarBgcolor('rgb(105, 108, 149)');
            }else if(actual >= 10 && actual < 25){
              guardarBgcolor('rgb(71, 149, 212)');
            }else{
              guardarBgcolor('rgb(179, 28, 61)');
            }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  }, [consultar])

  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados, intenta con otra cuidad',
        [{text: 'Ok'}]
    )
}

  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }

  return (
    <> 
      <TouchableWithoutFeedback
        onPress={() => ocultarTeclado()}
      >
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima 
              resultado={resultado}
            />
            <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
    app:{
      flex: 1,
      justifyContent: 'center'
    },
    contenido:{
      marginHorizontal: '2.5%'
    }
});

export default App;
