import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Animated,
Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const {pais, cuidad} = busqueda;

    const [ animacionboton ] = useState(new Animated.Value(1));

    //Mostar la alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [{text: 'Entendido'}]
        )
    }

    const consultarClima = () => {
        if(pais.trim() === '' || cuidad.trim() === ''){
            mostrarAlerta()
            return;
        }
        //Consultando la api
        guardarConsultar(true)
    }

    const animacioEntrada = () => {
        Animated.spring(animacionboton, {
            toValue: .75
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 4,
            tension: 30
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton }]
    }

    return (  
        <>
            <View>
                <View>
                    <TextInput
                        value={cuidad}
                        style={styles.input}
                        onChangeText={cuidad => guardarBusqueda({...busqueda, cuidad})}
                        placeholder="Cuidad"
                        placeholderTextColor="#666"
                        keyboardType='default'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        itemStyle={{height: 120, backgroundColor: '#FFF'}}
                        onValueChange={pais => guardarBusqueda({...busqueda, pais})}
                    >
                        <Picker.Item label="-Seleccione un pais" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Perú" value="PE" />
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => animacioEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input:{
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        padding: 10
    },
    textoBuscar:{
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 18
    }
})
 
export default Formulario;