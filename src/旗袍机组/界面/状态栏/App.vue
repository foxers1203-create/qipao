<script setup lang="ts">
import CharacterRow from './components/CharacterRow.vue';
import { useDataStore } from './store';

const store = useDataStore();
const stat = store.data;

const crew = ['沈静姝', '苏含烟', '江雪', '顾知秋', '江如歌'] as const;
</script>

<template>
  <div class="status-bar" v-if="stat">
    <div class="world-bar">
      <span class="world-item">🕐 {{ stat.世界.当前时间 }}</span>
      <span class="world-item">📍 {{ stat.世界.当前地点 }}</span>
      <span class="world-item">✈️ {{ stat.世界.航班状态 }}</span>
    </div>

    <CharacterRow
      v-for="name in crew"
      :key="name"
      :name="name"
      :data="stat[name]"
      is-locked
    />

    <CharacterRow
      name="虞栖梧"
      :data="stat.虞栖梧"
    />
  </div>
</template>

<style lang="scss" scoped>
.status-bar {
  max-width: 720px;
  margin: 0 auto;
  padding: 8px;
  background: var(--c-background);
  border: 1px solid var(--c-primary);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.world-bar {
  display: flex;
  gap: 14px;
  padding: 4px 8px 8px;
  font-size: 12px;
  color: var(--c-text-muted);
  border-bottom: 1px dashed var(--c-border);
  margin-bottom: 8px;
}
</style>
