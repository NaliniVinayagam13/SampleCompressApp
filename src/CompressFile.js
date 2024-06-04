import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { zip, unzip, subscribe } from 'react-native-zip-archive';

const App = () => {
  const compressFile = async () => {
    try {
      const { dirs } = RNFetchBlob.fs;
      const sourcePath = `${dirs.DocumentDir}/sample.txt`;
      const targetPath = `${dirs.DocumentDir}/sample.zip`;

      // Write some data to the source file
      await RNFetchBlob.fs.writeFile(sourcePath, 'This is a sample text file.', 'utf8');

      // Compress the file
      await zip(sourcePath, targetPath);

      // Get the size of the original and compressed files
      const originalSize = await RNFetchBlob.fs.stat(sourcePath);
      const compressedSize = await RNFetchBlob.fs.stat(targetPath);

      console.log('Original Size: ', originalSize.size);
      console.log('Compressed Size: ', compressedSize.size);

      alert(`Original Size: ${originalSize.size} bytes\nCompressed Size: ${compressedSize.size} bytes`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    compressFile();
  }, []);

  return (
    <View>
      <Text>Check console for file sizes</Text>
      <Button title="Compress File" onPress={compressFile} />
    </View>
  );
};

export default App;
