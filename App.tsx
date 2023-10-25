import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { useBluetoothLE } from './hooks/useBle';

export default function App() {
  const { requestPermissions, scanForPeripherals, allDevices, connectToDevice } = useBluetoothLE();

  useEffect(() => {
    scanForDevices();
  }, []);

  const scanForDevices = async () => {
    const isPermissionEnabled = await requestPermissions();
    if (isPermissionEnabled) {
      scanForPeripherals();
    }
  };

  const t = async (t: any) => {
    return await t.discoverAllServicesAndCharacteristics()
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text>Stary</Text>
      </TouchableOpacity>
      {
        allDevices.length
          ? allDevices.map((device: Device) => {
            console.log(device.id);
            return(<TouchableOpacity key={device.id} style={styles.device} onPress={() => connectToDevice(device)}>
              <Text>{device.name}</Text>
            </TouchableOpacity>)
          }) : <Text>Nenhum dispositivo...</Text>
      }
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: 'yellow',
    paddingHorizontal: 150,
    paddingVertical: 50,
  },

  device: {
    backgroundColor: 'blue',
    padding: 50,
    marginBottom: 5,
  }
});
