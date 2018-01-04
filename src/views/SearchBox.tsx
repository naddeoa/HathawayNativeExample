import * as React from 'react';
import { View, TextInput } from 'react-native';
import { ViewProps, Dispatch } from 'reelm-core';
import { MyModel } from '../Model';
import Msg from '../Msg';

const onEnter = (dispatch: Dispatch<Msg>) => (event: { nativeEvent: { key: string } }) => {
    if (event.nativeEvent.key === 'Enter') {
        dispatch({ type: 'OnUsernameSearch' })
    }
}

const onChange = (dispatch: Dispatch<Msg>) => (text: string) => {
    dispatch({ type: 'OnUsernameSearchChanged', text });
}

const SearchBox: React.SFC<ViewProps<MyModel, Msg, null>> = ({ model, dispatch }: ViewProps<MyModel, Msg, null>) => {
    return (
        <View>
            <TextInput placeholder="Search for a github user" onKeyPress={onEnter(dispatch)} onChange={onChange(dispatch)} value={model.get('usernameSearchText')} />
        </View>
    );
}

export default SearchBox;