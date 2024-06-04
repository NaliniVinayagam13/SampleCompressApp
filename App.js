import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { zip } from 'react-native-zip-archive';
import RNFS from 'react-native-fs';

const App = () => {

const [filePath, setFilePath] = useState('');
const [originalFileSize, setOriginalFileSize] = useState('');
const [zippedFileSize, setZippedFileSize] = useState('');

  useEffect( () => {
    async function getFileSize() {
    try {
      const absolutePath = '/storage/emulated/0/Documents/installation_steps.txt';
      console.log('absolutePath: ', absolutePath);
      setFilePath(absolutePath);

      const fileExists = await RNFS.exists(absolutePath);
      if (!fileExists) {
        Alert.alert('Error', 'File does not exist');
        return;
      }
      console.log('fileExists: ', fileExists);
      // Get the file information
      const fileInfo = await RNFS.stat(absolutePath);

      // Get the file size in bytes
      const fileSize = fileInfo.size;
      setOriginalFileSize(fileSize);
      console.log('fileSize: ', fileSize);
    } catch (err) {
      console.log('txt file read error: ', err);
    }
  }
  getFileSize();

  }, []);

  const compressFile = async () => {
    try {
      // Path to the text file you want to compress
      // const pathToTxtFile = RNFetchBlob.fs.dirs.DocumentDir + '/installation_steps.txt';

console.log(' compressFile -- filePath:  ', filePath);
      // Path to the output zip file
      const pathToZipFile = RNFetchBlob.fs.dirs.DocumentDir + '/sample.zip';

      // Perform the zipping
      const zippedPath = await zip(filePath, pathToZipFile);

      Alert.alert('Success', `File zipped to: ${zippedPath}`);
      const zippedFileInfo = await RNFS.stat(zippedPath);

      // Get the file size in bytes
      const zippedFileSizeLocal = zippedFileInfo.size;
      setZippedFileSize(zippedFileSizeLocal)
      console.log('zippedFileSize: ', zippedFileSizeLocal);

    } catch (error) {
      Alert.alert('Error', `Failed to zip file: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Compress .txt File Example</Text>
      <Text>Original File SIze: {originalFileSize}bytes</Text>
      <Button title="Compress File" onPress={compressFile} />
      {zippedFileSize > 0 && (<Text>Zipped File SIze: {zippedFileSize}bytes</Text>)}
      


    </View>
  );
};

export default App;
