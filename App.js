import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';

const memberList = [
  {
    id: '1',
    name: "Jimmy",
    email: "jimbuscus23@gmail.com",
    school: "upenn"
  },
  {
    id: '2',
    name: "Jimmy",
    email: "jimbuscus23@gmail.com",
    school: "upenn"
  },
  {
    id: '3',
    name: "Jimmy",
    email: "jimbuscus23@gmail.com",
    school: "upenn"
  }
];


function HomeScreen({ navigation, route }) {
  const [members, setMembers] = useState(memberList);
  React.useEffect(() => {
  if (route.params?.name) {
    const { name } = route.params;
    setMembers(memberList => [...memberList, { name }]);
  }
}, [route.params?.name]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={members}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
            <Text>{item.name}</Text>
            <Text>{item.email} </Text>
            <Text>{item.school}</Text>
           </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
      />
      <Button onPress={() => navigation.navigate('Addition', setMembers)} title="Addition"/>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> { name }</Text>
    </View>
  );
}

function AdditionScreen({ route, navigation}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [school, setSchool] = useState();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> Name </Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setName(text)}
        value={name}
      />
      <Text> Email </Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text> School </Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setSchool(text)}
        value={school}
      />
      <Button
        title="Submit"
        onPress={() => {navigation.navigate('Home', { name })}}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Addition" component={AdditionScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
