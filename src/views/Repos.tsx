import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { ViewProps, ImmutableModel } from 'reelm-core';
import { MyModel, lookupRepos, RepoModel, lookupUserProfile, currentlyFetchingRepos, ProgrammingLanguagesModel, lookupProgrammingLanguagesModel } from '../Model';
import Msg from '../Msg';

function ProgrammingLanguagesView({ languages, repo }: { languages: ProgrammingLanguagesModel | null, repo: RepoModel }) {
    if (languages === null) {
        return null;
    }

    const languagesUsed: string = languages.reduce(function (reduction, numberOfLines, languageName) {
        const summary = `${languageName}: ${numberOfLines}`;
        if (reduction !== '') {
            return `${reduction}, ${summary}`;
        }
        return summary;
    }, '');

    return (
        <Text key={`${repo.get('id')}-languages`} >{languagesUsed}</Text>
    );
}

function RepoView({ repo, model }: { repo: RepoModel | undefined, model: ImmutableModel<MyModel> }) {
    if (!repo) {
        return null;
    }

    const languages: ProgrammingLanguagesModel | null = lookupProgrammingLanguagesModel(repo, model);


    return (
        <View className='repo'>
            <View>{repo.get('name')}</View>
            <ProgrammingLanguagesView languages={languages} repo={repo} />
            <View>{repo.get('description')}</View>

            {repo.get('fork') && <Text>fork</Text>}
            <Text>Number of forks: {repo.get('forks_count')}</Text>
            <Text>Number of open issues: {repo.get('open_issues_count')}</Text>
            <Text>Number of watchers: {repo.get('watchers')}</Text>
        </View>
    );
}

const Repos: React.SFC<ViewProps<MyModel, Msg, null>> = ({ model }: ViewProps<MyModel, Msg, null>) => {
    const username = model.get('showProfile');

    if (username === null) {
        return null;
    }

    const profile = lookupUserProfile(username, model);

    if (profile === null) {
        return null;
    }

    const repos = lookupRepos(profile, model);
    const fetching = currentlyFetchingRepos(profile, model);
    if (repos === null && !fetching) {
        return (
            <Text>Fetchign repos... {username}</Text>
        );
    }

    if (repos === null) {
        return <Text>Can't get the repos for {username}</Text>
    }

    if (repos.size === 0) {
        return <Text>No repos</Text>;
    }

    return (
        <View className='repositories'>
            <Text>Repositories</Text>
            {repos.map(repo => <RepoView repo={repo} model={model} key={repo === undefined ? 'remove-when-immutable4-released' : repo.get('id')} />)}
        </View>
    );
}

export default Repos;