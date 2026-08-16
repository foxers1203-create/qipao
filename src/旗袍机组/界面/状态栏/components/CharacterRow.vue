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
  avatar?: string;
}>();

const expanded = ref(false);

// 立绘占位字符（后续替换为真实立绘图片）
const avatarFallback = {
  沈静姝: '静',
  苏含烟: '媚',
  江雪: '冷',
  顾知秋: '酒',
  江如歌: '歌',
  虞栖梧: '梧',
} as Record<string, string>;
</script>

<template>
  <div class="char-row" :class="{ expanded }">
    <button class="char-head" @click="expanded = !expanded">
      <span class="char-avatar">
        <span class="avatar-text" v-if="!avatar">{{ avatarFallback[name] || name[0] }}</span>
        <img v-else :src="avatar" alt="" />
      </span>

      <span class="char-name">{{ name }}</span>
      <span class="char-stage" v-if="data.$好感阶段">{{ data.$好感阶段 }}</span>

      <span class="bar-block">
        <span class="bar-label">好</span>
        <span class="char-bar love-bar">
          <span class="bar-fill" :style="{ width: (data.好感度 / 200) * 100 + '%' }"></span>
        </span>
        <span class="bar-num">{{ data.好感度 }}</span>
      </span>

      <span class="bar-block">
        <span class="bar-label">欲</span>
        <span class="char-bar desire-bar">
          <span class="bar-fill" :style="{ width: data.性欲值 + '%' }"></span>
        </span>
        <span class="bar-num">{{ data.性欲值 }}</span>
      </span>

      <span class="char-state" :class="'state-' + data.身体状态">{{ data.身体状态 }}</span>
      <span class="char-arrow">{{ expanded ? '▾' : '▸' }}</span>
    </button>

    <div v-if="expanded" class="char-detail">
      <div class="detail-portrait">
        <span class="portrait-text" v-if="!avatar">{{ avatarFallback[name] || name[0] }}</span>
        <img v-else :src="avatar" alt="" />
      </div>
      <div class="detail-info">
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
  </div>
</template>

<style lang="scss" scoped>
.char-row {
  border: 1px solid var(--c-border);
  border-radius: 8px;
  margin-bottom: 8px;
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
  gap: 12px;
  padding: 8px 12px;
  background: none;
  border: none;
  color: var(--c-text);
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 14px;
  text-align: left;
}

.char-avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 2px solid var(--c-primary);
  background: linear-gradient(135deg, #3a3a42, #232326);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  .avatar-text {
    font-size: 21px;
    color: var(--c-primary);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.char-name {
  font-weight: 700;
  font-size: 18px;
  min-width: 56px;
  color: var(--c-primary);
}

.char-stage {
  font-size: 13px;
  color: var(--c-love);
  min-width: 44px;
}

.bar-block {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.bar-label {
  font-size: 13px;
  color: var(--c-text-muted);
  flex-shrink: 0;
}

.char-bar {
  flex: 1;
  height: 9px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
  min-width: 0;
}

.love-bar .bar-fill {
  background: linear-gradient(90deg, #c98a8a, var(--c-love));
}

.desire-bar .bar-fill {
  background: linear-gradient(90deg, #a84844, var(--c-accent));
}

.bar-num {
  font-size: 14px;
  color: var(--c-text);
  min-width: 28px;
  text-align: right;
  flex-shrink: 0;
}

.char-state {
  font-size: 13px;
  color: var(--c-text-muted);
  min-width: 46px;
  text-align: right;
  flex-shrink: 0;
}

.state-情动,
.state-娇喘 {
  color: var(--c-accent);
}

.state-高潮余韵 {
  color: var(--c-love);
}

.state-熟睡 {
  color: #7ba7d9;
}

.char-arrow {
  color: var(--c-text-muted);
  font-size: 12px;
  flex-shrink: 0;
}

.char-detail {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-top: 1px solid var(--c-border);
}

.detail-portrait {
  width: 120px;
  height: 160px;
  border-radius: 8px;
  border: 1px solid var(--c-primary);
  background: linear-gradient(160deg, #3a3a44, #202024);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  .portrait-text {
    font-size: 44px;
    color: var(--c-primary);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 14px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }
}

.detail-label {
  color: var(--c-text-muted);
  flex-shrink: 0;
  margin-right: 12px;
}

.detail-value {
  color: var(--c-text);
  text-align: right;
}

.state-text-情动,
.state-text-娇喘 {
  color: var(--c-accent);
}

.state-text-高潮余韵 {
  color: var(--c-love);
}

.state-text-熟睡 {
  color: #7ba7d9;
}
</style>
