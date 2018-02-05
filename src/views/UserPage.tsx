import { View } from 'react-native';
import { ViewProps } from 'hathaway-native';
import * as React from 'react';
import { MyModel } from '../Model';
import Msg from '../Msg';
import SearchBox from './SearchBox';
import UserProfile from './UserProfile';
import Repos from './Repos';

const UserPage: React.SFC<ViewProps<MyModel, Msg, {}>> = ({ model, dispatch }: ViewProps<MyModel, Msg, {}>) => {
    return (
        <View style={{ flex: 1 }}>
            <SearchBox model={model} dispatch={dispatch} componentProps={null} />
            <View style={{ flex: 1, flexDirection: model.get('orientation') === 'PORTRAIT' ? 'column' : 'row' }}>
                <UserProfile model={model} dispatch={dispatch} componentProps={null} />
                <Repos model={model} dispatch={dispatch} componentProps={null} />
            </View>
        </View>
    );
}

export default UserPage;
