import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { ViewProps } from 'reelm-core';
import { MyModel, UserProfileModel, lookupUserProfile } from '../Model';
import Msg from '../Msg';

function UserStats({ profile }: { profile: UserProfileModel }) {
    return (
        <View>
            <Text>id: {profile.get('id')}</Text>
            <Text>Github page: <a href={profile.get('html_url')} target='_blank'> {profile.get('html_url')} </a></Text>
            <Text>Number of followers: {profile.get('followers')}</Text>
            <Text>Number of gists: {profile.get('public_gists')}</Text>
            <Text>Number of repos: {profile.get('public_repos')}</Text>
        </View>
    );
}

const UserProfile: React.SFC<ViewProps<MyModel, Msg, null>> = ({ model }: ViewProps<MyModel, Msg, null>) => {
    const username = model.get('showProfile');
    if (username === null) {
        return (
            <div>Try to search for a github username</div>
        );
    }

    const profile = lookupUserProfile(username, model);
    if (profile === null) {
        return (
            <div>Can't find user {username}</div>
        );
    }

    return (
        <View >
            <Image source={{ uri: profile.get('avatar_url') }} />
            <UserStats profile={profile} />
        </View>
    );
}

export default UserProfile;