<script lang="ts">
    import { Tab } from './types';

    export let selectedTab: Tab = Tab.TODO;
    export let onTabChange: (tab: Tab) => void;
</script>

<style>
    .tab-container {
        display: flex;
        width: 100%;
        gap: 10px;
        padding-bottom: 10px;
        box-shadow: 0 4px 2px -2px gray;
    }

    .tab {
        padding: 10px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    }

    .tab:hover, .selected-tab {
        background-color: #ddd;
        cursor: pointer;
    }
</style>


<div class="tab-container">
    {#each Object.values(Tab) as tab}
        <div class="tab" class:selected-tab={selectedTab === tab} on:click={() => onTabChange(tab)}>
            {tab}
        </div>
    {/each}
</div>