import { View, Image, Text } from 'react-native';
import * as React from 'react';
import { ViewProps } from 'hathaway-native';
import { MyModel, UserProfileModel, lookupUserProfile, currentlyFetching } from '../Model';
import Msg from '../Msg';

function UserStats({ profile }: { profile: UserProfileModel }) {
    return (
        <View style={{flexDirection:'column'}}>
            <Text>id: {profile.get('id')}</Text>
            <Text>Github page: <Text href={profile.get('html_url')} target='_blank'> {profile.get('html_url')} </Text></Text>
            <Text>Number of followers: {profile.get('followers')}</Text>
            <Text>Number of gists: {profile.get('public_gists')}</Text>
            <Text>Number of repos: {profile.get('public_repos')}</Text>
        </View>
    );
}

const UserProfile: React.SFC<ViewProps<MyModel, Msg, null>> = ({ model }: ViewProps<MyModel, Msg, null>) => {
    const username = model.get('showProfile');
    if (username === null) {
        return <Text>Try to search for a github username</Text>;
    }

    if (currentlyFetching(username, model)) {
        return <Text>Fetching user...</Text>;
    }

    const profile = lookupUserProfile(username, model);
    if (profile === null) {
        return (
            <Text>Can't find user {username}</Text>
        );
    }

    return (
        <View style={{flexDirection: 'row'}}>
            <Image source={{ uri: profile.get('avatar_url') }} style={{ width: 150, height: 150 }} />
            <UserStats profile={profile} />
        </View>
    );
}

export default UserProfile;