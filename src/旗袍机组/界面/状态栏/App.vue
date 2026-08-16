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
    />

    <CharacterRow
      name="虞栖梧"
      :data="stat.虞栖梧"
    />
  </div>
</template>

<style lang="scss" scoped>
.status-bar {
  max-width: 920px;
  margin: 0 auto;
  padding: 12px;
  background: var(--c-background);
  border: 1px solid var(--c-primary);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.world-bar {
  display: flex;
  gap: 20px;
  padding: 4px 8px 10px;
  font-size: 14px;
  color: var(--c-text-muted);
  border-bottom: 1px dashed var(--c-border);
  margin-bottom: 10px;
}
</style>
