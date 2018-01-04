import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { lookupUserProfile } from '../Model';
function UserStats({ profile }) {
    return (React.createElement(View, null,
        React.createElement(Text, null,
            "id: ",
            profile.get('id')),
        React.createElement(Text, null,
            "Github page: ",
            React.createElement("a", { href: profile.get('html_url'), target: '_blank' },
                " ",
                profile.get('html_url'),
                " ")),
        React.createElement(Text, null,
            "Number of followers: ",
            profile.get('followers')),
        React.createElement(Text, null,
            "Number of gists: ",
            profile.get('public_gists')),
        React.createElement(Text, null,
            "Number of repos: ",
            profile.get('public_repos'))));
}
const UserProfile = ({ model }) => {
    const username = model.get('showProfile');
    if (username === null) {
        return (React.createElement("div", null, "Try to search for a github username"));
    }
    const profile = lookupUserProfile(username, model);
    if (profile === null) {
        return (React.createElement("div", null,
            "Can't find user ",
            username));
    }
    return (React.createElement(View, null,
        React.createElement(Image, { source: { uri: profile.get('avatar_url') } }),
        React.createElement(UserStats, { profile: profile })));
};
export default UserProfile;
//# sourceMappingURL=UserProfile.js.map