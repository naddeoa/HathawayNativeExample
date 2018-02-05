import { View } from 'react-native';
import { ViewProps } from 'hathaway-native';
import * as React from 'react';
import { MyModel } from '../Model';
import Msg from '../Msg';

const UnknownPage: React.SFC<ViewProps<MyModel, Msg, {}>> = (_props: ViewProps<MyModel, Msg, {}>) => {
    return (
        <View className="root">
            Unknown page
        </View>
    );
}

export default UnknownPage;
