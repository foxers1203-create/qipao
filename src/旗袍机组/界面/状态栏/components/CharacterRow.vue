<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  name: string;
  data: {
    好感度: number;
    性欲值: number;
    衣着: string;
    内衣: string;
    身体状态: '常态' | '情动' | '娇喘' | '高潮余韵' | '熟睡';
    $好感阶段?: string;
  };
  isLocked?: boolean;
}>();

const expanded = ref(false);
</script>

<template>
  <div class="char-row" :class="{ expanded }">
    <button class="char-head" @click="expanded = !expanded">
      <span class="char-name">{{ name }}</span>
      <span v-if="isLocked" class="char-lock" title="好感度已锁定">🔒</span>
      <span class="char-stage" v-if="data.$好感阶段">{{ data.$好感阶段 }}</span>

      <span class="char-bar love-bar">
        <span class="bar-fill" :style="{ width: (data.好感度 / 200) * 100 + '%' }"></span>
      </span>
      <span class="char-bar desire-bar">
        <span class="bar-fill" :style="{ width: data.性欲值 + '%' }"></span>
      </span>

      <span class="char-state" :class="'state-' + data.身体状态">{{ data.身体状态 }}</span>
      <span class="char-arrow">{{ expanded ? '▾' : '▸' }}</span>
    </button>

    <div v-if="expanded" class="char-detail">
      <div class="detail-row">
        <span class="detail-label">好感度</span>
        <span class="detail-value">{{ data.好感度 }} / 200</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">性欲值</span>
        <span class="detail-value">{{ data.性欲值 }} / 100</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">衣着</span>
        <span class="detail-value">{{ data.衣着 }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">内衣</span>
        <span class="detail-value">{{ data.内衣 }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">身体状态</span>
        <span class="detail-value" :class="'state-text-' + data.身体状态">{{ data.身体状态 }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.char-row {
  border: 1px solid var(--c-border);
  border-radius: 6px;
  margin-bottom: 6px;
  background: var(--c-surface);
  overflow: hidden;
  transition: background 0.2s;

  &:hover {
    background: var(--c-surface-hover);
  }
}

.char-head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  background: none;
  border: none;
  color: var(--c-text);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 13px;
  text-align: left;
}

.char-name {
  font-weight: 600;
  min-width: 56px;
  color: var(--c-primary);
}

.char-lock {
  font-size: 12px;
}

.char-stage {
  font-size: 11px;
  color: var(--c-love);
  min-width: 48px;
}

.char-bar {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.love-bar .bar-fill {
  background: var(--c-love);
}

.desire-bar .bar-fill {
  background: var(--c-accent);
}

.char-state {
  font-size: 11px;
  color: var(--c-text-muted);
  min-width: 40px;
  text-align: right;
}

.state-情动,
.state-娇喘 {
  color: var(--c-accent);
}

.state-熟睡 {
  color: #7ba7d9;
}

.char-arrow {
  color: var(--c-text-muted);
  font-size: 10px;
}

.char-detail {
  padding: 8px 12px 10px;
  border-top: 1px solid var(--c-border);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 12px;
}

.detail-label {
  color: var(--c-text-muted);
}

.detail-value {
  color: var(--c-text);
  text-align: right;
  max-width: 70%;
}

.state-text-情动,
.state-text-娇喘 {
  color: var(--c-accent);
}

.state-text-高潮余韵 {
  color: #e8a0a0;
}

.state-text-熟睡 {
  color: #7ba7d9;
}
</style>
