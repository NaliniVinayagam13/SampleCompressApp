/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TextFileReducer from './src/TextFileCompresser';
import {name as appName} from './app.json';
import { Buffer } from 'buffer';
global.Buffer = Buffer;


AppRegistry.registerComponent(appName, () => TextFileReducer);
