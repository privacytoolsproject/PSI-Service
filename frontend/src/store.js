import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let logResponse = response => {
    if (response.status !== 200) {
        console.log(response.config.url, " request failed with status ", response.status);
        console.log(response);
        return;
    }
    console.log(response.data.message);
};

export default new Vuex.Store({
    state: {
        datasetList: [],
        workspaceList: [],
        workspace: undefined,

        allMenus: ['dataset', 'variables', 'analysis', 'release'],
        selectedMenu: 'dataset'
    },
    mutations: {
        EDIT_VARIABLE(state, {variable, value}) {
            let candidate = state.workspace.dataset.variables
                .find(variableMeta => variableMeta.name === variable);
            if (!candidate) return;
            candidate.metadata = value;
        },
        ADD_COMPONENT(state, component) {
            state.workspace.analysis.push(component)
        },
        EDIT_COMPONENT(state, component) {
            let componentIdx = stat.workspace.analysis
                .findIndex(comp => comp.nodeId === component.nodeId);
            state.workspace.analysis.splice(componentIdx, 1, component);
        },
        REMOVE_COMPONENT(state, component) {
            let componentIdx = stat.workspace.analysis
                .findIndex(comp => comp.nodeId === component.nodeId);
            state.workspace.analysis.splice(componentIdx, 1);
        },
        LOGOUT() {
            // TODO: call logout url
            console.log('Logging out');
        },
        SET_WORKSPACE(state, workspace) {
            state.workspace = workspace;
        },
        SET_DATASET_LIST(state, datasetList) {
            state.datasetList = datasetList
        },
        SET_WORKSPACE_LIST(state, workspaceList) {
            state.workspaceList = workspaceList;
        },
        SET_SELECTED_MENU(state, menu) {
            state.selectedMenu = menu;
        }
    },
    actions: {
        editVariable({commit}, metadata) {
            return Vue.axios.post('editVariable', metadata).then(logResponse)
        },
        addComponent({commit}, metadata) {
            return Vue.axios.post('addComponent', {metadata}).then(logResponse)
        },
        editComponent({commit}, componentId, metadata) {
            return Vue.axios.post('editComponent', {componentId, metadata}).then(logResponse)
        },
        removeComponent({commit}, componentId) {
            return Vue.axios.post('removeComponent', {componentId}).then(logResponse)
        },

        logout({commit}) {
            commit('LOGOUT')
        },

        fetchDatasetList({commit}, specifications) {
            return Vue.axios.post('/listDatasets', specifications).then(response => {
                if (response.status !== 200) {
                    console.log(response.config.url, " request failed with status ", response.status);
                    console.log(response);
                    return;
                }
                if (response.data.success)
                    commit('SET_DATASET_LIST', response.data.data);
                else console.log(response.data.message)
            })
        },

        fetchWorkspaceList({commit}, specifications) {
            return Vue.axios.post('/listWorkspaces', specifications).then(response => {
                if (response.status !== 200) {
                    console.log(response.config.url, " request failed with status ", response.status);
                    console.log(response);
                    return;
                }
                if (response.data.success)
                    commit('SET_WORKSPACE_LIST', response.data.data);
                else console.log(response.data.message)
            })
        },

        fetchWorkspace({commit}, workspaceId) {
            return Vue.axios.post('/getWorkspace', {workspaceId})
                .then(response => {
                    if (response.status !== 200) {
                        console.log(response.config.url, " request failed with status ", response.status);
                        console.log(response);
                        return;
                    }
                    if (response.data.success)
                        commit('SET_WORKSPACE', response.data.data);
                    else console.log(response.data.message)
                })
        },

        setSelectedMenu({commit}, menu) {
            commit('SET_SELECTED_MENU', menu)
        }
    }
});
