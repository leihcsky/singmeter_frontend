
# SingMeter 品质提升 & SEO 优化需求文档

## 1. 项目背景与目标

### 1.1 网站定位（统一对内对外认知）
SingMeter 是一个 **面向爱唱歌人群的唱歌自测 + 练习反馈工具平台**。  
核心目标不是“玩工具”，而是 **帮助用户提高唱歌水平**。

### 1.2 核心用户问题（三大永恒问题）
1. 我唱得准吗？  
2. 我的声音条件是什么？  
3. 我该怎么练？

### 1.3 本次提升目标
- 用体系化语言在首页清晰表达 SingMeter 的价值
- 让不懂唱歌的用户，也能自然理解「练习路径」
- 提升核心工具页质量与 SEO 表现
- 构建清晰、可扩展的工具矩阵结构
- 提高 GSC 中「已曝光但排名靠后」页面的排名潜力

---

## 2. 工具矩阵与练习路径设计（核心）

### 2.1 工具矩阵总览（以“练习场景”为中心）

#### 场景一：认识自己的声音（Voice Discovery）
- Vocal Range Test  
  - 解决问题：我的音域是多少？适合唱什么？
  - 角色定位：声音身份认知工具（Identity）

#### 场景二：唱得准不准（Pitch Accuracy）
- Pitch Detector  
  - 解决问题：我有没有唱准？
  - 角色定位：实时反馈工具（Feedback）
- Tone Generator  
  - 解决问题：正确的音高是什么？
  - 角色定位：标准参考工具（Reference）

#### 场景三：唱得稳不稳（Timing & Musicality）
- Online Metronome  
  - 解决问题：节奏是否稳定？
  - 角色定位：节奏控制工具（Timing）

#### 场景四：歌曲是否适合自己（Song Adaptation）
- Song Key Finder  
  - 解决问题：这首歌用什么调最适合我？
  - 角色定位：歌曲适配工具（Adaptation）

---

## 3. 首页重构需求（重点）

### 3.1 首页的唯一职责
首页不是功能页，而是：
- 价值说明页
- 工具选择引导页
- 唱歌练习路径入口页

### 3.2 首页核心信息结构

#### Hero 区（第一屏）
**目的：一句话告诉用户你能帮他什么**

建议文案方向：
> SingMeter helps singers understand their voice, sing in tune, and practice effectively — with free online tools.

副标题：
> From vocal range to pitch accuracy, follow a clear practice path and improve your singing step by step.

CTA：
- Start Singing Practice
- Find the Right Tool for You

---

#### 核心模块一：唱歌三大问题（问题驱动）

标题：
> What do you want to improve?

模块结构：
- 我唱得准吗？ → Pitch Detector + Tone Generator
- 我的声音条件是什么？ → Vocal Range Test
- 我该怎么练？ → 组合工具路径说明

---

#### 核心模块二：唱歌练习路径（重点）

标题：
> A Simple Singing Practice Path

步骤示例：
1. Discover your vocal range  
   → Vocal Range Test
2. Find the right key for songs  
   → Song Key Finder
3. Start with a reference note  
   → Tone Generator
4. Check your pitch accuracy  
   → Pitch Detector
5. Practice with steady timing  
   → Online Metronome

> 该模块是首页 SEO 与用户体验的核心，避免出现“工具列表感”。

---

#### 核心模块三：工具入口（弱化功能，强化用途）

每个工具卡片包含：
- 使用场景描述
- 解决的问题
- 明确 CTA（如：Test Your Pitch）

---

### 3.3 首页需要移除或下沉的内容
- Example Results from the Vocal Range Test  
  → 下沉至 Vocal Range Test 工具页结果说明区

---

## 4. 核心工具页优化优先级

### 4.1 第一优先级（重点打磨）

#### Pitch Detector
- 当前问题：
  - 页面像“展示工具”，不像“练习工具”
- 优化方向：
  - 强化练习场景（scale practice, song practice）
  - 增加使用指导模块
  - 明确与 Tone Generator 的组合使用

#### Vocal Range Test
- 当前问题：
  - 解释不足，结果价值未充分释放
- 优化方向：
  - 强化结果解读（voice type / singing advice）
  - 增加“下一步练什么”的引导

---

### 4.2 第二优先级（辅助型但重要）

#### Tone Generator
- 强调：起音 / 对音 / 听觉训练
- 增加与 Pitch Detector 的双向内链

#### Song Key Finder
- 强化与 Vocal Range 的关系
- 增加“为什么这个 key 更适合你”的说明

---

### 4.3 第三优先级

#### Online Metronome
- 保持轻量
- 强化唱歌练习场景（而非泛音乐工具）

---

## 5. SEO 结构优化要点

### 5.1 关键词分工（避免冲突）

| 页面 | 主关键词 |
|---|---|
| 首页 | singing practice tools / sing meter |
| vocal-range-test | vocal range test |
| pitch-detector | pitch detector |
| tone-generator | tone generator |
| metronome | online metronome |
| song-key-finder | song key finder |

---

### 5.2 内链原则
- 首页 → 所有工具（基于练习路径）
- 工具页之间形成“练习闭环”内链
- 每篇说明内容只服务一个核心工具

---

## 6. 成功判断标准（KPI）

- 首页跳出率下降
- 工具页点击占比提升
- GSC 中：
  - Pitch Detector / Vocal Range Test 平均排名提升
  - 曝光转点击率提升
- 用户路径更长（首页 → ≥2 个工具页）

---

## 7. 总结

SingMeter 当前最大的机会不是增加新工具，而是：
- 用体系化语言讲清楚价值
- 把工具组织成“唱歌成长路径”
- 让用户和 Google 都清楚：  
  **这是一个真正为 singers 服务的练习平台**
