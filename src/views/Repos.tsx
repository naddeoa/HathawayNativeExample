import { VirtualizedList, View, Text, StyleSheet } from 'react-native';
import * as React from 'react';
import { ViewProps, ImmutableModel } from 'hathaway-native';
import { MyModel, lookupRepos, ReposModel, RepoModel, lookupUserProfile, currentlyFetching, ProgrammingLanguagesModel, lookupProgrammingLanguagesModel } from '../Model';
import Msg from '../Msg';

const styles = StyleSheet.create({
    h1: {
        fontSize: 26,
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 22,
        fontWeight: 'bold'
    }
});

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
        <View style={{borderRadius: 2, borderColor: 'grey', borderStyle: 'solid', elevation: 2, margin: 10, padding: 5  }}>
            <Text style={styles.h2} target='_blank' href={repo.get('html_url')}> <Text>{repo.get('name')}</Text></Text>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 20 }} />
                <View style={{ flex: 1 }}>
                    <ProgrammingLanguagesView languages={languages} repo={repo} />
                    <Text>{repo.get('description')}</Text>
                    {repo.get('fork') && <Text style={{ color: 'red' }}>fork</Text>}
                    <Text>Number of forks: {repo.get('forks_count')}</Text>
                    <Text>Number of open issues: {repo.get('open_issues_count')}</Text>
                    <Text>Number of watchers: {repo.get('watchers')}</Text>
                </View>
            </View>

        </View>
    );
}

function getRepoKey(repo: RepoModel): string {
    return repo.get('id');
}

function getItem(repos: ReposModel, index: number): RepoModel {
    return repos.get(index);
}

function getItemCount(repos: ReposModel) {
    return repos.size;
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
    const fetching = currentlyFetching(profile, model);
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
        <View style={{flex:1}}>
            <Text style={styles.h1}>Repositories</Text>
            <VirtualizedList
            style={{flex: 1}}
                data={repos}
                getItem={getItem}
                getItemCount={getItemCount}
                keyExtractor={getRepoKey}
                renderItem={({ item }: { item: RepoModel }) => <RepoView repo={item} model={model} />}
            />
        </View>
    );
}

export default Repos;