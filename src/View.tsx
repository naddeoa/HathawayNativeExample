import * as React from 'react';
import { View } from 'react-native';
import { ViewProps } from 'reelm-core';
import { MyModel } from './Model';
import Msg from './Msg';
import SearchBox from './views/SearchBox';
import UserProfile from './views/UserProfile';
import Repos from './views/Repos';

const MainView: React.SFC<ViewProps<MyModel, Msg, {}>> = ({ model, dispatch }: ViewProps<MyModel, Msg, {}>) => {
    return (
        <View>
            <SearchBox model={model} dispatch={dispatch} componentProps={null} />
            <UserProfile model={model} dispatch={dispatch} componentProps={null} />
            <Repos model={model} dispatch={dispatch} componentProps={null} />
        </View>
    );
}

export default View;