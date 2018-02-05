import { View, TextInput, Button } from 'react-native';
import * as React from 'react';
import { ViewProps, Dispatch } from 'hathaway-native';
import { MyModel } from '../Model';
import Msg from '../Msg';

const onSearch = (dispatch: Dispatch<Msg>) => () => {
    dispatch({ type: 'OnUsernameSearch', pushInHistory: false })
}

const onChange = (dispatch: Dispatch<Msg>) => (text: string) => {
    dispatch({ type: 'OnUsernameSearchChanged', text });
}

const SearchBox: React.SFC<ViewProps<MyModel, Msg, null>> = ({ model, dispatch }: ViewProps<MyModel, Msg, null>) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TextInput style={{flex: 1}} editable={true} placeholder="Search for a github user" onChangeText={onChange(dispatch)} value={model.get('usernameSearchText')} />
            <Button style={{width: "10%"}} title="Search" onPress={onSearch(dispatch)} />
        </View>
    );
}

export default SearchBox;