import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import pako from 'pako';
import { Buffer } from 'buffer';

const TextFileReducer = () => {
  const absolutePath = '/storage/emulated/0/Documents/installation_steps.txt';
  const reducedFilePath = '/storage/emulated/0/Documents/sample.txt.gz';

  // Function to reduce file size
  const reduceFileSizeByRemovingSpace = async () => {
    try {
      const fileContent = await RNFS.readFile(absolutePath, 'utf8');
      let reducedContent = fileContent.replace(/[ \t]+/g, ' ');
      reducedContent = reducedContent.replace(/(\r?\n|\r|\n){2,}/g, '\n');
      await RNFS.writeFile(reducedFilePath, reducedContent, 'utf8');

      console.log('File reduced and saved at:', reducedFilePath);
    } catch (error) {
      console.error('Error reducing file size:', error);
    }
  };

  const compressFile = async () => {
    
    try {
      // Check if the file exists
      const fileExists = await RNFS.exists(absolutePath);
      if (!fileExists) {
        throw new Error('File not found');
      }

      const fileContent = await RNFS.readFile(absolutePath, 'utf8');
      const compressedContent = pako.gzip(fileContent);

      // Convert the compressed content to base64 for saving
      const base64Content = Buffer.from(compressedContent).toString('base64');
      await RNFS.writeFile(reducedFilePath, base64Content, 'base64');

      console.log('File compressed successfully to:', reducedFilePath);
      Alert.alert('Success', 'File compressed successfully');
    } catch (error) {
      console.error('Error compressing file:', error);
      Alert.alert('Error', 'Error compressing file: ' + error.message);
    }
  };

  const decompressFile = async () => {

    // const reducedFilePath = '/storage/emulated/0/Documents/sample.txt.gz';
    const decompressedFilePath = '/storage/emulated/0/Documents/sample_decompressed.txt';

    try {
      // Check if the compressed file exists
      const fileExists = await RNFS.exists(reducedFilePath);
      if (!fileExists) {
        throw new Error('Compressed file not found');
      }
      const base64Content = await RNFS.readFile(reducedFilePath, 'base64');
      const compressedContent = Buffer.from(base64Content, 'base64');
      const decompressedContent = pako.ungzip(compressedContent, { to: 'string' });
      await RNFS.writeFile(decompressedFilePath, decompressedContent, 'utf8');

      console.log('File decompressed successfully to:', decompressedFilePath);
      Alert.alert('Success', 'File decompressed successfully');
    } catch (error) {
      console.error('Error decompressing file:', error);
      Alert.alert('Error', 'Error decompressing file: ' + error.message);
    }
  };

  return (
    <View>
      <Text>Text File Reducer</Text>
      <Button title="Compress File" onPress={compressFile} />
      <View style={{ height: 30 }} />
      <Button title="Decompress File" onPress={decompressFile} />
    </View>
  );
};

export default TextFileReducer;
