import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import * as math from 'mathjs';

export default function App() {
  const [Cadena, Poner] = useState('');
  const [isInverse, setIsInverse] = useState(false);
  const [isReciprocal, setIsReciprocal] = useState(false);

  const Cambiar = (Caracter) => {
    const Completo = Cadena + Caracter;
    Poner(Completo);
  }

  const Limpiar = (Estatus) => {
    if (Estatus) {
      Poner(Cadena.slice(0, -1));
    } else {
      Poner('');
    }
  }

  const toggleReciprocal = () => {
    setIsReciprocal(!isReciprocal);
    setIsInverse(false);
  };

  const toggleInverse = () => {
    setIsInverse(!isInverse);
    setIsReciprocal(false);
  };

  const getTrigFunctions = () => {
    if (isReciprocal) {
      return ['csc', 'sec', 'cot'];
    }
    if (isInverse) {
      return ['arcsin', 'arccos', 'arctan'];
    }
    return ['sin', 'cos', 'tan'];
  };

  const Resultado = () => {
    try {
        let expresion = Cadena
            .replace('÷', '/')
            .replace('x', '*')
            .replace('π', Math.PI)
            .replace('e', Math.E)
            .replace('√', 'Math.sqrt(')
            .replace('^', '**')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sin\s*\(/g, 'Math.sin((Math.PI / 180) *')
            .replace(/cos\s*\(/g, 'Math.cos((Math.PI / 180) *')
            .replace(/tan\s*\(/g, 'Math.tan((Math.PI / 180) *')
            .replace(/csc\s*\(/g, '(1/Math.sin((Math.PI / 180) *')
            .replace(/sec\s*\(/g, '(1/Math.cos((Math.PI / 180) *')
            .replace(/cot\s*\(/g, '(1/Math.tan((Math.PI / 180) *')
            .replace(/²/g, '**2')
            .replace(/³/g, '**3')
            .replace(/(\|[^\|]+\|)/g, (match) => `Math.abs(${match.slice(1, -1)})`)
            .replace(/(\d+)!/g, (match, num) => factorial(parseInt(num)));

        const resultado = eval(expresion);
        if (resultado === Infinity || resultado === -Infinity) {
            Poner('Error');
        } else {
            Poner(resultado.toString());
        }
    } catch (error) {
        Poner('Error');
    }
  };


  
  const factorial = (n) => {
    if (n < 0) return undefined;
    if (n === 0) return 1;
    return n * factorial(n - 1);
  };
  
  

  return (
    <View style={styles.container}>
      <TextInput style={styles.resultado} value={Cadena} editable={false} />
      
      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botontxt}></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={toggleReciprocal}>
          <Text style={styles.botontxt}>R</Text>
        </TouchableOpacity>

        {getTrigFunctions().map((func, index) => (
          <TouchableOpacity key={index} style={styles.boton} onPress={() => Cambiar(`${func}(`)}>
            <Text style={styles.botontxt2}>{func}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('²')}>
          <Text style={styles.botontxt}>x²</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('log(')}>
          <Text style={styles.botontxt2}>log</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('ln(')}>
          <Text style={styles.botontxt}>ln</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('(')}>
          <Text style={styles.botontxt}>(</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar(')')}>
          <Text style={styles.botontxt}>)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('³')}>
          <Text style={styles.botontxt}>x³</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Limpiar(false)}>
          <Text style={[styles.botontxt2, styles.Naranja]}>AC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Limpiar(true)}>
          <Text style={[styles.botontxt2, styles.Naranja]}>DEL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('%')}>
          <Text style={[styles.botontxt2, styles.Naranja]}>%</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('÷')}>
          <Text style={[styles.botontxt2, styles.Naranja]}>÷</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('√')}>
          <Text style={styles.botontxt}>√</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('7')}>
          <Text style={[styles.botontxt, styles.Blanco]}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('8')}>
          <Text style={[styles.botontxt, styles.Blanco]}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('9')}>
          <Text style={[styles.botontxt, styles.Blanco]}>9</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('x')}>
          <Text style={[styles.botontxt2, styles.Naranja]}>x</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('!')}>
          <Text style={styles.botontxt}>x!</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('4')}>
          <Text style={[styles.botontxt, styles.Blanco]}>4</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('5')}>
          <Text style={[styles.botontxt, styles.Blanco]}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('6')}>
          <Text style={[styles.botontxt, styles.Blanco]}>6</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('-')}>
          <Text style={[styles.botontxt2, styles.Naranja]}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('π')}>
          <Text style={styles.botontxt}>π</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('1')}>
          <Text style={[styles.botontxt, styles.Blanco]}>1</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('2')}>
          <Text style={[styles.botontxt, styles.Blanco]}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('3')}>
          <Text style={[styles.botontxt, styles.Blanco]}>3</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('+')}>
          <Text style={[styles.botontxt2, styles.Naranja]}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fila}>
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('|')}>
          <Text style={styles.botontxt2}>|x|</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('e')}>
          <Text style={styles.botontxt}>e</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('0')}>
          <Text style={[styles.botontxt, styles.Blanco]}>0</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={() => Cambiar('.')}>
          <Text style={styles.botontxt}>.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Igual} onPress={Resultado}>
          <Text style={[styles.botontxt, styles.Blanco]}>=</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 40,
  },

  resultado: {
    height: 100,
    width: '90%',
    color: 'white',
    fontSize: 36,
    textAlign: 'right',
    paddingRight: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderBottomColor: '#1c1c1c'
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  boton: {
    padding: 10,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botontxt: {
    fontSize: 14,
    color: '#777'
  },
  botontxt2: {
    fontSize: 14,
    color: '#777'
  },
  Naranja: {
    color: '#ff7433',
    fontWeight: 'bold'
  },
  Blanco: {
    color: '#f8f8f8',
    fontWeight: 'bold'
  },

  Igual: {
    width: 35,
    height: 35,
    color: '#f8f8f8',
    borderRadius: 100,
    backgroundColor: '#ff7433',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  }
});
