import * as React from 'react';
import { View } from 'react-native';
import SearchBox from './views/SearchBox';
import UserProfile from './views/UserProfile';
import Repos from './views/Repos';
const MainView = ({ model, dispatch }) => {
    return (React.createElement(View, null,
        React.createElement(SearchBox, { model: model, dispatch: dispatch, componentProps: null }),
        React.createElement(UserProfile, { model: model, dispatch: dispatch, componentProps: null }),
        React.createElement(Repos, { model: model, dispatch: dispatch, componentProps: null })));
};
export default View;
//# sourceMappingURL=View.js.map