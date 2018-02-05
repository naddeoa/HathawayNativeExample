import { start, Program, Dispatch } from 'hathaway-native';
import { Dimensions } from 'react-native';
import { init, MyModel, getOrientation } from './Model';
import Msg from './Msg';
import update from './Update';
import View from './View';

const orientationChanged = (dispatch: Dispatch<Msg>) => () => {
  dispatch({ type: 'OrientationChanged', orientation: getOrientation() });

}

const program: Program<MyModel, Msg> = {
  init,
  update,
  view: View,
  dev: true,
  setupCallbacks: function (dispatch: Dispatch<Msg>) {
    Dimensions.addEventListener('change', orientationChanged(dispatch));
  },
  teardownCallbacks: function (dispatch: Dispatch<Msg>) {
    Dimensions.removeEventListener('change', orientationChanged(dispatch));
  }
};

start("ReelmNativeDemo", program);
