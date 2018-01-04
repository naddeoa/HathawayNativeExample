import * as React from 'react';
import { View, TextInput } from 'react-native';
const onEnter = (dispatch) => (event) => {
    if (event.nativeEvent.key === 'Enter') {
        dispatch({ type: 'OnUsernameSearch' });
    }
};
const onChange = (dispatch) => (text) => {
    dispatch({ type: 'OnUsernameSearchChanged', text });
};
const SearchBox = ({ model, dispatch }) => {
    return (React.createElement(View, null,
        React.createElement(TextInput, { placeholder: "Search for a github user", onKeyPress: onEnter(dispatch), onChange: onChange(dispatch), value: model.get('usernameSearchText') })));
};
export default SearchBox;
//# sourceMappingURL=SearchBox.js.map